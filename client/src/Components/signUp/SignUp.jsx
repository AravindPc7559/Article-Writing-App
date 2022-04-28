import React, { useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link,useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import axios from 'axios'

  
  const theme = createTheme();

function SignUp() {
  const {register , handleSubmit ,formState:{errors}} = useForm()
  const navigate = useNavigate()
  const userInfo = localStorage.getItem('userInfo')



  const submitHandle = (data) => {
      const {email , password ,firstName , lastName } = data
      // console.log(data);
      // console.log(email , password ,firstName , lastName);
        axios.post('http://localhost:5000/api/user/signup',{email , password ,firstName , lastName}).then((res)=>{
          console.log(res.data);
          localStorage.setItem('userInfo',JSON.stringify(res.data))
          navigate('/home')
        })
    }


    // useEffect(()=>{
    //   // checking if the data exist in the localstorage or not!
    //   if(!userInfo){
    //       navigate('/')
    //   }else{
    //     navigate('/home ')
    //   }
  // })

  return (
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
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(submitHandle)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <p style={{color:'red',fontSize:'12px'}} >{errors.firstName && errors.firstName.message}</p>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                {...register('firstName',{
                  required:"firstName is required"
              })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <p style={{color:'red',fontSize:'12px'}} >{errors.lastName && errors.lastName.message}</p>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                {...register('lastName',{
                  required:"lastName is required"
              })}
              />
            </Grid>
            <Grid item xs={12}>
            <p style={{color:'red',fontSize:'12px'}} >{errors.email && errors.email.message}</p>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                {...register('email',{
                  required:"Email is required",pattern:{value:/^\S+@\S+$/i,message:"This is not a valid email"}
              })}
              />
            </Grid>
            <Grid item xs={12}>
            <p style={{color:'red',fontSize:'12px'}} >{errors.password && errors.password.message}</p>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                {...register('password',{required:'Password is required' , minLength:{value:6,message:"Minimum length is 6 characters"}})}
              />
            </Grid>
         
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
            <Box sx={{marginLeft:13}}>
                <Link to='/' style={{textDecoration:'none'}}  >
                <Typography  sx={{color:'black'}} >Already have an account?</Typography>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  </ThemeProvider>
  )
}

export default SignUp