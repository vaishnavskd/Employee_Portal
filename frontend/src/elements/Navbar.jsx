import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
  return (
 <Box sx={{ flexGrow: 1 }} color={'white'}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='left'>
            Employee Portal
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
