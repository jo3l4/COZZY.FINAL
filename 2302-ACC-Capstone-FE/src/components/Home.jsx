import React, { useEffect, useState } from 'react'
import '../style/home.css'

import api from '../code/Api.js'
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await api.products.getAll();
        const responseObj = await response.json();
        setProducts(responseObj.products);
      } catch (err) {
        console.error(err);
      }
    }
    getAllProducts();
  }, []);

  function getProductLink(product) {
    return `product/${product?.id}`
  }

  return (
    <div>
      <div className="products-container">
        {!!products.length &&
          products.map((product, i) => {
            return (
            <div key={i} className="product-window">
              <div className="product-image">
                <Link to={getProductLink(product)}>
                    <img src={product.imageUrl} alt="Product Image" id={product.id}></img>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
      {/*     
      <div className="product-window">
        <h2>Featured Product</h2>
        <div className="product-image">
          <img src="https://assets.basspro.com/image/upload/c_limit,dpr_1.0,f_auto,h_948,q_auto,w_2000/c_limit,h_948,w_2000/v1/ProductImages/600/brown_84638_main?pgw=1" alt="Product Image" id="pants.1"></img>
        </div>   
      </div>*/}
    </div>
  )
}

export default Home
