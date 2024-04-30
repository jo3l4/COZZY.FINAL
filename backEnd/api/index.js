const express = require('express');
const apiRouter = express.Router();

const jwt = require('jsonwebtoken');
const { getCustomerById } = require('../db');
const config = require('../config');
const { requireCustomer } = require('./utils');


apiRouter.get('/protected-route', requireCustomer, (req, res) => {

    res.json({ message: 'You are authenticated' });
  });

  // set `req.user` if possible
  apiRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
  
    if (!auth) {
      // nothing to see here
      next();
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
  
      try {
        const { id } = jwt.verify(token, config.jwtSecret);
  
        if (id) {
          req.customer = await getCustomerById(id);
          next();
        } else {
          next({
            name: 'AuthorizationHeaderError',
            message: 'Authorization token malformed',
          });
        }
      } catch ({ name, message }) {
        next({ name, message });
      }
    } else {
      next({
        name: 'AuthorizationHeaderError',
        message: `Authorization token must start with ${prefix}`,
      });
    }
  });
  
  
apiRouter.use((req, res, next) => {
    if (req.customer) {
      console.log('Customer is set:', req.customer);
    }
  
    next();
  });
  
  
const customersRouter = require('./customers');
apiRouter.use('/customers', customersRouter);

const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

const productSizesRouter = require('./productSizes');
apiRouter.use('/productsSizes', productSizesRouter);

const cartItemRouter = require('./cartItem');
apiRouter.use('/cartItems', cartItemRouter);

const orderRouter = require('./order');
apiRouter.use('/orders', orderRouter);

apiRouter.use((error, req, res, next) => {
  res.send(error);
});

module.exports = apiRouter;