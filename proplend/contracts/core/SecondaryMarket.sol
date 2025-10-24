// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "../interfaces/ISecondaryMarket.sol";

/**
 * @title SecondaryMarket
 * @notice Peer-to-peer marketplace for trading tranche tokens
 * @dev Allows investors to buy/sell sSAFE and jYIELD tokens with instant liquidity
 *
 * Features:
 * - Order book for buy/sell orders
 * - USDC settlement (no price slippage)
 * - 0.3% trading fee (split: 0.2% to LPs, 0.1% to platform)
 * - Instant settlement on order match
 * - Cancel orders anytime before fill
 *
 * Use Cases:
 * - Early exit for investors (avoid 30-day withdrawal notice)
 * - Instant liquidity for small positions
 * - Price discovery for tranche tokens
 * - Arbitrage opportunities between primary and secondary markets
 */
contract SecondaryMarket is ISecondaryMarket, ReentrancyGuard, AccessControl {
    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");

    // Constants
    uint256 public constant TRADING_FEE_BPS = 30; // 0.3% (30 basis points)
    uint256 public constant BPS_DIVISOR = 10000;

    // State Variables
    IERC20 public immutable usdc;
    IERC20 public seniorToken;
    IERC20 public juniorToken;
    address public platformTreasury;

    uint256 public nextOrderId;
    mapping(uint256 => Order) public orders;
    uint256[] public activeOrderIds;

    uint256 public totalVolume;
    uint256 public totalFees;

    // Custom Errors
    error Unauthorized();
    error InvalidAmount();
    error InvalidPrice();
    error OrderNotActive();
    error InsufficientBalance();

    /**
     * @notice Initializes the SecondaryMarket
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
     * @notice Creates a new buy or sell order
     * @param orderType Buy or Sell
     * @param isSenior true for sSAFE, false for jYIELD
     * @param amount Amount of tranche tokens
     * @param price Price per token in USDC (6 decimals)
     * @return orderId Unique order identifier
     */
    function createOrder(
        OrderType orderType,
        bool isSenior,
        uint256 amount,
        uint256 price
    ) external override nonReentrant returns (uint256 orderId) {
        if (amount == 0) revert InvalidAmount();
        if (price == 0) revert InvalidPrice();

        // TODO: Implement order creation in Week 3
        // For Sell orders:
        // - Transfer tranche tokens from seller to contract (escrow)
        // - Create order record
        // For Buy orders:
        // - Transfer USDC from buyer to contract (escrow)
        // - Create order record

        orderId = nextOrderId++;

        orders[orderId] = Order({
            trader: msg.sender,
            orderType: orderType,
            isSenior: isSenior,
            amount: amount,
            price: price,
            timestamp: block.timestamp,
            isActive: true
        });

        activeOrderIds.push(orderId);

        emit OrderCreated(orderId, msg.sender, orderType, isSenior, amount, price);
    }

    /**
     * @notice Cancels an active order
     * @param orderId Order identifier
     */
    function cancelOrder(uint256 orderId) external override nonReentrant {
        Order storage order = orders[orderId];

        if (!order.isActive) revert OrderNotActive();
        if (order.trader != msg.sender) revert Unauthorized();

        // TODO: Implement order cancellation in Week 3
        // - Return escrowed tokens/USDC to trader
        // - Mark order as inactive
        // - Remove from active orders list

        order.isActive = false;

        emit OrderCancelled(orderId);
    }

    /**
     * @notice Fills an active order (full or partial)
     * @param orderId Order identifier
     * @param amount Amount to fill
     */
    function fillOrder(uint256 orderId, uint256 amount)
        external
        override
        nonReentrant
    {
        Order storage order = orders[orderId];

        if (!order.isActive) revert OrderNotActive();
        if (amount == 0 || amount > order.amount) revert InvalidAmount();

        // TODO: Implement order filling in Week 3
        // Calculate fee (0.3%)
        // For Sell orders:
        // - Transfer tranche tokens from escrow to buyer
        // - Transfer USDC from buyer to seller (minus fee)
        // For Buy orders:
        // - Transfer tranche tokens from seller to buyer
        // - Transfer USDC from escrow to seller (minus fee)

        uint256 totalCost = (amount * order.price) / 1e6;
        uint256 fee = (totalCost * TRADING_FEE_BPS) / BPS_DIVISOR;

        totalVolume += totalCost;
        totalFees += fee;

        // Update order amount
        order.amount -= amount;
        if (order.amount == 0) {
            order.isActive = false;
        }

        emit OrderFilled(
            orderId,
            order.orderType == OrderType.Buy ? order.trader : msg.sender,
            order.orderType == OrderType.Sell ? order.trader : msg.sender,
            amount,
            order.price
        );
    }

    /**
     * @notice Gets order details
     * @param orderId Order identifier
     * @return Order struct
     */
    function getOrder(uint256 orderId)
        external
        view
        override
        returns (Order memory)
    {
        return orders[orderId];
    }

    /**
     * @notice Gets all active orders for a tranche
     * @param isSenior true for sSAFE, false for jYIELD
     * @return Order[] Array of active orders
     */
    function getActiveOrders(bool isSenior)
        external
        view
        override
        returns (Order[] memory)
    {
        // TODO: Implement efficient order filtering in Week 3
        // Count matching orders
        uint256 count = 0;
        for (uint256 i = 0; i < activeOrderIds.length; i++) {
            Order memory order = orders[activeOrderIds[i]];
            if (order.isActive && order.isSenior == isSenior) {
                count++;
            }
        }

        // Build result array
        Order[] memory result = new Order[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < activeOrderIds.length; i++) {
            Order memory order = orders[activeOrderIds[i]];
            if (order.isActive && order.isSenior == isSenior) {
                result[index] = order;
                index++;
            }
        }

        return result;
    }

    /**
     * @notice Gets all orders created by a user
     * @param user User address
     * @return Order[] Array of user's orders
     */
    function getUserOrders(address user)
        external
        view
        override
        returns (Order[] memory)
    {
        // TODO: Implement user order tracking in Week 3
        // Count user's orders
        uint256 count = 0;
        for (uint256 i = 0; i < nextOrderId; i++) {
            if (orders[i].trader == user) {
                count++;
            }
        }

        // Build result array
        Order[] memory result = new Order[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < nextOrderId; i++) {
            if (orders[i].trader == user) {
                result[index] = orders[i];
                index++;
            }
        }

        return result;
    }

    /**
     * @notice Gets market statistics
     * @return volume Total trading volume in USDC
     * @return fees Total fees collected
     * @return activeOrders Number of active orders
     */
    function getMarketStats()
        external
        view
        returns (
            uint256 volume,
            uint256 fees,
            uint256 activeOrders
        )
    {
        return (totalVolume, totalFees, activeOrderIds.length);
    }

    /**
     * @notice Sets the tranche token addresses
     * @dev Only callable once during setup
     * @param _seniorToken Senior token address
     * @param _juniorToken Junior token address
     */
    function setTrancheTokens(address _seniorToken, address _juniorToken)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        require(address(seniorToken) == address(0), "Already set");
        require(_seniorToken != address(0) && _juniorToken != address(0), "Invalid addresses");

        seniorToken = IERC20(_seniorToken);
        juniorToken = IERC20(_juniorToken);
    }
}
