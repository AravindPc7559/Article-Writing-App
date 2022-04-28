import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import moment from "moment";
import axios from 'axios'
import { Alert } from '@mui/material';
import MyArticle from '../MyArticle/MyArticle';


function BlogPosting() {
    // states   
    const [title,setTitle] = useState('')
    const [description , setDescription] = useState('')
    const [Article , setArticle] = useState('')
    const [res , setRes] = useState(false)
    const [NoData , SetNoData] = useState(false)
    
    // getting user details
    const user = localStorage.getItem('userInfo')
    const destructure = JSON.parse(user)
    const name = destructure.firstName


        // current date and time
        var date =  moment().format("DD-MM-YYYY")
        var time = moment().format('hh:mm:ss')

    // submitting articles
        const handleSubmit = (e) => {
            e.preventDefault()
            if(title === '' || description === '' , Article === '') {
               SetNoData(true)
            }else{
                try {
                    SetNoData(false)
                    axios.post('/api/user/articlepost',{title , description , Article , date , time,name}).then((res)=>{
                        setRes(true)
                    })
                } catch (error) {
                    setRes(false)
                }
            }
               
        }   

        useEffect(()=>{

        },[res])

  return (
    <div>
{
    res ?
    <Box sx={{justifyContent:'center',display:'flex',marginTop:10}}>
    <Alert  severity="success">Articel Posted Successfully..</Alert>
    </Box>
    : 
    null
}

{
     NoData ?
     <Box sx={{justifyContent:'center',display:'flex',marginTop:10}}>
     <Alert  severity="error">All Fields Are Required</Alert>
     </Box>
     : 
     null
}
        <form onSubmit={handleSubmit} >
        <Box
    sx={{justifyContent:'center',display:'flex',marginTop:10}}
    >
      <TextField 
        id="filled-multiline-static"
          label="Title of the Article"
          style={{minWidth:900}}
          variant="outlined"
          onChange={(e)=>setTitle(e.target.value)}
          />     
    </Box>
    <Box
    sx={{justifyContent:'center',display:'flex',marginTop:3}}
    >
      <TextField 
        id="filled-multiline-static"
          label="Description About Article"
          multiline
          rows={4}
          onChange={(e)=>setDescription(e.target.value)}
          style={{minWidth:900}}
          variant="outlined"
          />     
    </Box>
<Box
    sx={{justifyContent:'center',display:'flex',marginTop:3}}
    >
      <TextField 
        id="filled-multiline-static"
          label="Write Your Article"
          multiline
          rows={10}
          style={{minWidth:900}}
          variant="outlined"
          onChange={(e)=>setArticle(e.target.value)}
          />     
    </Box>
    <Box sx={{justifyContent:'center',display:'flex',marginTop:2}}>
    <Button type='submit' variant="outlined" color="success">
      Post Article 
      </Button>
    </Box>
    </form>
    <MyArticle/>
    </div>
  )
}

export default BlogPosting