const jwt = require('jsonwebtoken')
require('dotenv').config()
async function Auth(req, res, next) {
    var token = req.headers['authorization']
    let secretKey = process.env.SECRET_KEY 
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
        res.status(401).json({
            "Error": "Unable to Authorize"
        })
    }
}

module.exports = Auth