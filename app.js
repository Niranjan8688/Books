const express = require('express')
const app = express()
const Auth = require('./Utils/Auth')
const route = require('./controller/route')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(Auth)
app.use('/books',route)
const PORT = 8080
app.listen(PORT,()=>{
    console.log(`Server is started at port ${PORT}`)
})
