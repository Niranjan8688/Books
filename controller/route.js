const express = require('express')
const { BooksDatabase , UserInfo} = require('../model/database')
const app= express()
const route = express.Router()
const BooksInstance = new BooksDatabase()
const UserInstansce = new UserInfo()

route.post('/addBooks',BooksInstance.addBooks)
route.delete('/deleteBook',BooksInstance.deleteBooks)
route.put('/upadateBook',BooksInstance.updateBook)
route.get('/wholeData',BooksInstance.wholeData)
route.post('/findById',BooksInstance.dataByBookId)
route.post('/register' , UserInstansce.userRegister)
route.post('/login',UserInstansce.login)
route.post('/borrow',BooksInstance.borrow)


module.exports = route