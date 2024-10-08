import React, { useEffect, useState } from 'react';
import ProductDetail from './ProductDetail';
import Product from './Product';

function Admin() {
  const [isAdminLogged, setIsAdminLogged] = useState(false);

  useEffect(() => {
    // Set adminlogged value in local storage
    localStorage.setItem("adminlogged", "true");
    
    // Check if adminlogged exists and update state
    const adminStatus = localStorage.getItem("adminlogged");
    setIsAdminLogged(adminStatus === "true");
  }, []);

  return (
    <div>
      {/* {isAdminLogged ? "Admin is logged in" : "Admin is not logged in"} */}
      <ProductDetail/>
    </div>
  );
}

export default Admin;
