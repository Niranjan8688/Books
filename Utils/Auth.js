const jwt = require('jsonwebtoken')
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
        const decoded = jwt.verify(token, secretKey);
        if (decoded?.isValid == 'True') {
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

module.exports = Auth