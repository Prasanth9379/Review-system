import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.css';

function Navbar() {
    const navigate = useNavigate();
    const userEmail = localStorage.getItem('userEmail'); // Get user email from local storage


    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token
        localStorage.removeItem('userEmail'); // Remove user email
        navigate('/'); // Redirect to login page
    };

    return (
        <nav className='navbar'>
            <h3 className='brand'>UT-MART</h3>
            <ul className='nav-links'>
                <li><Link to="/"><i className="fa-solid fa-house"></i> Home</Link></li>
                <li><Link to="/product"><i className="fa-solid fa-list"></i> Product</Link></li>
                <li><a href="#footer"><i className="fa-solid fa-phone"></i> Contact Us</a></li>
                {/* <li><Link to="/cart"><i className="fa-solid fa-cart-shopping"></i> Add to cart</Link></li> */}
                <li>
                    {userEmail ? (
                        <>
                            <span><i className="fa-solid fa-user"></i> {userEmail}</span>
                            <button onClick={handleLogout} className="logout-button">Logout</button>
                        </>
                    ) : (
                        <Link to="/log"><i className="fa-solid fa-user"></i> Login</Link>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
