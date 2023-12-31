import React from 'react'
import NavbarDash from '../elements/NavbarDash'
import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

const UserDash = () => {
  return (
    <>
    <NavbarDash/>
    <div style={{padding:'7%'}}>
        <Table component={Paper}>
            <TableHead>
                <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Salary</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                        <Button>Edit</Button>
                        <Button>Delete</Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
    </>
  )
}

export default UserDash