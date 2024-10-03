import React, { useState } from 'react';
import './Login.css'; 
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        email: { required: false },
        password: { required: false },
        custom_error: null
    });

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {
            email: { required: !formData.email },
            password: { required: !formData.password },
            custom_error: null
        };
        setErrors(newErrors);

        if (!newErrors.email.required && !newErrors.password.required) {
            try {
                const response = await axios.post('http://localhost:5000/login', formData);
                localStorage.setItem('token', response.data.token); // Store token for future requests
                navigate('/');
            } catch (error) {
                setErrors({ ...newErrors, custom_error: 'Invalid email or password' });
            }
        }
    };

    return (
        <div className='container-first'>
        <div className="container">
            <div className="text">User Login</div>
            <form onSubmit={onSubmit}>
                <div className="data">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" onChange={handleChange} />
                    {errors.email.required && <span className='text-danger'>Email is required</span>}
                </div>
                <div className="data">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" onChange={handleChange} />
                    {errors.password.required && <span className='text-danger'>Password is required</span>}
                </div>
                {errors.custom_error && <span className='text-danger'>{errors.custom_error}</span>}
                <div className="btn">
                    <button navigate = "/" type="submit">Login</button>
                </div>
                <div className="signup-link">
                    Not a member? <Link to="/register">Register here</Link>
                </div>
            </form>
        </div>
    </div>
    );
}

export default Login;
