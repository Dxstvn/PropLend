// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title ILendingPool
 * @notice Interface for the PropertyLend lending pool
 * @dev Defines the core functions for deposits, loans, and withdrawals
 */
interface ILendingPool {
    // Enums
    enum LoanStatus {
        Pending,
        Active,
        Repaid,
        Defaulted
    }

    // Structs
    struct Loan {
        address borrower;
        uint256 amount;
        uint256 interestRate;
        uint256 ltv;
        uint256 startTime;
        uint256 endTime;
        uint256 propertyValue;
        bytes32 propertyId;
        LoanStatus status;
    }

    // Events
    event Deposited(
        address indexed user,
        uint256 amount,
        bool isSenior,
        uint256 shares
    );
    event Withdrawn(
        address indexed user,
        uint256 amount,
        bool isSenior,
        uint256 shares
    );
    event LoanOriginated(
        uint256 indexed loanId,
        address indexed borrower,
        uint256 amount,
        uint256 interestRate
    );
    event LoanRepaid(uint256 indexed loanId, uint256 amount);
    event LoanDefaulted(uint256 indexed loanId);
    event InterestDistributed(uint256 seniorAmount, uint256 juniorAmount);

    // Deposit Functions
    function deposit(uint256 amount, bool isSenior)
        external
        returns (uint256 shares);

    function withdraw(uint256 shares, bool isSenior)
        external
        returns (uint256 amount);

    // Loan Functions
    function applyForLoan(
        uint256 amount,
        bytes32 propertyId,
        uint256 propertyValue,
        uint256 term
    ) external returns (uint256 loanId);

    function repayLoan(uint256 loanId) external;

    function liquidateLoan(uint256 loanId) external;

    // View Functions
    function getTotalValue() external view returns (uint256);

    function getSeniorTVL() external view returns (uint256);

    function getJuniorTVL() external view returns (uint256);

    function getTrancheRatio() external view returns (uint256, uint256);

    function getLoan(uint256 loanId) external view returns (Loan memory);

    function getUserBalance(address user, bool isSenior)
        external
        view
        returns (uint256);
}
