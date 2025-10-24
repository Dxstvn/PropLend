// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title MockProperty
 * @notice Mock property valuation oracle for testing
 * @dev Simulates property appraisal values for loan underwriting
 *
 * ⚠️ WARNING: This is for testnet use only. Never deploy to mainnet.
 * On mainnet, use a real property oracle (API3, Chainlink, or off-chain verification)
 */
contract MockProperty {
    // Mapping of property ID to valuation (in USDC, 6 decimals)
    mapping(bytes32 => uint256) public propertyValues;

    // Mapping of property ID to owner
    mapping(bytes32 => address) public propertyOwners;

    // Events
    event PropertyRegistered(
        bytes32 indexed propertyId,
        address indexed owner,
        uint256 value
    );
    event PropertyValueUpdated(
        bytes32 indexed propertyId,
        uint256 oldValue,
        uint256 newValue
    );

    /**
     * @notice Registers a new property with a valuation
     * @param propertyId Unique identifier for the property (e.g., keccak256 of address)
     * @param owner Address of the property owner
     * @param value Property valuation in USDC (6 decimals)
     */
    function registerProperty(
        bytes32 propertyId,
        address owner,
        uint256 value
    ) external {
        require(propertyValues[propertyId] == 0, "Property already registered");
        require(value > 0, "Value must be greater than 0");

        propertyValues[propertyId] = value;
        propertyOwners[propertyId] = owner;

        emit PropertyRegistered(propertyId, owner, value);
    }

    /**
     * @notice Updates a property's valuation
     * @param propertyId Property identifier
     * @param newValue New property valuation in USDC (6 decimals)
     */
    function updatePropertyValue(bytes32 propertyId, uint256 newValue)
        external
    {
        require(propertyValues[propertyId] > 0, "Property not registered");
        require(newValue > 0, "Value must be greater than 0");

        uint256 oldValue = propertyValues[propertyId];
        propertyValues[propertyId] = newValue;

        emit PropertyValueUpdated(propertyId, oldValue, newValue);
    }

    /**
     * @notice Gets a property's current valuation
     * @param propertyId Property identifier
     * @return uint256 Property value in USDC (6 decimals)
     */
    function getPropertyValue(bytes32 propertyId)
        external
        view
        returns (uint256)
    {
        require(propertyValues[propertyId] > 0, "Property not registered");
        return propertyValues[propertyId];
    }

    /**
     * @notice Checks if a property is registered
     * @param propertyId Property identifier
     * @return bool True if property is registered
     */
    function isPropertyRegistered(bytes32 propertyId)
        external
        view
        returns (bool)
    {
        return propertyValues[propertyId] > 0;
    }

    /**
     * @notice Helper to create a property ID from a string address
     * @param propertyAddress String representation of property address
     * @return bytes32 Property ID
     */
    function createPropertyId(string calldata propertyAddress)
        external
        pure
        returns (bytes32)
    {
        return keccak256(abi.encodePacked(propertyAddress));
    }
}
