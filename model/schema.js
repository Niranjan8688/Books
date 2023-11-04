const mongoose = require('mongoose')
const booksSchema = new mongoose.Schema({
    bookId:{
        type:Number,
        unique:true,
        required:true
    },
    title: {
        type:String,
        required:true
    },
    author: {
        type:String,
        required:true
    },
    summary:{
        type:String,
        required:true
    }
})

module.exports = booksSchema