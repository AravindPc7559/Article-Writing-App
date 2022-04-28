import React, { useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios';

  const theme = createTheme();  

function SignIn() {

    const {register , handleSubmit ,formState:{errors}} = useForm()
    const navigate = useNavigate()
    const userInfo = localStorage.getItem('userInfo')


    const submitHandle = (data) => {
        const {email , password } = data

        axios.post('/api/user/login',{email,password}).then((res)=>{
          localStorage.setItem('userInfo',JSON.stringify(res.data))
          navigate('/home')
        })
    }

  //   useEffect(()=>{
  //     // checking if the data exist in the localstorage or not!
  //     if(!userInfo){
  //         navigate('/')
  //     }else{
  //       navigate('/home ')
  //     }
  // })
    
  return (
    <div>
         <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
  
          <Box component="form" onSubmit={handleSubmit(submitHandle)} noValidate sx={{ mt: 1 }}>
          <p style={{color:'red',fontSize:'12px'}} >{errors.email && errors.email.message}</p>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...register('email',{
                required:"Email is required",pattern:{value:/^\S+@\S+$/i,message:"This is not a valid email"}
            })}
            />
                        <p style={{color:'red',fontSize:'12px'}} >{errors.password && errors.password.message}</p>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register('password',{required:'Password is required' , minLength:{value:6,message:"Minimum length is 6 characters"}})}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              <Box sx={{marginLeft:13}}>
                <Link to='/signup'  >
               create an account?
                </Link>
              </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div>
  )
}

export default SignIn