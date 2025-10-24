// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title InterestDistributor
 * @notice Manages waterfall payment distribution to tranches
 * @dev Implements priority payment structure: Senior → Platform → Junior
 *
 * Payment Waterfall:
 * 1. Senior tranche receives fixed APY (8-10%)
 * 2. Platform receives operational margin (2-3%)
 * 3. Junior tranche receives all remaining excess (20-30%+)
 *
 * Example:
 * - Loan interest: $20,000 (20% on $100k loan)
 * - Senior payment: $8,000 (8% on $100k senior capital)
 * - Platform margin: $2,000 (2% operational costs)
 * - Junior payment: $10,000 (remaining, often 40-50% APY on $25k junior capital)
 */
contract InterestDistributor is ReentrancyGuard, AccessControl {
    using SafeERC20 for IERC20;

    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");

    // Constants
    uint256 public constant SENIOR_TARGET_APY = 8; // 8% annual
    uint256 public constant PLATFORM_MARGIN = 2; // 2% margin
    uint256 public constant PERCENTAGE_DIVISOR = 100;
    uint256 public constant SECONDS_PER_YEAR = 365 days;

    // State Variables
    IERC20 public immutable usdc;
    address public lendingPool;
    address public platformTreasury;

    uint256 public totalSeniorPaid;
    uint256 public totalJuniorPaid;
    uint256 public totalPlatformPaid;

    // Events
    event InterestDistributed(
        uint256 totalAmount,
        uint256 seniorAmount,
        uint256 juniorAmount,
        uint256 platformAmount
    );
    event PlatformTreasuryUpdated(address indexed oldTreasury, address indexed newTreasury);

    // Custom Errors
    error Unauthorized();
    error InvalidAmount();
    error InvalidAddress();

    /**
     * @notice Initializes the InterestDistributor
     * @param _usdc USDC token address
     * @param _platformTreasury Platform treasury address
     */
    constructor(address _usdc, address _platformTreasury) {
        require(_usdc != address(0), "Invalid USDC address");
        require(_platformTreasury != address(0), "Invalid treasury address");

        usdc = IERC20(_usdc);
        platformTreasury = _platformTreasury;

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(OPERATOR_ROLE, msg.sender);
    }

    /**
     * @notice Distributes interest payments via waterfall
     * @param totalInterest Total interest collected from loan payments
     * @param seniorTVL Current senior tranche TVL
     * @param juniorTVL Current junior tranche TVL
     * @return seniorAmount Amount distributed to senior tranche
     * @return juniorAmount Amount distributed to junior tranche
     * @return platformAmount Amount distributed to platform
     */
    function distributeInterest(
        uint256 totalInterest,
        uint256 seniorTVL,
        uint256 juniorTVL
    )
        external
        onlyRole(OPERATOR_ROLE)
        nonReentrant
        returns (
            uint256 seniorAmount,
            uint256 juniorAmount,
            uint256 platformAmount
        )
    {
        if (totalInterest == 0) revert InvalidAmount();
        require(lendingPool != address(0), "LendingPool not set");

        // Step 1: Calculate senior target payment based on 8% APY
        // This is a pro-rata calculation for the interest period
        // For simplicity in MVP, we assume the interest covers the full period
        uint256 seniorTarget = (seniorTVL * SENIOR_TARGET_APY) / PERCENTAGE_DIVISOR;

        // Senior gets minimum of their target or total interest available
        seniorAmount = seniorTarget > totalInterest ? totalInterest : seniorTarget;

        // Step 2: Calculate platform margin from remaining interest
        uint256 remaining = totalInterest - seniorAmount;
        platformAmount = (remaining * PLATFORM_MARGIN) / PERCENTAGE_DIVISOR;

        // Step 3: Junior tranche gets all remaining excess
        juniorAmount = remaining - platformAmount;

        // Step 4: Transfer platform margin to treasury
        if (platformAmount > 0) {
            usdc.safeTransferFrom(lendingPool, platformTreasury, platformAmount);
        }

        // Note: Senior and junior portions remain in LendingPool
        // Individual investors receive their share when they withdraw

        // Update tracking statistics
        totalSeniorPaid += seniorAmount;
        totalJuniorPaid += juniorAmount;
        totalPlatformPaid += platformAmount;

        emit InterestDistributed(totalInterest, seniorAmount, juniorAmount, platformAmount);
    }

    /**
     * @notice Calculates distribution amounts without executing transfers
     * @param totalInterest Total interest collected from loan payments
     * @param seniorTVL Current senior tranche TVL
     * @param juniorTVL Current junior tranche TVL
     * @return seniorAmount Amount for senior tranche
     * @return juniorAmount Amount for junior tranche
     * @return platformAmount Amount for platform
     */
    function calculateDistribution(
        uint256 totalInterest,
        uint256 seniorTVL,
        uint256 juniorTVL
    )
        public
        pure
        returns (
            uint256 seniorAmount,
            uint256 juniorAmount,
            uint256 platformAmount
        )
    {
        if (totalInterest == 0) {
            return (0, 0, 0);
        }

        // Calculate senior target payment based on 8% APY
        uint256 seniorTarget = (seniorTVL * SENIOR_TARGET_APY) / PERCENTAGE_DIVISOR;

        // Senior gets minimum of their target or total interest available
        seniorAmount = seniorTarget > totalInterest ? totalInterest : seniorTarget;

        // Calculate platform margin from remaining interest
        uint256 remaining = totalInterest - seniorAmount;
        platformAmount = (remaining * PLATFORM_MARGIN) / PERCENTAGE_DIVISOR;

        // Junior tranche gets all remaining excess
        juniorAmount = remaining - platformAmount;
    }

    /**
     * @notice Calculates monthly interest owed to senior tranche
     * @param seniorTVL Current senior tranche TVL
     * @return uint256 Monthly senior interest amount
     */
    function calculateSeniorMonthlyInterest(uint256 seniorTVL)
        public
        pure
        returns (uint256)
    {
        // Monthly rate = Annual rate / 12
        // Amount = TVL * (APY / 100) / 12
        return (seniorTVL * SENIOR_TARGET_APY) / (PERCENTAGE_DIVISOR * 12);
    }

    /**
     * @notice Calculates platform margin on interest
     * @param totalInterest Total interest collected
     * @return uint256 Platform margin amount
     */
    function calculatePlatformMargin(uint256 totalInterest)
        public
        pure
        returns (uint256)
    {
        return (totalInterest * PLATFORM_MARGIN) / PERCENTAGE_DIVISOR;
    }

    /**
     * @notice Gets distribution statistics
     * @return senior Total paid to senior tranche
     * @return junior Total paid to junior tranche
     * @return platform Total paid to platform
     */
    function getDistributionStats()
        external
        view
        returns (
            uint256 senior,
            uint256 junior,
            uint256 platform
        )
    {
        return (totalSeniorPaid, totalJuniorPaid, totalPlatformPaid);
    }

    /**
     * @notice Sets the lending pool address
     * @dev Only callable once during setup
     * @param _lendingPool LendingPool contract address
     */
    function setLendingPool(address _lendingPool)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        require(lendingPool == address(0), "Already set");
        require(_lendingPool != address(0), "Invalid address");
        lendingPool = _lendingPool;
    }

    /**
     * @notice Updates platform treasury address
     * @param _newTreasury New treasury address
     */
    function updatePlatformTreasury(address _newTreasury)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        if (_newTreasury == address(0)) revert InvalidAddress();

        address oldTreasury = platformTreasury;
        platformTreasury = _newTreasury;

        emit PlatformTreasuryUpdated(oldTreasury, _newTreasury);
    }
}
