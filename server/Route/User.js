const express = require("express");
const UserModel = require("../Model/User");
const router = express.Router()
const jwt = require('jsonwebtoken');
const ArticleModal = require('../Model/ArticleModel')

//generating json web token
const Token  = (id) => {
    return jwt.sign({id},'jsonwebtokenSection',{
        expiresIn:"30d",
    })
};



// Register Router Api

router.post('/signup',async(req,res)=>{
    const {email , password , firstName , lastName} = req.body;

    //checking user exist or not.
    const User = await UserModel.findOne({email:email})

    // checking condition.
    if(User){
        //throwing error if email exist.
        console.log("email already exist");
        res.status(400)
    }else{
        // saving to database.
        const data = await UserModel.create({firstName:firstName,lastName:lastName,email:email,password:password})

        // sending responce back to frontend
        if(data){
            res.status(200).json({
                _id:data._id,
                firstName:data.firstName,
                lastName:data.lastName,
                email:data.email,
                Token:Token(data._id)
            })
        }else{
            res.json({
                message:"Something went wrong!"
            })
        }
    }
})


// Login Route Api

router.post('/login',async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password

    //lets find the user from the DB
    const user = await UserModel.findOne({email:email})


    // checking if the password is wrong or correct and sending the responce back to the client if everything is ok
    if(user && user.password === password){
        // sending responce
        res.status(200).json({
            _id:user._id,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            Token:Token(user._id)
        })
    }else{
      console.log("user not exist");
    }

})


// posting article

router.post('/articlepost',async(req,res)=>{
    // destructuring all datas from req.body
    const {title , description , Article , date , time,name} = req.body;


    // storing article data to DB
    const data = await ArticleModal.create({title:title , description:description , Article:Article , date:date, time:time , Author:name})

    // sending responce back to the frontend
    if(data){
        res.status(200).json({
            message:"Article Posted Successfully"
        })
    }else{
        res.status(400)
    }

})



// getting article details of current user

router.post('/getarticle',async(req,res)=>{
    const {name} = req.body;

    // checking data with the user name
    const data = await ArticleModal.find({Author:name})

      // sending responce back to the frontend
    if(data){
        res.status(200).json({
            data
        })
    }else{
        res.status(400)
    }
})


// getting all articles 

router.get('/allarticle',async(req,res)=>{

    // getting all articles
    const data = await ArticleModal.find({})

// sending responce back to client side
    if(data){
        res.status(200).json({
            data
        })
    }else{
        res.status(400)
    }
})


// Like Handle

router.post('/like',async(req,res)=>{
    const {id , userId} = req.body

    // finding article
    const findArticle = await ArticleModal.findOne({_id:id})

    //if article is in db lets push user id to the like array and save the data..
    if(findArticle){
        if(findArticle.like != userId){
            
            await findArticle.like.push(userId)
            await findArticle.save()
    
            res.status(200).json({
                "likePushed":'True'
            })
        }else{
            console.log("already exist");
            res.status(400).json({name: 'vkldvkdj'})
        }
       
    }

})


// Unliking Routes
router.post('/unlike',async(req,res)=>{
    const {id , userId} = req.body

    //findinf the article with id
    const data = await ArticleModal.findOne({_id:id})

// if ther is article then we pulling the userid from the like array
    if(data){
        await data.like.pull(userId)
        await data.save()

        res.status(200).json({
            "likePushed":'false'
        })
    }
    
})





module.exports = router;