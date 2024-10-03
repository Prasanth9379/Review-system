// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

function Navbar() {
  return (
    <nav className='navbar'>
      <h3 className='brand'>flash</h3>
      <ul className='nav-links'>
        <li><Link to="/"><i className="fa-solid fa-house"></i> Home</Link></li>
        <li><Link to="/product"><i className="fa-solid fa-list"></i>Product</Link></li>
        <li><a href = "#footer"><i className="fa-solid fa-phone"></i>Contact Us</a></li>
        <li><Link to="/cart"><i className="fa-solid fa-cart-shopping"></i>Add to cart</Link></li>
        <li><Link to="/log"><i className="fa-solid fa-user"></i>Login</Link></li>
      </ul>
      <div className='search-box'>
        <input type="text" placeholder='Search' />
        <button type='submit'><i className="fa-solid fa-magnifying-glass"></i></button>
      </div>
    </nav>
  );
}

export default Navbar;
