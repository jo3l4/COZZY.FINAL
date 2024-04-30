const express = require('express');
const productSizesRouter = express.Router();

const { 
  getProductSizesByProductId,
} = require('../db');

productSizesRouter.get('/byProduct/:productId', async (req, res, next) => {
    try {
        const { productId } = req.params;
        const productSizes = await getProductSizesByProductId(productId);
    
        res.send({
            productSizes
        });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

module.exports = productSizesRouter;
