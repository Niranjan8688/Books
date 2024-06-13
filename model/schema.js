const { type } = require('express/lib/response')
const mongoose = require('mongoose')
const booksSchema = new mongoose.Schema({
    bookId: {
        type: Number,
        unique: true,
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    copies: {
        type: Number,
        required: true
    }
})

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique:true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "User"]
    }
})

const borrowingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookId: { type: Number, required: true },
    borrowDate: { type: Date, default: Date.now },
    returnDate: { type: Date }
});
module.exports = { booksSchema, UserSchema , borrowingSchema }