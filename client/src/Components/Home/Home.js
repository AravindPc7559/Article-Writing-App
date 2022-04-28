import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import AllArticles from '../AllArticles/AllArticles'
import BlogPosting from '../BlogPosting/BlogPosting'
import ButtonAppBar from '../ButtonAppBar/ButtonAppBar'


function Home() {

const navigate = useNavigate()


//getting the value from the localstorage
const userInfo = localStorage.getItem('userInfo')

    useEffect(()=>{
        // checking if the data exist in the localstorage or not!
        if(!userInfo){
            navigate('/')
        }else{
          navigate('/home ')
        }
    },[])

  return (
    <div>
      <AllArticles/>
    </div>
  )
}

export default Home