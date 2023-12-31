import React, { useState, useEffect } from 'react';
import { AppBar, Box, Button, Toolbar, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavbarDash = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [profileData, setProfileData] = useState({
        name: '',
        position: '',
        salary: '',
        location: '',
    });
    const navigate = useNavigate()

    useEffect(() => {
        // Fetch the user's profile data when the component mounts
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (token) {
            axios.get(`http://localhost:5000/employees/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    setProfileData(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, []);
    const handleLogout = () => {
        // Remove the token from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('userId')
        navigate('/')
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleDelete = () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId'); 

        if (window.confirm('Are you sure you want to delete your account?')) {
            axios.delete(`http://localhost:5000/employees/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    alert('Account deleted successfully');
                    navigate('/login');
                })
                .catch(error => {
                    console.error('Error deleting account:', error);
                });
        }
    };
    

    const handleSaveProfile = () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId'); // Assuming you store the user ID in localStorage

        axios.put(`http://localhost:5000/employees/${userId}`, profileData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                alert('Profile updated successfully');
                handleCloseDialog();
            })
            .catch(error => {
                console.error('Error updating profile:', error);
            });
    };



    const handleInputChange = (e) => {
        // Update the local state with the modified input value
        setProfileData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <Box sx={{ flexGrow: 1 }} color={'white'}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='left'>
                        Employee Portal
                    </Typography>
                    <Button color='inherit' onClick={handleOpenDialog}>
                        Edit Profile
                    </Button>
                    <Button color='inherit' onClick={handleDelete}>Delete Account</Button>
                    <Button color='inherit' onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>

            {/* Dialog for editing profile */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                label="Name"
                                name="name"
                                value={profileData.name}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                label="Position"
                                name="position"
                                value={profileData.position}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                label="Salary"
                                name="salary"
                                value={profileData.salary}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                label="Location"
                                name="location"
                                value={profileData.location}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSaveProfile}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default NavbarDash;
