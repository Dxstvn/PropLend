// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title ISecondaryMarket
 * @notice Interface for the PropertyLend secondary market
 * @dev Allows trading of tranche tokens between investors
 */
interface ISecondaryMarket {
    // Enums
    enum OrderType {
        Buy,
        Sell
    }

    // Structs
    struct Order {
        address trader;
        OrderType orderType;
        bool isSenior;
        uint256 amount;
        uint256 price;
        uint256 timestamp;
        bool isActive;
    }

    // Events
    event OrderCreated(
        uint256 indexed orderId,
        address indexed trader,
        OrderType orderType,
        bool isSenior,
        uint256 amount,
        uint256 price
    );
    event OrderCancelled(uint256 indexed orderId);
    event OrderFilled(
        uint256 indexed orderId,
        address indexed buyer,
        address indexed seller,
        uint256 amount,
        uint256 price
    );

    // Order Management
    function createOrder(
        OrderType orderType,
        bool isSenior,
        uint256 amount,
        uint256 price
    ) external returns (uint256 orderId);

    function cancelOrder(uint256 orderId) external;

    function fillOrder(uint256 orderId, uint256 amount) external;

    // View Functions
    function getOrder(uint256 orderId) external view returns (Order memory);

    function getActiveOrders(bool isSenior)
        external
        view
        returns (Order[] memory);

    function getUserOrders(address user)
        external
        view
        returns (Order[] memory);
}
