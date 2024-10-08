import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Product.css';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch product details from backend
        axios.get('http://localhost:5000/product')
            .then((response) => {
                setProducts(response.data); // Set products in state
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading products...</div>;
    }

    return (
        <div className="product-list">
            <Link to ="/"><i className="fa-solid fa-house"></i> </Link>
            <h2>PRODUCTS</h2>
            <div className="products">
                {products.map((product) => (
                    <div key={product.id} className="product-card text-center">
                        <img
                            src={`/${product.imageUrl}`} 
                            alt={product.name}
                            className="product-image"
                        />
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p><strong>Price: </strong>Rs. {product.price.toFixed(2)}</p>
                            <Link to={`/product/${product.id}`}>View details</Link>

                            </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product;
