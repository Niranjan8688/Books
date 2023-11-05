var express = require('express')
var app = express()
var Auth = require('./Utils/Auth')
var route = require('./controller/route')
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(Auth)
app.use('/books',route)
var PORT = 8080
app.listen(PORT,()=>{
    console.log(`Server is started at port ${PORT}`)
})
