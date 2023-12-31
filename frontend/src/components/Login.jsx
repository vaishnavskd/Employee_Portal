import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import '../App'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';



const Login = () => {
    const navigate=useNavigate()
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const handleInputChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', credentials);
            const token = response.data.token;
            const role = response.data.role;
            const userId = response.data.id
            if(role==='user'){
            localStorage.setItem('userId',userId)}

            // Store the token in localStorage or a secure storage method
            localStorage.setItem('token', token);

            if (role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/user');
            }
        } catch (error) {
            alert('Login failed', error);
            // Handle login failure (show error message, etc.)
        }
    };
    return (
        <div style={{ margin: '7%' }}>
            <Typography variant='h4'>Login</Typography>
            <br />
            <Grid container spacing={2} direction={'column'}
                justify={'center'}
                alignItems={'center'}>
                <Grid item xs={12} sm={12} md={12}>
                    <TextField fullWidth variant='outlined' label='Username/Email' value={credentials.username} onChange={handleInputChange} name='username' />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <TextField fullWidth variant='outlined' type='password' label='Password' value={credentials.password} onChange={handleInputChange} name='password' />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Button variant='contained' onClick={handleLogin}>Login</Button>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Link to={'/signup'} style={{textDecoration:'none', color:'black'}}>Click here to create an account</Link>
                </Grid>
            </Grid>
        </div>
    )
}

export default Login