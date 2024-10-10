import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./Login";
import Register from "./Register";
import Home from './Home';
import Product from "./Product";
import ProductDetail from "./ProductDetail";
import Admin from './Admin';


function App() {
  return (
  
      <BrowserRouter>
        <Routes> 
          <Route path="/log" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          {/* <Route path="/admin" element = {<Admin/>}/> */}
        </Routes>
      </BrowserRouter>

  );
}

export default App;
