import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {Link , useNavigate} from 'react-router-dom'

export default function ButtonAppBar() {
    // getting data from localstorage and parsing it..
    const userInfo = localStorage.getItem('userInfo')
    const data = JSON.parse(userInfo)

    const navigate = useNavigate()

  const logoutHandle = () => {
    localStorage.removeItem('userInfo')
    navigate('/')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to='/home' style={{textDecoration:'none',color:'white'}} >
            MY BLOG
            </Link>
          </Typography>
         
          {userInfo ?
          <Button variant='contained' color='error' style={{marginRight:10}} onClick={logoutHandle}  >Logout</Button>
          : null}
          {userInfo ?
            <Typography  >
          Welcome {data.firstName} {data.lastName}
            </Typography>
           : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
}