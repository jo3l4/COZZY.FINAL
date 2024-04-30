const express = require('express');
const customersRouter = express.Router();
const bcrypt = require('bcrypt');
const config = require('../config');
const { requireCustomer } = require('./utils');

const { 
  createCustomer,
  getAllCustomers,
  getCustomerByUsername,
} = require('../db');

const jwt = require('jsonwebtoken');

customersRouter.get('/', requireCustomer, async (req, res, next) => {
  try {
    const customers = await getAllCustomers();
  
    res.send({
      customers
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

customersRouter.post('/authenticate', async (request, response, next) => {
  const { username, password } = request.body;

  // request must have both
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password"
    });
  }

  try {
    const customer = await getCustomerByUsername(username);

    bcrypt.compare(password, customer.password, function(error, result) {
      if (error){
        // handle error
        console.log(error);
        next(error);
      }
      if (result) {
        // Send JWT
        const token = jwt.sign({ 
          id: customer.id, 
          username
        }, config.jwtSecret, {
          expiresIn: '1w'
        });
  
        response.send({ 
          message: "you're logged in!",
          token 
        });
      } else {
        // response is OutgoingMessage object that server response http request
        next({ 
          name: 'IncorrectCredentialsError', 
          message: 'Username or password is incorrect'
        });
      }
    });
  } catch(error) {
    console.log(error);
    next(error);
  }
});

customersRouter.post('/register', async (req, res, next) => {
  const { username, password, name, location } = req.body;

  try {
    const _customer = await getCustomerByUsername(username);
  
    if (_customer) {
      next({
        name: 'CustomerExistsError',
        message: 'A customer by that username already exists'
      });
    }

    const customer = await createCustomer({
      username,
      password,
      name,
      address,
    });

    const token = jwt.sign({ 
      id: customer.id, 
      username
    }, config.jwtSecret, {
      expiresIn: '1w'
    });

    res.send({ 
      message: "thank you for signing up",
      token 
    });
  } catch ({ name, message }) {
    next({ name, message });
  } 
});

module.exports = customersRouter;