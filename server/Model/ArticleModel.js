const mongoose = require('mongoose')

const ArticleSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    Article:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    Author:{
        type:String,
        required:true
    },
    like:[
        
    ]
    
},{
    timestamps: true
});

const Article = mongoose.model('Article',ArticleSchema);

module.exports = Article;