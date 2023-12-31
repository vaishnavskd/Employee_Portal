import React, { useState } from 'react';
import {
    AppBar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Toolbar,
    Typography,
    Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App'

const NavbarAdmin = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        position: '',
        salary: '',
        location: '',
    });
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/')
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        // Reset the newEmployee state when the dialog is closed
        setNewEmployee({
            name: '',
            position: '',
            salary: '',
            location: '',
        });
    };

    const handleInputChange = (e) => {
        setNewEmployee({
            ...newEmployee,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddEmployee = () => {
        // Validate the input values (add more validation as needed)
        if (!newEmployee.name || !newEmployee.position || !newEmployee.salary || !newEmployee.location) {
            alert('Please fill in all fields.');
            return;
        }

        // Send a request to add the new employee
        axios.post('http://localhost:5000/employees', newEmployee, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((response) => {
                alert('Employee added successfully:', response.data);

                handleCloseDialog();
            })
            .catch((error) => {
                console.error('Error adding employee:', error);
                alert('Failed to add employee. Please try again.');
            });
    };
    return (
        <Box sx={{ flexGrow: 1 }} color={'white'}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='left'>
                        Employee Portal
                    </Typography>
                    <Button color='inherit' onClick={handleOpenDialog}>Add New Employee</Button>
                    <Button color='inherit' onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Dialog open={openDialog} onClose={handleCloseDialog} className='App'>
                <DialogTitle>Add New Employee</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                label="Name"
                                name="name"
                                value={newEmployee.name}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                label="Position"
                                name="position"
                                value={newEmployee.position}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                label="Salary"
                                name="salary"
                                value={newEmployee.salary}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                label="Location"
                                name="location"
                                value={newEmployee.location}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleAddEmployee}>Add Employee</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default NavbarAdmin