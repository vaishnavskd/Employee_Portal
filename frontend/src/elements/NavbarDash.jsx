import React from 'react'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NavbarDash = () => {
    return (
        <Box sx={{ flexGrow: 1 }} color={'white'}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='left'>
                        Employee Portal
                    </Typography>
                    <Button color='inherit'>Edit Profile</Button>
                    <Link to={'/'} style={{textDecoration:'none', color:'white'}}><Button color='inherit'>Logout</Button></Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavbarDash