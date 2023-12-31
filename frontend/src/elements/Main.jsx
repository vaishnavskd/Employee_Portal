import React from 'react'
import { Typography, Button, Grid } from '@mui/material';
import '../App.css'
import { Link } from 'react-router-dom';

const Main = () => {
    return (
        <>
        <div className="App main">
            <Typography variant='h3'>Welcome to Employee Portal</Typography>
            <br />
            <Grid container spacing={1} className='grid'>
                <Grid item xs={3} sm={3} md={3}>
                    <Link to={'/login'} style={{ textDecoration: 'none', color: 'white' }}>
                        <Button fullWidth variant="contained" color="primary">
                            Login
                        </Button>
                    </Link>
                </Grid>
                <Grid item xs={3} sm={3} md={3}>
                    <Link to={'/signup'} style={{ textDecoration: 'none', color: 'white' }}>
                        <Button fullWidth variant="contained" color="primary">
                            Signup
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </div >
        </>
    )
}

export default Main