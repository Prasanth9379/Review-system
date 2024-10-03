import React from 'react';
import './Footer.css'; 
import { Link } from "react-router-dom";



function Footer() {
  return (
    <section id="footer">
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
          <ul className="footer-links">
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <Link
            to="https://maps.app.goo.gl/3NnjqkYoGnE7B8ch8"
            target="_blank"
            className="text-white text-decoration-none"
          >
            <p>
              <i className="fas fa-home mr-3"></i>
              <span className="px-2">Porur, Chennai, Tamil Nadu</span>
            </p>
          </Link>

          <Link
            to="mailto:sprasanth002@gmail.com"
            target="_blank"
            className="text-white text-decoration-none"
          >
            <p>
              <i className="fas fa-envelope mr-3"></i>
              <span className="px-2">sprasanth002@gmail.com</span>
            </p>
          </Link>

          <Link
            to="tel:+911234567890"
            target="_blank"
            className="text-white text-decoration-none"
          >
            <p>
              <i className="fas fa-phone mr-3"></i>
              <span className="px-2">+91 12345 67890</span>
            </p>
          </Link>
        </div>

        {/* Social Media Links */}
        <section className="d-flex justify-content-between px-4 pb-3">
          <div className="me-5">
            <span className='lastfooter'>Get connected with us on social networks:</span>
          </div>
          <div className='lastline'>
            <Link to="https://www.facebook.com/" target="_blank" className="text-white me-4">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link to="https://x.com/?lang=en" target="_blank" className="text-white me-4">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link to="https://www.google.co.in/" target="_blank" className="text-white me-4">
              <i className="fab fa-google"></i>
            </Link>
            <Link to="https://www.instagram.com" target="_blank" className="text-white me-4">
              <i className="fab fa-instagram"></i>
            </Link>
          </div>
        </section>
      </footer>
    </section>
  );
}

export default Footer;
