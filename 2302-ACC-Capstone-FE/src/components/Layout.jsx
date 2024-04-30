import { Outlet, Link } from "react-router-dom";
import '../style/layout.css'
import auth from  '../code/Auth'

const Layout = () => {
    function handleLogout() {
        auth.logout();
    }

    let authenticationButton;



if (auth.isLoggedIn()) {
    authenticationButton = <a className="btn" href="/" onClick={e => handleLogout()}>Logout</a>
}
else {
    authenticationButton = <Link className="btn" to="/login">Login</Link>
}
  return (
    <>
        <div className="header">
            <nav >
                <ul className="links">
                    <li>
                        {authenticationButton}
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
                        {auth.isLoggedIn() &&
                            <Link className="btn" to="/cart">Cart</Link>
                        }
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