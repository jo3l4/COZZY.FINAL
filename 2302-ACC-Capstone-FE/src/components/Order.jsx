import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../style/order.css'

import api from '../code/Api.js'

const Order = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const response = await api.orders.getDetails(orderId);
        const responseBody = await response.json();
        setOrder(responseBody.order);
        setOrderItems(responseBody.orderItems);
      } catch (err) {
        console.error(err);
      }
    }
    getOrderDetails();
  }, []);

  return (
    <div>
      <div className="order-container">
        <ul className="order-item-list">
          {!!orderItems.length &&
            orderItems.map((orderItem, i) => {
              return (
              <li key={i} className="order-item">
                <div className="product-image">
                  <img src={orderItem.imageUrl} alt="Product Image" id={orderItem.id}></img>
                </div>
                <div>{orderItem.name}</div>
                <div>Quantity: {orderItem.quantity}</div>
                <div>Size: {orderItem.size}</div>
                <div>Item Price: ${orderItem.price}</div>
              </li>
            )
          })}
        </ul>
        <div>Total Items: {order.totalItems}</div>
        <div>Total Price: ${order.totalPrice}</div>
      </div>
    </div>
  )
}

export default Order;
