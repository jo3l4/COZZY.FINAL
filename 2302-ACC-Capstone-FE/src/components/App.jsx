import { BrowserRouter, Routes, Route } from "react-router-dom";

import Cart from './Cart.jsx';
import Home from './Home.jsx';
import Layout from './Layout.jsx';
import Login from './Login.jsx';
import NoPage from './NoPage.jsx';
import Order from './Order.jsx';
import Product from './Product.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order/:orderId" element={<Order />} />
          <Route path="product/:productId" element={<Product />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
