const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const { booksSchema, UserSchema , borrowingSchema } = require('../model/schema')
require('dotenv').config()
async function Auth(req, res, next) {
    var secretKey = process.env.SECRET_KEY
    var token = req.headers['authorization']
    try {
        if (!token) {
            res.status(401).json({
                "Error": "Missing Authorization Token"
            })

        }
        else{
        const data = jwt.verify(token, secretKey);
        let User = mongoose.model('User', UserSchema);
        const user = await User.findOne({ _id: data._id});
        console.log(user)
        if (user.email) {
            next()
        }
        else{
            res.status(401).json({
                "Error":"Unable to Authorize"
            })
        }
    }
    }
    catch (error) {
        console.log(error)
        res.status(401).json({
            "Error": "Unable to Authorize"
        })
    }
}
async function authorize(){
    
}

module.exports = {Auth,authorize }