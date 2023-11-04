var express = require('express')
var app = express()
var route = require('./controller/route')
var bodyParser = require('body-parser')
// const MongoClient = require('mongodb');
// const uri = 'mongodb://127.0.0.1:27017';
// const client = new MongoClient(uri);
// async function connectToMongoDB() {
//   try {
//     await client.connect();
//     console.log('Connected to MongoDB');
//   } catch (err) {
//     console.error('Error connecting to MongoDB:', err);
//   }
// }
// connectToMongoDB();

// const mongoose = require('mongoose');
// const mongooseUniqueValidator = require('mongoose-unique-validator');

// // Connect to your MongoDB database
// mongoose.connect('mongodb://127.0.0.1:27017/Books', {});
// var booksSchema = new mongoose.Schema({
//     bookNumber:{
//         type : Number,
//         unique : true,
//         index:true,
//         required:true

//     },
//     title: {
//         type : String,
//         required :true
//     },
//     author: {
//         type : String,
//         required :true
//     },
//     summary: {
//         type : String,
//         required :true
//     }
// })

// let Books = mongoose.model('Books', booksSchema);

// booksSchema.plugin(mongooseUniqueValidator,{message : 'Book number {VALUE} already exist'})

// var addBooks = new Books({
//     bookNumber : 18,
//     title : "Books",
//     autho:"jsdbljsd",
//     summary: "klkfs",
//     happy:"jf;sjd;f"

// })

// addBooks.save().then((resp) => {
//     console.log(resp);
// }).catch((error) => {
//     if(error?.errors?.bookNumber?.properties?.message)
//         console.log(error.errors.bookNumber.properties.message)
//     if(error.errors)
//         console.log(error.errors)
// });

// async function delet(){

// deletedProduct = await Books.findOneAndDelete({bookNumber:16})
// console.log(deletedProduct)
// }

// delet()


// async function update(){
//     var updated = await Books.findOneAndUpdate({bookNumber:15},{title:"book1"})
//     console.log("updated")

// }

// update()








 
// addBooks.save((error) => {
//     if (error) {
//       if (error.code === 11000 && error.keyPattern.username) {
//         console.error('Username must be unique.');
//       } else {
//         console.error('Error saving user:', error);
//       }
//     } else {
//       console.log('User saved successfully.');
//     }
// })




// Save the new todo to the database
// newTodo.save((error) => {
//   if (error) {
//     console.error('Error saving todo:', error);
//   } else {
//     console.log('Todo saved successfully.');
//   }
// });

// Find all todos
// Todo.find({}, (error, todos) => {
//   if (error) {
//     console.error('Error finding todos:', error);
//   } else {
//     console.log('All todos:', todos);
//   }
// });

// Update a todo
// Todo.updateOne({ title: 'Learn Mongoose' }, { completed: true }, (error) => {
//   if (error) {
//     console.error('Error updating todo:', error);
//   } else {
//     console.log('Todo updated successfully.');
//   }
// });

// Delete a todo
// Todo.deleteOne({ title: 'Learn Mongoose' }, (error) => {
//   if (error) {
//     console.error('Error deleting todo:', error);
//   } else {
//     console.log('Todo deleted successfully.');
//   }
// });


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(route)
var PORT = 8080
app.listen(PORT,()=>{
    console.log(`Server is started at port ${PORT}`)
})
