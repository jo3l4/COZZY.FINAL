const express = require('express');
const orderRouter = express.Router();

const { requireCustomer } = require('./utils');

const { 
  getCartItemsByCustomerId,
  clearCartItems,
  createOrder,
  createOrderItems,
  getOrder,
  getOrders,
  getOrderItemsByOrderId
} = require('../db');

orderRouter.get('/', requireCustomer, async (req, res, next) => {
  try {
    const orders = await getOrders();

    res.send({
      orders,
    })
  } catch ({ name, message }) {
    next({ name, message });
  }
});

orderRouter.get('/:orderId', requireCustomer, async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await getOrder(orderId);
    const orderItems = await getOrderItemsByOrderId(orderId);

    res.send({
      order,
      orderItems
    })
  } catch ({ name, message }) {
    next({ name, message });
  } 
});

orderRouter.post('/', requireCustomer, async (req, res, next) => {
    try {
      const customerId = req.customer.id;
  
      const products = await getCartItemsByCustomerId(customerId);

      if (!products || !products.length) {
            throw "Nothing in the cart to place an order for."
        }

      const totalItems = products.map(p => p.quantity).reduce((a, b) => a + b, 0);
      const totalPrice = products.map(p => p.price * p.quantity).reduce((a, b) => a + b, 0);
      const placedTimestamp = new Date();
      const order = await createOrder({
        customerId,
        totalItems,
        totalPrice,
        placedTimestamp
      });

      const itemsForOrder = products.map(p => {
        return { 
            orderId: order.id,
            productSizeId: p.productSizeId,
            quantity: p.quantity,
            price: p.price
        }
      });

      const orderItems = await createOrderItems(itemsForOrder);

      order.orderItems = orderItems;

      await clearCartItems(customerId);

      res.send({
        order
      });
    } catch ({ name, message }) {
      next({ name, message });
    } 
  });

module.exports = orderRouter;
