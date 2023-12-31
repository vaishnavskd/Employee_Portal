import { Grid, TextField, Typography, Button } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../App'
import axios from 'axios';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        location: '',
        salary: '',
        position: '',
    });
    const navigate = useNavigate()

    // Handle form field changes
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/add', formData);
            alert('Signup successful:', response.data);
            navigate('/login');
        } catch (error) {
            alert('Signup failed:', error.response.data);
        }
    };
    return (
        <div style={{ margin: '7%' }} className='App'>
            <Typography variant='h5'>Signup</Typography>
            <br />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                    <TextField fullWidth required variant='outlined' label='Enter your Name' name='name' value={formData.name}
                        onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <TextField fullWidth required variant='outlined' label='Enter your Email/Username' name='username' value={formData.username}
                        onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <TextField fullWidth required variant='outlined' type='password' label='Enter your Password' name='password' value={formData.password}
                        onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <TextField fullWidth variant='outlined' label='Enter your Location' name='location' value={formData.location}
                        onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <TextField fullWidth variant='outlined' label='Enter your Salary' name='salary' value={formData.salary}
                        onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <TextField fullWidth variant='outlined' label='Enter your Position' name='position' value={formData.position}
                        onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Button variant='contained' onClick={handleSubmit}>Submit</Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Link to={'/login'} style={{ textDecoration: 'none', color: 'black' }}>Click here if you already have an account</Link>
                </Grid>
            </Grid>
        </div>
    )
}

export default SignUp