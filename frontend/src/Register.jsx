import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import {BrowserRouter, Routes , Route, Link} from 'react-router-dom';

function Register() {
    const [errors, setErrors] = useState({
        name: { required: false },
        email: { required: false },
        password: { required: false },
        confirm_password: { required: false }
    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {
            name: { required: !formData.name },
            email: { required: !formData.email },
            password: { required: !formData.password },
            confirm_password: { required: formData.password !== formData.confirm_password }
        };
        setErrors(newErrors);

        if (!newErrors.name.required && !newErrors.email.required && !newErrors.password.required && !newErrors.confirm_password.required) {
            try {
                await axios.post('http://localhost:5000/register', formData);
                alert('Registration successful');
                // Optionally, redirect to login page
            } catch (error) {
                alert('Registration failed: ' + error.response.data);
            }
        }
    };

    return (
        <div className='container-two'>
        <div className="container1">
            <div className="text">Registration</div>
            <form onSubmit={onSubmit}>
                <div className="data">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" name="name" id="name" onChange={handleChange} />
                    {errors.name.required && <span className='text-danger'>Enter a full name.</span>}
                </div>
                <div className="data">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" onChange={handleChange} />
                    {errors.email.required && <span className='text-danger'>Enter an email.</span>}
                </div>
                <div className="data">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" onChange={handleChange} />
                    {errors.password.required && <span className='text-danger'>Enter a password.</span>}
                </div>
                <div className="data">
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input type="password" name="confirm_password" id="confirm_password" onChange={handleChange} />
                    {errors.confirm_password.required && <span className='text-danger'>Passwords do not match.</span>}
                </div>
                <div className="btn">
                    <button type="submit">Register</button>
                </div>
                <div className="signup-link">
                    Already a member? <Link to = "/log">Login now</Link>
                </div>
            </form>
        </div>
        </div>
    );
}

export default Register;
