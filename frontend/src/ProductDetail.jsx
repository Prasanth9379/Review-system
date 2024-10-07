import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
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
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!review.trim()) {
            alert('Please enter a review.');
            return;
        }
        try {
            await axios.post('http://localhost:5000/reviews', { productId: product.id, review });
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
        <div className="product-detail">
            <h2>{product.name}</h2>
            <img src={`/${product.imageUrl}`} alt={product.name} className="product-image" />
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>

            <h3>Given reviews</h3>
            <div className="reviews">
                {reviews.length > 0 ? (
                    reviews.map((rev, index) => (
                        <div key={index} className="review">
                            <p>{rev.review}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>
            {localStorage.getItem('userEmail') ? (
            <form onSubmit={handleSubmit}>
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Write your review..."
                    required
                />
                <button type="submit">Submit Review</button>
            </form>
            ) : (
            <div>Please login to submit a review.</div>
            )}
        </div>
    );
};

export default ProductDetail;
