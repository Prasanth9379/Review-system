import React from 'react'
import './Home.css';
import Navbar from './Navbar';
import Product from './Product';
import Footer from './Footer';

import Carousel from './Carousel';
function Home() {
  return (
    <div className='Main-home'>
        <Navbar/>
        <Carousel/>
        <Product/>
        <Footer/>
    </div>
  )
}

export default Home