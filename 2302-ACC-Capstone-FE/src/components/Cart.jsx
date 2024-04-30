import React, { useEffect, useState } from 'react'
import '../style/cart.css'

import api from '../code/Api.js'

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const getAllCartItems = async () => {
      try {
        const response = await api.cartItems.getAll();
        const responseObj = await response.json();
        setCartItems(responseObj.cartItems);
      } catch (err) {
        console.error(err);
      }
    }
    getAllCartItems();
  }, []);

  function handleCheckoutClicked() {
    const createOrderFromCart = async () => {
      var createOrderResponse = await api.orders.create();
      const responseBody = await createOrderResponse.json();
      
      if (createOrderResponse.ok && responseBody?.order?.id) {
        window.location.href = `orders/${responseBody.order.id}`;
      }
    };
    createOrderFromCart();
  }

  return (
    <div>
      <div className="cart-container">
        <ul className="cart-item-list">
          {!!cartItems.length &&
            cartItems.map((cartItem, i) => {
              return (
              <li key={i} className="cart-item">
                <div className="product-image">
                  <img src={cartItem.imageUrl} alt="Product Image" id={cartItem.id}></img>
                </div>
                <div>{cartItem.name}</div>
                <div>Quantity: {cartItem.quantity}</div>
                <div>Size: {cartItem.size}</div>
                <div>Item Price: {cartItem.price}</div>
              </li>
            )
          })}
        </ul>
        <input type="button" value="Checkout" onClick={e => handleCheckoutClicked()}  />
      </div>
    </div>
  )
}

export default Cart;
