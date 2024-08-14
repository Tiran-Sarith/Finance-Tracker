import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import './Login.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import UserNavBar from '../UserNavBar';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:7070/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok && result.token) {
                localStorage.setItem("token", result.token);
                navigate("/home");
            } else {
                setErrorMessage('Incorrect email or password');
            }
        } catch (error) {
            console.error(error.message);
            setErrorMessage('An error occurred during login');
        }
    };

    return (
        <div className="login-container">
            <UserNavBar/>
            <div className="login-form-wrapper">
                <Form onSubmit={handleSubmit} className="login-form">
                    <h1 className="login-title">Login</h1>
                    {errorMessage && <Alert variant="danger" className="login-alert">{errorMessage}</Alert>}
                    <Form.Group controlId="formBasicEmail" className="login-form-group">
                        <Form.Label className="login-label">Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="login-input"
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword" className="login-form-group">
                        <Form.Label className="login-label">Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="login-input"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="login-button">
                        Login
                    </Button>
                    <div className="signup-link">
                        <a href='/signup'>Don't have an account? Sign Up</a>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Login;
