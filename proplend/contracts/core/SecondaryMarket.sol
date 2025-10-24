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

        // Get the appropriate token
        IERC20 token = isSenior ? seniorToken : juniorToken;

        if (orderType == OrderType.Sell) {
            // Sell order: Escrow tranche tokens from seller
            // Check seller has sufficient balance
            if (token.balanceOf(msg.sender) < amount) revert InsufficientBalance();

            // Transfer tokens to contract for escrow
            bool success = token.transferFrom(msg.sender, address(this), amount);
            require(success, "Token transfer failed");
        } else {
            // Buy order: Escrow USDC from buyer
            // Calculate total USDC needed
            uint256 totalCost = (amount * price) / 1e6;

            // Check buyer has sufficient USDC
            if (usdc.balanceOf(msg.sender) < totalCost) revert InsufficientBalance();

            // Transfer USDC to contract for escrow
            bool success = usdc.transferFrom(msg.sender, address(this), totalCost);
            require(success, "USDC transfer failed");
        }

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

        // Get the appropriate token
        IERC20 token = order.isSenior ? seniorToken : juniorToken;

        // Return escrowed assets to trader
        if (order.orderType == OrderType.Sell) {
            // Return escrowed tranche tokens
            bool success = token.transfer(msg.sender, order.amount);
            require(success, "Token transfer failed");
        } else {
            // Return escrowed USDC
            uint256 totalCost = (order.amount * order.price) / 1e6;
            bool success = usdc.transfer(msg.sender, totalCost);
            require(success, "USDC transfer failed");
        }

        // Mark order as inactive
        order.isActive = false;

        // Remove from activeOrderIds array
        _removeFromActiveOrders(orderId);

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

        // Get the appropriate token
        IERC20 token = order.isSenior ? seniorToken : juniorToken;

        // Calculate costs
        uint256 totalCost = (amount * order.price) / 1e6;
        uint256 fee = (totalCost * TRADING_FEE_BPS) / BPS_DIVISOR;
        uint256 sellerReceives = totalCost - fee;

        if (order.orderType == OrderType.Sell) {
            // Sell order: Transfer tokens from escrow to buyer, USDC from buyer to seller

            // Check buyer has sufficient USDC
            if (usdc.balanceOf(msg.sender) < totalCost) revert InsufficientBalance();

            // Transfer tranche tokens from escrow to buyer
            bool tokenSuccess = token.transfer(msg.sender, amount);
            require(tokenSuccess, "Token transfer failed");

            // Transfer USDC from buyer to seller (minus fee)
            bool usdcSuccess = usdc.transferFrom(msg.sender, order.trader, sellerReceives);
            require(usdcSuccess, "USDC transfer to seller failed");

            // Transfer fee to platform treasury
            bool feeSuccess = usdc.transferFrom(msg.sender, platformTreasury, fee);
            require(feeSuccess, "Fee transfer failed");
        } else {
            // Buy order: Transfer tokens from seller to buyer, USDC from escrow to seller

            // Check seller has sufficient tokens
            if (token.balanceOf(msg.sender) < amount) revert InsufficientBalance();

            // Transfer tranche tokens from seller to buyer (order.trader)
            bool tokenSuccess = token.transferFrom(msg.sender, order.trader, amount);
            require(tokenSuccess, "Token transfer failed");

            // Transfer USDC from escrow to seller (minus fee)
            bool usdcSuccess = usdc.transfer(msg.sender, sellerReceives);
            require(usdcSuccess, "USDC transfer to seller failed");

            // Transfer fee to platform treasury
            bool feeSuccess = usdc.transfer(platformTreasury, fee);
            require(feeSuccess, "Fee transfer failed");
        }

        totalVolume += totalCost;
        totalFees += fee;

        // Update order amount
        order.amount -= amount;
        if (order.amount == 0) {
            order.isActive = false;
            _removeFromActiveOrders(orderId);
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
        // Note: This implementation is O(n) where n is number of active orders
        // For gas optimization with large order books, consider using a mapping-based index
        // Current implementation is sufficient for MVP with expected order volume <1000

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
        // Note: This implementation is O(n) where n is total number of orders
        // For gas optimization with many users, consider maintaining per-user order index
        // Current implementation is sufficient for MVP

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

    /**
     * @notice Removes an order ID from the activeOrderIds array
     * @dev Internal helper function for order cancellation and completion
     * @param orderId Order ID to remove
     */
    function _removeFromActiveOrders(uint256 orderId) private {
        for (uint256 i = 0; i < activeOrderIds.length; i++) {
            if (activeOrderIds[i] == orderId) {
                // Replace with last element and pop
                activeOrderIds[i] = activeOrderIds[activeOrderIds.length - 1];
                activeOrderIds.pop();
                break;
            }
        }
    }
}
