// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title TrancheTokens
 * @notice ERC-20 tokens representing ownership in PropertyLend tranches
 * @dev Two separate tokens: sSAFE (senior) and jYIELD (junior)
 *
 * Token Details:
 * - sSAFE: Senior tranche token (8-10% fixed APY, low risk)
 * - jYIELD: Junior tranche token (20-30% variable APY, medium-high risk)
 * - Both use 6 decimals to match USDC
 * - Only the LendingPool contract can mint/burn
 * - Tradeable on secondary market
 */
contract TrancheToken is ERC20, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    uint8 private constant DECIMALS = 6;
    bool public immutable isSenior;

    // Custom Errors
    error Unauthorized();
    error InvalidAmount();

    /**
     * @notice Initializes a tranche token
     * @param name Token name ("Senior SAFE Token" or "Junior YIELD Token")
     * @param symbol Token symbol ("sSAFE" or "jYIELD")
     * @param _isSenior true for senior tranche, false for junior
     */
    constructor(
        string memory name,
        string memory symbol,
        bool _isSenior
    ) ERC20(name, symbol) {
        isSenior = _isSenior;

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(BURNER_ROLE, msg.sender);
    }

    /**
     * @notice Mints tranche tokens
     * @dev Only callable by MINTER_ROLE (LendingPool contract)
     * @param to Address to receive tokens
     * @param amount Amount to mint (6 decimals)
     */
    function mint(address to, uint256 amount)
        external
        onlyRole(MINTER_ROLE)
    {
        if (amount == 0) revert InvalidAmount();
        _mint(to, amount);
    }

    /**
     * @notice Burns tranche tokens
     * @dev Only callable by BURNER_ROLE (LendingPool contract)
     * @param from Address to burn tokens from
     * @param amount Amount to burn (6 decimals)
     */
    function burn(address from, uint256 amount)
        external
        onlyRole(BURNER_ROLE)
    {
        if (amount == 0) revert InvalidAmount();
        _burn(from, amount);
    }

    /**
     * @notice Returns the number of decimals
     * @dev Overrides ERC20 default of 18 to match USDC (6 decimals)
     * @return uint8 Number of decimals (6)
     */
    function decimals() public pure override returns (uint8) {
        return DECIMALS;
    }

    /**
     * @notice Gets the tranche type
     * @return string "Senior" or "Junior"
     */
    function getTrancheType() external view returns (string memory) {
        return isSenior ? "Senior" : "Junior";
    }
}
