import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import '../App'
import { Link } from 'react-router-dom';



const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const handleInputChange=(e)=>{
        setCredentials(...credentials,e.target.value)
    }
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
                    <Button variant='contained'>Login</Button>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Link to={'/signup'} style={{textDecoration:'none', color:'black'}}>Click here to create an account</Link>
                </Grid>
            </Grid>
        </div>
    )
}

export default Login