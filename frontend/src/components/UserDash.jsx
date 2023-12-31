import React, { useEffect, useState } from 'react';
import NavbarDash from '../elements/NavbarDash';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress } from '@mui/material';
import axios from 'axios';

const UserDash = () => {
    const [employeeData, setEmployeeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

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
                    setError('Error fetching data. Please try again.');
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, []);

    return (
        <>
            <NavbarDash />
            <div style={{ padding: '7%' }}>
                {loading ? (
                    <CircularProgress />
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <Table component={Paper}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Position</TableCell>
                                <TableCell>Salary</TableCell>
                                <TableCell>Location</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employeeData.map(employee => (
                                <TableRow key={employee.id}>
                                    <TableCell>{employee.name}</TableCell>
                                    <TableCell>{employee.position}</TableCell>
                                    <TableCell>{employee.salary}</TableCell>
                                    <TableCell>{employee.location}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </>
    );
};

export default UserDash;
