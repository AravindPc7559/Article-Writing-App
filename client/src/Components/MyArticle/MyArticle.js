import { Box, Container, Paper, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function MyArticle() {

    // states
    const [articles , setArticles] = useState([])

    // Taking Name
    const user = localStorage.getItem('userInfo')
    const destructure = JSON.parse(user)
    const name = destructure.firstName

    

    const getArticle = ()=>{
        axios.post('/api/user/getarticle',{name}).then((res)=>{
            setArticles(res.data.data)
        })
    }

    useEffect(()=>{
        getArticle()
    },[])
  return (
    <div>
      <Container>
          <Box mt={10}>
        <Typography variant='h4' textAlign='center' >YOUR ARTICLES</Typography>
        {
            articles.map((obj)=>{
                return(
                    <Paper elevation={3} >
                    <Box margin={5} minHeight={100} pt={2} >
                    <Typography variant='h6' >
                       Title : {obj.title} By {obj.Author}
                     </Typography>
                     <br/>
                     <Typography  variant='h6'>
                       Description : {obj.description}
                     </Typography>
                     <br/>
                     <Typography variant='h6' >
                      Article:
                     </Typography>
                     <Typography variant='OVERLINE TEXT' >
                     {obj.Article}
                     </Typography>
                     
                     <br/>
                     <br/>
                     <Box>
                        <Typography> Posted At : 
                        <br/>   
                        Date {obj.date} 
                        <br/>
                        Time {obj.time}</Typography>
                    </Box>
                     <br/>
                     <br/>
                    </Box>
                  
                   </Paper>
                )
            })
        }
          
          </Box>
      </Container>
    </div>
  )
}

export default MyArticle