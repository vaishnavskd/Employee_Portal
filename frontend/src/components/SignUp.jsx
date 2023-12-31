import { Grid, TextField, Typography, Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
import '../App'

const SignUp = () => {
    return (
        <div style={{margin:'7%'}} className='App'>
            <Typography variant='h5'>Signup</Typography>
            <br />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                    <TextField fullWidth required variant='outlined' label='Enter your Name' name='name' />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <TextField fullWidth required variant='outlined' label='Enter your Email' name='username' />
                </Grid>
                <Grid item xs={12} sm={12} md={12}> 
                    <TextField fullWidth required variant='outlined' type='password' label='Enter your Password' name='password' />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <TextField fullWidth variant='outlined' label='Enter your Location' name='location' />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <TextField fullWidth variant='outlined' label='Enter your Salary' name='salary' />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <TextField fullWidth variant='outlined' label='Enter your Position' name='position' />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Button variant='contained'>Submit</Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Link to={'/login'} style={{ textDecoration: 'none', color: 'black' }}>Click here if you already have an account</Link>
                </Grid>
            </Grid>
        </div>
    )
}

export default SignUp