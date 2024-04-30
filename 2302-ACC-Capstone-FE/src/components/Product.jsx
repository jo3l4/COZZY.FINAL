import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import '../style/cart.css'

import api from '../code/Api.js'

const Product = () => {
  var { productId } = useParams();
  const [product, setProduct] = useState();
  const [productSizes, setProductSizes] = useState([]);
  const [selectedProductSize, setSelectedProductSize] = useState();
  const [quantity, setQuantity] = useState();


  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await api.products.getProductDetails(productId);
        const responseObj = await response.json();
        setProduct(responseObj.product);
        setProductSizes(responseObj.productSizes);
        setSelectedProductSize(responseObj.productSizes[0].id);
        setQuantity(1);
      } catch (err) {
        console.error(err);
      }
    }
    getProduct();
  }, []);

  function handleAddToCart(e) {
    const createCartItem = async () => {
      const response = await api.cartItems.create(selectedProductSize, quantity);

      if (response.ok) {
        window.location.href = "/cart";
      }
    }
    createCartItem();
  }

  return (
    <div>
      <div className="product-details">
        {product && <div className="product">
          <div className="product-image">
            <img src={product.imageUrl} alt="Product Image" id={product.id}></img>
          </div>
          <div>
            {product.name}
          </div>
          <div className="sizes-container">
            <label>Size: </label>
            <select
              value={selectedProductSize}
              onChange={event => {
                setSelectedProductSize(event.target.value)
              }}>
              {!!productSizes.length &&
                productSizes.map((productSize, i) => {
                  return (
                  <option key={i} value={productSize.id}>
                    {productSize.size} ({productSize.quantity} in stock)
                  </option>
                )
              })}
            </select>
          </div>
          <div className="quantity-container">
            <label>Quantity</label>
            <input type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)}></input>
          </div>
          <div className="actions-container">
            <input type="button" value="Add to Cart" onClick={handleAddToCart}/>
          </div>
        </div>
        }
      </div>
    </div>
  )
}

export default Product;
