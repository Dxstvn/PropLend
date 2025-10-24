// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title MockUSDC
 * @notice Mock USDC token for testing on Polygon Amoy testnet
 * @dev ERC-20 token with 6 decimals (matching real USDC)
 * @dev Allows anyone to mint for easy testnet usage
 *
 * ⚠️ WARNING: This is for testnet use only. Never deploy to mainnet.
 * On mainnet, use Circle's official USDC contract.
 */
contract MockUSDC is ERC20 {
    uint8 private constant DECIMALS = 6;

    /**
     * @notice Initializes the MockUSDC token
     * @dev Sets name "USD Coin" and symbol "USDC" to match real USDC
     */
    constructor() ERC20("USD Coin", "USDC") {}

    /**
     * @notice Mints USDC tokens to any address
     * @dev Public function allowing anyone to mint (testnet only)
     * @param to Address to receive the minted tokens
     * @param amount Amount of USDC to mint (with 6 decimals)
     *
     * Example: mint(address, 1000000) = 1 USDC
     */
    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }

    /**
     * @notice Returns the number of decimals for USDC
     * @dev Overrides ERC20 default of 18 to match real USDC (6 decimals)
     * @return uint8 Number of decimals (6)
     */
    function decimals() public pure override returns (uint8) {
        return DECIMALS;
    }

    /**
     * @notice Helper function to mint USDC with human-readable amounts
     * @dev Automatically handles decimal conversion
     * @param to Address to receive the minted tokens
     * @param amountInDollars Amount in dollars (e.g., 1000 = 1000 USDC)
     *
     * Example: mintDollars(address, 1000) = 1000 USDC
     */
    function mintDollars(address to, uint256 amountInDollars) external {
        uint256 amountWithDecimals = amountInDollars * (10 ** DECIMALS);
        _mint(to, amountWithDecimals);
    }
}
