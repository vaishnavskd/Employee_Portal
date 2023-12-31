import React, { useState, useEffect } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import NavbarAdmin from '../elements/NavbarAdmin';
import axios from 'axios';

const AdminDash = () => {
    const [employeeData, setEmployeeData] = useState([]);
    const [editableRowId, setEditableRowId] = useState(null);

    useEffect(() => {
        // Fetch data from the backend using the stored token
        const token = localStorage.getItem('token');
        console.log(token)
        // Ensure there is a token before making the request
        if (token) {
            axios.get('http://localhost:5000/employees', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    setEmployeeData(response.data);
                })
                .catch(error => {
                    console.error('Error fetching employee data:', error);
                });
        }
    }, []); 

    const handleUpdate = (employeeId) => {
        const updatedEmployee = employeeData.find(employee => employee._id === employeeId);
        const token = localStorage.getItem('token');
        axios.put(`http://localhost:5000/employees/${employeeId}`, updatedEmployee, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                alert('Employee updated successfully');

                setEditableRowId(null);

                setEmployeeData(prevData =>
                    prevData.map(employee =>
                        employee._id === employeeId ? { ...employee, ...updatedEmployee } : employee
                    )
                );
            })
            .catch(error => {
                console.error('Error updating employee:', error);
            });
    };

    const handleDelete = (employeeId) => {
        // Implement your logic to delete the employee on the server
        const token = localStorage.getItem('token');
        axios.delete(`http://localhost:5000/employees/${employeeId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                alert('Employee deleted successfully');
                setEmployeeData(prevData =>
                    prevData.filter(employee =>
                        employee._id !== employeeId
                    )
                );
            })
            .catch(error => {
                console.error('Error deleting employee:', error);
            });
    };

    const handleEdit = (employeeId) => {
        setEditableRowId(employeeId);
    };

    const handleInputChange = (e, employeeId) => {
        setEmployeeData(prevData =>
            prevData.map(employee =>
                employee._id === employeeId ? { ...employee, [e.target.name]: e.target.value } : employee
            )
        );
    };

    return (
        <>
            <NavbarAdmin />
            <div style={{ padding: '7%' }}>
                <Table component={Paper}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Position</TableCell>
                            <TableCell>Salary</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employeeData.map((employee) => (
                            <TableRow key={employee._id}>
                                <TableCell>
                                    {editableRowId === employee._id ? (
                                        <TextField
                                            name="name"
                                            value={employee.name}
                                            onChange={(e) => handleInputChange(e, employee._id)}
                                        />
                                    ) : (
                                        employee.name
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editableRowId === employee._id ? (
                                        <TextField
                                            name="position"
                                            value={employee.position}
                                            onChange={(e) => handleInputChange(e, employee._id)}
                                        />
                                    ) : (
                                        employee.position
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editableRowId === employee._id ? (
                                        <TextField
                                            name="salary"
                                            value={employee.salary}
                                            onChange={(e) => handleInputChange(e, employee._id)}
                                        />
                                    ) : (
                                        employee.salary
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editableRowId === employee._id ? (
                                        <TextField
                                            name="location"
                                            value={employee.location}
                                            onChange={(e) => handleInputChange(e, employee._id)}
                                        />
                                    ) : (
                                        employee.location
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editableRowId === employee._id ? (
                                        <Button onClick={() => handleUpdate(employee._id)}>Save</Button>
                                    ) : (
                                        <>
                                            <Button onClick={() => handleEdit(employee._id)}>Edit</Button>
                                            <Button onClick={() => handleDelete(employee._id)}>Delete</Button>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default AdminDash;
