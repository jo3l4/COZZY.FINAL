const express = require('express');
const cartItemRouter = express.Router();

const { requireCustomer } = require('./utils');

const { 
  getCartItemsByCustomerId,
  createCartItem,
} = require('../db');

cartItemRouter.get('/', requireCustomer, async (req, res, next) => {
  try {
    const cartItems = await getCartItemsByCustomerId(req.customer.id);

    res.send({
      cartItems
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

cartItemRouter.get('/:customerId', requireCustomer, async (req, res, next) => {
  try {
    const { customerId } = req.params;
    const cartItems = await getCartItemsByCustomerId(customerId);
  
    res.send({
      cartItems
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

cartItemRouter.post('/:productSizeId/:quantity', requireCustomer, async (req, res, next) => {
  try {
    const { productSizeId, quantity } = req.params;

    const cartItem = await createCartItem({
      productSizeId,
      quantity,
      customerId: req.customer.id
    });

    res.send({
      cartItem
    });
  } catch ({ name, message }) {
    next({ name, message });
  } 
});

module.exports = cartItemRouter;
