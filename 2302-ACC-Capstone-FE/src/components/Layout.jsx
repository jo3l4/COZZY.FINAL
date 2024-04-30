import { Outlet, Link } from "react-router-dom";
import '../style/layout.css'

const Layout = () => {
  return (
    <>
        <div className="header">
            <nav >
                <ul className="links">
                    <li>
                        <Link className="btn" to="/login">Login</Link>
                    </li>
                    <li>
                        <div className="wrapper">
                            <div className="home-container">
                                <h1><Link to="/">The Cozy Exchange</Link></h1>
                                <p>Vintage Clothing and Accessories</p>
                                <p>Buy.Sell.Trade!</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <Link className="btn" to="/cart">Cart</Link>
                    </li>
                </ul>
            </nav>
        </div>
        <div className="content">
            <Outlet />
        </div>
    </>
  )
};

export default Layout;