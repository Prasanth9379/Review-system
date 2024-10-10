import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Product.css';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const navigate = useNavigate(); // Use useNavigate for navigation

    useEffect(() => {
        axios.get('http://localhost:5000/product')
            .then((response) => {
                setProducts(response.data);
                setFilteredProducts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);

    const handleSearchChange = (e) => {
        const searchText = e.target.value.toLowerCase();

        // Check if searchText is a full URL
        const regex = /\/product\/(\d+)/; // Regex to extract the product ID from the URL
        const match = searchText.match(regex);
        if (match) {
            const productId = match[1]; // Extract product ID
            navigate(`/product/${productId}`); // Redirect to the product detail page
            return;
        }

        // Filter by name or description if not a URL
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(searchText) || product.description.toLowerCase().includes(searchText)
        );
        setFilteredProducts(filtered);
    };

    const copyLink = (id) => {
        const url = `${window.location.origin}/product/${id}`;
        navigator.clipboard.writeText(url)
            .then(() => {
                alert('Link copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    if (loading) {
        return <div>Loading products...</div>;
    }

    return (
        <div className="product-list">
            <Link to="/"><i className="fa-solid fa-house"></i></Link>
            <h2>PRODUCTS</h2>
            <input type="search" placeholder="Search Products" onChange={handleSearchChange} />
            <i className="fa-solid fa-magnifying-glass"></i>
            <div className="products">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="product-card text-center">
                        <img src={`/${product.imageUrl}`} alt={product.name} className="product-image" />
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p><strong>Price: </strong>Rs. {product.price.toFixed(2)}</p>
                            <Link to={`/product/${product.id}`}>View details</Link>
                            <button className = "copybutton" onClick={() => copyLink(product.id)}><i className="fa-regular fa-copy"></i></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product;

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import './Product.css';

// const Product = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [filteredProducts, setFilteredProducts] = useState([]);

//     useEffect(() => {
//         // Fetch product details from backend
//         axios.get('http://localhost:5000/product')
//             .then((response) => {
//                 setProducts(response.data); // Set products in state
//                 setFilteredProducts(response.data); // Initialize filteredProducts
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 console.error('Error fetching products:', error);
//                 setLoading(false);
//             });
//     }, []);

//     const handleSearchChange = (e) => {
//         const searchText = e.target.value.toLowerCase();
        
//         // Check if searchText is a full URL
//         const regex = /\/product\/(\d+)/; // Regex to extract the product ID from the URL
//         const match = searchText.match(regex);
//         if (match) {
//             const productId = match[1]; // Extract product ID
//             const filtered = products.filter(product => product.id.toString() === productId);
//             setFilteredProducts(filtered);
//             return;
//         }
    
//         // Otherwise filter by name or description
//         const filtered = products.filter((product) =>
//             product.name.toLowerCase().includes(searchText) || product.description.toLowerCase().includes(searchText)
//         );
//         setFilteredProducts(filtered);
//     };
    
//     const copyLink = (id) => {
//         const url = `${window.location.origin}/product/${id}`;
//         navigator.clipboard.writeText(url)
//             .then(() => {
//                 alert('Link copied to clipboard!');
//             })
//             .catch(err => {
//                 console.error('Failed to copy: ', err);
//             });
//     };

//     if (loading) {
//         return <div>Loading products...</div>;
//     }

//     return (
//         <div className="product-list">
//             <Link to="/"><i className="fa-solid fa-house"></i> </Link>
//             <h2>PRODUCTS</h2>
//             <input type="search" placeholder="Search Products" onChange={handleSearchChange} />
//             <i className="fa-solid fa-magnifying-glass"></i>
//             <div className="products">
//                 {filteredProducts.map((product) => (
//                     <div key={product.id} className="product-card text-center">
//                         <img
//                             src={`/${product.imageUrl}`} 
//                             alt={product.name}
//                             className="product-image"
//                         />
//                         <div className="product-info">
//                             <h3>{product.name}</h3>
//                             <p>{product.description}</p>
//                             <p><strong>Price: </strong>Rs. {product.price.toFixed(2)}</p>
//                             <Link to={`/product/${product.id}`}>View details</Link>
//                             <button onClick={() => copyLink(product.id)}>Copy Link</button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Product;



// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import './Product.css';

// const Product = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [filteredProducts, setFilteredProducts] = useState([]);

//     useEffect(() => {
//         // Fetch product details from backend
//         axios.get('http://localhost:5000/product')
//             .then((response) => {
//                 setProducts(response.data); // Set products in state
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 console.error('Error fetching products:', error);
//                 setLoading(false);
//             });
//     }, []);

//     const handleSearchChange = (e) => {
//         const searchText = e.target.value.toLowerCase();
//         const filtered = products.filter((product) =>
//             product.name.toLowerCase().includes(searchText) || product.description.toLowerCase().includes(searchText)
//         );
//         setFilteredProducts(filtered);
//     };

//     if (loading) {
//         return <div>Loading products...</div>;
//     }

//     return (
//         <div className="product-list">
//             <Link to ="/"><i className="fa-solid fa-house"></i> </Link>
//             <h2>PRODUCTS</h2>
//          <input type="search" placeholder="Search Products" onChange={handleSearchChange} />
//             <div className="products">
//                 {filteredProducts.map((product) => (
//                     <div key={product.id} className="product-card text-center">
//                         <img
//                             src={`/${product.imageUrl}`} 
//                             alt={product.name}
//                             className="product-image"
//                         />
//                         <div className="product-info">
//                             <h3>{product.name}</h3>
//                             <p>{product.description}</p>
//                             <p><strong>Price: </strong>Rs. {product.price.toFixed(2)}</p>
//                             <Link to={`/product/${product.id}`}>View details</Link>

//                             </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Product;
