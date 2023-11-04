var express = require('express')
var Books = require('../model/database')
var app= express()
var route = express.Router()
var BooksInstance = new Books()

route.post('/addBooks',BooksInstance.addBooks)
route.delete('/deleteBook',BooksInstance.deleteBooks)
route.put('/upadateBook',BooksInstance.updateBook)
route.get('/wholeData',BooksInstance.wholeData)
route.post('/findById',BooksInstance.dataByBookId)


module.exports = route