import { Button, Card, CardContent, Container, TextField } from '@mui/material';
import React, { useState } from 'react';
import '../../App.css';
import { ToastContainer, toast } from 'react-toastify';
import { BACKEND_API_URL } from '../../constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const RegistrationForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
    });

    const [code, setCode] = useState('');

    const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
        const data = {
            user: {
                username: formData.username,
                password: formData.password
            },
            email: formData.email
        }
        const response = await axios.post(`${BACKEND_API_URL}/register/`, data);
        setCode(response.data['activation_code']);
    }
    catch (error: any) {
        const errors = error.response.data.user;
        for (const key in errors) {
            toast.error(`${key}: ${errors[key]}`);
        }
    }
  };

  return (
    <Container style={{ backgroundColor: "whitesmoke", color: "whitesmoke" }}>
        <Card style={{ backgroundColor: "whitesmoke", color: "whitesmoke" }}>
            <CardContent style={{ backgroundColor: "whitesmoke", color: "whitesmoke" }}>
            
            {code === '' && (
                <form onSubmit={handleSubmit}>

                    <TextField
                    id="username"
                    label="Username"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2, color: "whitesmoke !important" }}
                    onChange={(event) => setFormData({ ...formData, username: event.target.value })}
                    />

                    <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    sx={{ mb: 2, color: "whitesmoke !important" }}
                    onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                    />

                    <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2, color: "whitesmoke !important" }}
                    onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                    />

                    <Button type="submit">Register</Button>

                </form>
            )}

            {code !== '' && (
                <div>
                    <p>Registration successful! You have 10 minutes to activate your account.</p>
                    <Button onClick={() => navigate(`/activate/${code}`)}>Activate Account</Button>
                </div>
            )}

            <ToastContainer />
            </CardContent>
        </Card>
    </Container>
);
};