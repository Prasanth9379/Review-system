// Cart.jsx
import React from 'react';
import { useCart } from './CartContext';

const Cart = () => {
    const { cart } = useCart();

    return (
        <div className="cart">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>No items in cart</p>
            ) : (
                <ul>
                    {cart.map(item => (
                        <li key={item.id}>
                            {item.name} - Quantity: {item.quantity} - Price: ${(item.price * item.quantity).toFixed(2)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;
