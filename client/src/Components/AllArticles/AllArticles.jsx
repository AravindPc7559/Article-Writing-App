import { Box, Button, Container, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
function AllArticles() {

    const user = localStorage.getItem('userInfo')
    const destructure = JSON.parse(user)
    const name = user ? destructure.firstName : null    
    const userId = user ? destructure._id : null   
    const [articles , setArticles] = useState([])

    const [likeRender , setLikeRender] = useState(false)
    const [unlikeRender , setUnlikeRender] = useState(false)

   

    const article = () => {
        axios.get('/api/user/allarticle').then((res)=>{
            setArticles(res.data.data)
        })
    }

    // console.log(articles);

    const likehandle = (id) => {
        // console.log(id);
        setLikeRender(true)
        axios.post('/api/user/like',{id , userId}).then((res)=>{
            // console.log(res.data);
        })
    }

    const Unlikehandle = (id) => {
        setUnlikeRender(true)
        axios.post('/api/user/unlike',{id , userId}).then((res)=>{
            // console.log(res);
        })
    }



    useEffect(()=>{
        article()
        setLikeRender(false)
        setUnlikeRender(false)
    },[likeRender,unlikeRender])

  return (
    <div>
        <Container>
            <Box mt={10}>
               <Link to='/myarticle' style={{textDecoration:'none'}} >
               <Button variant='contained' color='success' >Add Your Article <AddIcon/> </Button>
               </Link>
            </Box>

            <Typography variant='h4' textAlign='center' >All ARTICLES</Typography>
     
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
                         {

                             obj.Author === name ?
                             null :

                            obj.like.includes(userId) ? 
                             <Button onClick={()=>Unlikehandle(`${obj._id}`)} >  <FavoriteIcon color='error' />  </Button>  : <Button onClick={()=>likehandle(`${obj._id}`)} ><FavoriteBorderIcon/></Button> 

                         }
                         


                            
                                    <Typography> {obj.like.length} Person Liked Your Article</Typography>
                          
                             <br/>
                             <br/>
                            </Box>
                          
                           </Paper>
                        )
                    })
                }
                  
            
        </Container>
    </div>
  )
}

export default AllArticles