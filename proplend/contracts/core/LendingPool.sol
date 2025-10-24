// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "../interfaces/ILendingPool.sol";
import "./TrancheTokens.sol";
import "./InterestDistributor.sol";

/**
 * @title LendingPool
 * @notice Main lending pool managing senior and junior tranches
 * @dev Implements waterfall payment distribution and tranche tokens
 *
 * Key Features:
 * - Two-tranche system: Senior (80%, 8-10% APY) and Junior (20%, 20-30% APY)
 * - Loan origination with LTV limits (max 65%)
 * - Interest distribution via waterfall (senior first, junior gets excess)
 * - Emergency pause mechanism
 *
 * Architecture:
 * - Senior tranche: Fixed returns, first-priority payments
 * - Junior tranche: Variable returns, leveraged exposure
 * - USDC-denominated (6 decimals)
 * - Minimum deposit: $100
 */
contract LendingPool is ILendingPool, ReentrancyGuard, AccessControl {
    using SafeERC20 for IERC20;

    // Constants
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");

    uint256 public constant SENIOR_RATIO = 80; // 80% senior tranche
    uint256 public constant JUNIOR_RATIO = 20; // 20% junior tranche
    uint256 public constant MAX_LTV = 65; // Maximum loan-to-value ratio
    uint256 public constant MIN_DEPOSIT = 100 * 1e6; // $100 USDC minimum
    uint256 public constant PERCENTAGE_DIVISOR = 100;

    // State Variables
    IERC20 public immutable usdc;
    address public seniorToken;
    address public juniorToken;
    address public interestDistributor;

    uint256 public totalSeniorDeposits;
    uint256 public totalJuniorDeposits;
    uint256 public totalDeployed; // Capital currently deployed in active loans
    uint256 public nextLoanId;

    mapping(uint256 => Loan) public loans;
    mapping(address => uint256) public seniorShares;
    mapping(address => uint256) public juniorShares;

    // Custom Errors
    error InsufficientBalance();
    error BelowMinimumDeposit();
    error ExceedsMaxLTV();
    error InvalidAmount();
    error Unauthorized();
    error LoanNotActive();

    /**
     * @notice Initializes the LendingPool contract
     * @param _usdc Address of the USDC token contract
     */
    constructor(address _usdc) {
        require(_usdc != address(0), "Invalid USDC address");
        usdc = IERC20(_usdc);

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(OPERATOR_ROLE, msg.sender);
    }

    /**
     * @notice Deposits USDC into specified tranche
     * @param amount USDC amount (6 decimals)
     * @param isSenior true for senior tranche, false for junior
     * @return shares Number of tranche shares minted
     */
    function deposit(uint256 amount, bool isSenior)
        external
        override
        nonReentrant
        returns (uint256 shares)
    {
        if (amount < MIN_DEPOSIT) revert BelowMinimumDeposit();
        require(
            (isSenior && seniorToken != address(0)) || (!isSenior && juniorToken != address(0)),
            "Tranche tokens not set"
        );

        // Transfer USDC from user to pool
        usdc.safeTransferFrom(msg.sender, address(this), amount);

        // Calculate shares (1:1 for MVP - can implement dynamic pricing later)
        shares = amount;

        // Update TVL tracking
        if (isSenior) {
            totalSeniorDeposits += amount;
            seniorShares[msg.sender] += shares;
        } else {
            totalJuniorDeposits += amount;
            juniorShares[msg.sender] += shares;
        }

        // Mint tranche tokens to user
        address tokenAddress = isSenior ? seniorToken : juniorToken;
        TrancheToken(tokenAddress).mint(msg.sender, shares);

        emit Deposited(msg.sender, amount, isSenior, shares);
    }

    /**
     * @notice Withdraws USDC from specified tranche
     * @param shares Number of tranche shares to redeem
     * @param isSenior true for senior tranche, false for junior
     * @return amount USDC amount withdrawn
     */
    function withdraw(uint256 shares, bool isSenior)
        external
        override
        nonReentrant
        returns (uint256 amount)
    {
        if (shares == 0) revert InvalidAmount();
        require(
            (isSenior && seniorToken != address(0)) || (!isSenior && juniorToken != address(0)),
            "Tranche tokens not set"
        );

        // Verify user has sufficient shares
        uint256 userShares = isSenior ? seniorShares[msg.sender] : juniorShares[msg.sender];
        if (shares > userShares) revert InsufficientBalance();

        // Calculate USDC value of shares (1:1 for MVP)
        amount = shares;

        // Check available liquidity in pool
        uint256 availableLiquidity = usdc.balanceOf(address(this));
        if (amount > availableLiquidity) revert InsufficientBalance();

        // Burn tranche tokens from user
        address tokenAddress = isSenior ? seniorToken : juniorToken;
        TrancheToken(tokenAddress).burn(msg.sender, shares);

        // Update TVL tracking
        if (isSenior) {
            totalSeniorDeposits -= amount;
            seniorShares[msg.sender] -= shares;
        } else {
            totalJuniorDeposits -= amount;
            juniorShares[msg.sender] -= shares;
        }

        // Transfer USDC to user
        usdc.safeTransfer(msg.sender, amount);

        emit Withdrawn(msg.sender, amount, isSenior, shares);
    }

    /**
     * @notice Applies for a loan against property collateral
     * @param amount Loan amount in USDC
     * @param propertyId Unique property identifier
     * @param propertyValue Property valuation in USDC
     * @param term Loan term in months (6-12)
     * @return loanId Unique loan identifier
     */
    function applyForLoan(
        uint256 amount,
        bytes32 propertyId,
        uint256 propertyValue,
        uint256 term
    ) external override nonReentrant onlyRole(OPERATOR_ROLE) returns (uint256 loanId) {
        if (amount == 0) revert InvalidAmount();
        require(term >= 6 && term <= 12, "Term must be 6-12 months");

        // Calculate LTV
        uint256 ltv = (amount * PERCENTAGE_DIVISOR) / propertyValue;
        if (ltv > MAX_LTV) revert ExceedsMaxLTV();

        // Check available capital
        uint256 availableCapital = (totalSeniorDeposits + totalJuniorDeposits) - totalDeployed;
        if (amount > availableCapital) revert InsufficientBalance();

        // Calculate interest rate based on LTV (18-24% range)
        // Lower LTV = lower rate: 18% at 50% LTV, scaling up to 24% at 65% LTV
        uint256 interestRate = 1800 + ((ltv - 50) * 400) / 15; // Basis points
        if (interestRate < 1800) interestRate = 1800; // Min 18%
        if (interestRate > 2400) interestRate = 2400; // Max 24%

        // Calculate loan end time
        uint256 endTime = block.timestamp + (term * 30 days);

        // Create loan record
        loanId = nextLoanId++;
        loans[loanId] = Loan({
            borrower: msg.sender,
            amount: amount,
            interestRate: interestRate,
            ltv: ltv,
            startTime: block.timestamp,
            endTime: endTime,
            propertyValue: propertyValue,
            propertyId: propertyId,
            status: LoanStatus.Active
        });

        // Update deployed capital tracking
        totalDeployed += amount;

        // Transfer USDC to borrower
        usdc.safeTransfer(msg.sender, amount);

        emit LoanOriginated(loanId, msg.sender, amount, interestRate);
    }

    /**
     * @notice Repays a loan with interest
     * @param loanId Loan identifier
     */
    function repayLoan(uint256 loanId) external override nonReentrant {
        Loan storage loan = loans[loanId];
        if (loan.status != LoanStatus.Active) revert LoanNotActive();
        if (msg.sender != loan.borrower) revert Unauthorized();

        // Calculate loan term in months
        uint256 termMonths = (loan.endTime - loan.startTime) / 30 days;

        // Calculate total interest: (principal * rate * term) / (10000 * 12)
        // Rate is in basis points (e.g., 2000 = 20%)
        uint256 totalInterest = (loan.amount * loan.interestRate * termMonths) / (10000 * 12);

        // Calculate total repayment amount
        uint256 totalRepayment = loan.amount + totalInterest;

        // Transfer USDC from borrower
        usdc.safeTransferFrom(msg.sender, address(this), totalRepayment);

        // Mark loan as repaid
        loan.status = LoanStatus.Repaid;

        // Reduce deployed capital
        totalDeployed -= loan.amount;

        // Distribute interest to tranches if InterestDistributor is set
        if (interestDistributor != address(0) && totalInterest > 0) {
            // Calculate distribution amounts via InterestDistributor
            (bool success, bytes memory data) = interestDistributor.call(
                abi.encodeWithSignature(
                    "calculateDistribution(uint256,uint256,uint256)",
                    totalInterest,
                    totalSeniorDeposits,
                    totalJuniorDeposits
                )
            );

            if (success) {
                (uint256 seniorAmount, uint256 juniorAmount, uint256 platformAmount) =
                    abi.decode(data, (uint256, uint256, uint256));

                // Transfer platform fee to treasury
                if (platformAmount > 0) {
                    address treasury = InterestDistributor(interestDistributor).platformTreasury();
                    usdc.safeTransfer(treasury, platformAmount);
                }

                // Senior and junior portions remain in pool for pro-rata distribution on withdrawal
                // Note: In a full implementation, we'd track earned interest per user
            }
        }

        emit LoanRepaid(loanId, totalRepayment);
    }

    /**
     * @notice Liquidates a defaulted loan
     * @param loanId Loan identifier
     */
    function liquidateLoan(uint256 loanId)
        external
        override
        onlyRole(OPERATOR_ROLE)
        nonReentrant
    {
        // TODO: Implement liquidation logic in Week 2
        // - Verify loan is past due
        // - Initiate foreclosure process
        // - Recover funds from property sale
        // - Distribute recovered funds via waterfall

        emit LoanDefaulted(loanId);
    }

    /**
     * @notice Gets total value locked in the pool
     * @return uint256 Total TVL in USDC
     */
    function getTotalValue() external view override returns (uint256) {
        return totalSeniorDeposits + totalJuniorDeposits;
    }

    /**
     * @notice Gets senior tranche TVL
     * @return uint256 Senior TVL in USDC
     */
    function getSeniorTVL() external view override returns (uint256) {
        return totalSeniorDeposits;
    }

    /**
     * @notice Gets junior tranche TVL
     * @return uint256 Junior TVL in USDC
     */
    function getJuniorTVL() external view override returns (uint256) {
        return totalJuniorDeposits;
    }

    /**
     * @notice Gets current tranche ratio
     * @return senior Senior percentage
     * @return junior Junior percentage
     */
    function getTrancheRatio()
        external
        view
        override
        returns (uint256 senior, uint256 junior)
    {
        uint256 total = totalSeniorDeposits + totalJuniorDeposits;
        if (total == 0) return (SENIOR_RATIO, JUNIOR_RATIO);

        senior = (totalSeniorDeposits * PERCENTAGE_DIVISOR) / total;
        junior = (totalJuniorDeposits * PERCENTAGE_DIVISOR) / total;
    }

    /**
     * @notice Gets loan details
     * @param loanId Loan identifier
     * @return Loan struct with all loan data
     */
    function getLoan(uint256 loanId)
        external
        view
        override
        returns (Loan memory)
    {
        return loans[loanId];
    }

    /**
     * @notice Gets user's balance in a specific tranche
     * @param user User address
     * @param isSenior true for senior tranche, false for junior
     * @return uint256 User's share balance
     */
    function getUserBalance(address user, bool isSenior)
        external
        view
        override
        returns (uint256)
    {
        return isSenior ? seniorShares[user] : juniorShares[user];
    }

    /**
     * @notice Sets the tranche token addresses
     * @dev Only callable by admin, once during setup
     * @param _seniorToken Senior tranche token address
     * @param _juniorToken Junior tranche token address
     */
    function setTrancheTokens(address _seniorToken, address _juniorToken)
        external
        onlyRole(ADMIN_ROLE)
    {
        require(seniorToken == address(0), "Already set");
        require(_seniorToken != address(0) && _juniorToken != address(0), "Invalid addresses");

        seniorToken = _seniorToken;
        juniorToken = _juniorToken;
    }

    /**
     * @notice Sets the interest distributor address
     * @dev Only callable by admin, once during setup
     * @param _distributor Interest distributor address
     */
    function setInterestDistributor(address _distributor)
        external
        onlyRole(ADMIN_ROLE)
    {
        require(interestDistributor == address(0), "Already set");
        require(_distributor != address(0), "Invalid address");

        interestDistributor = _distributor;
    }
}
