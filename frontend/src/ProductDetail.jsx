import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const userId = localStorage.getItem('userId');
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [review, setReview] = useState('');
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/product/${id}`);
                setProduct(response.data);
                fetchReviews(response.data.id);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product details:', error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const fetchReviews = async (productId) => {
        try {
            const response = await axios.get(`http://localhost:5000/reviews/${productId}`);
            setReviews(response.data);

            console.log(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };
    const handleClick = () => {
        alert('Purchased successfully!');
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!review.trim()) {
            alert('Please enter a review.');
            return;
        }
        try {
            await axios.post('http://localhost:5000/reviews', { productId: product.id, review,userId });
            setReview('');
            if (product) {
                fetchReviews(product.id); // Refresh reviews after submitting
            }
        } catch (error) {
            console.error('Error submitting review:', error.response ? error.response.data : error.message);
            alert('Failed to submit review. Please try again later.');
        }
    };

    if (loading) {
        return <div>Loading product details...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }
    return (
        <div className='pro'>
          {/* <Link to = '/product'><i className="fa-solid fa-arrow-left">Back</i></Link> */}
        <div className="product-detail">
            <h2>{product.name}</h2>
            <img src={`/${product.imageUrl}`} alt={product.name} className="product-image" />
            <p><strong>Description: </strong> {product.description}</p>
            <p className='price'><strong>Price: </strong> Rs.{product.price.toFixed(2)}</p>
            <button type="button" onClick={handleClick} className="btnff">Buy now</button>
            <h3 className='proh'>Reviews</h3>


            <div className="reviews">
                {reviews.length > 0 ? (
                    reviews.map((rev, index) => (
                        <div key={index} className="review">
                            <p><strong>{rev.username}:</strong> {rev.review}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>

            {/* <div className="reviews">
                {reviews.length > 0 ? (
                    reviews.map((rev, index) => (
                        <div key={index} className="review">
                            <p>{rev.username}</p>
                            <p>{rev.review}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div> */}
            {localStorage.getItem('userEmail') ? (
            <form onSubmit={handleSubmit}>
                <textarea
                className='txt'
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Write your review..."
                    required
                />
                <button className='txtbtn'type="submit">Submit</button>
            </form>
            ) : (
            <div className='finaltxt'>Please login to submit a review.</div>
            )}
        </div>
           <Link to = '/product'><i className="fa-solid fa-arrow-left"> Back</i></Link>

        </div>
    );
};

export default ProductDetail;
