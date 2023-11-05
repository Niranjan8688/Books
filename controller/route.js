const express = require('express')
const Books = require('../model/database')
const app= express()
const route = express.Router()
const BooksInstance = new Books()

route.post('/addBooks',BooksInstance.addBooks)
route.delete('/deleteBook',BooksInstance.deleteBooks)
route.put('/upadateBook',BooksInstance.updateBook)
route.get('/wholeData',BooksInstance.wholeData)
route.post('/findById',BooksInstance.dataByBookId)


module.exports = route