const express = require('express');
const productsRouter = express.Router();

const { 
  getAllProducts,
  getProductById,
  getProductSizesByProductId,
} = require('../db');


productsRouter.get('/', async (req, res, next) => {
    try {
      const products = await getAllProducts();

      res.send({
        products
      });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  
productsRouter.get('/:productId', async (req, res, next) => {
    try {
      const { productId } = req.params;
      const product = await getProductById(productId);
      const productSizes = await getProductSizesByProductId(productId);
      
      const result = {
        product,
        productSizes
      }

      res.send({
        product,
        productSizes
      });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

module.exports = productsRouter;
