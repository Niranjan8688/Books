const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const mongooseUniqueValidator = require('mongoose-unique-validator');
const { booksSchema, UserSchema, borrowingSchema } = require('./schema');

class BooksDatabase {
    constructor() {
        mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected database")
    }

    async addBooks(req, res) {
        let Books = mongoose.model('Books', booksSchema);
        booksSchema.plugin(mongooseUniqueValidator, { message: 'Book Id {VALUE} already exist' })
        let addBooks = new Books(req.body)
        try {
            const isStord = await addBooks.save()
            if (isStord) {
                res.send({
                    "Message": "Ingested Sucessfully"
                })
            }
        }
        catch (error) {
            if (error?.errors?.bookId?.properties?.message) {
                res.status(404).json({
                    "Error": error.errors.bookId.properties.message
                })
            }
            else {
                res.status(404).json({
                    "Error": "Error "+error
                })
            }
        }
    }


    async deleteBooks(req, res) {
        let Books = mongoose.model('Books', booksSchema);
        const Data = await Books.findOneAndDelete(req.body)
        try {
            if (Data) {
                res.send({
                    "Message": "Deleted Sucessfully",
                    "data": Data

                })
            }
            else {
                res.status(404).json({
                    "Error": "No Book Found"
                })
            }
        }
        catch (error) {
            res.status(404).json({
                "Error": "Error in deleteing Book"
            })
        }

    }

    async updateBook(req, res) {
        let Books = mongoose.model('Books', booksSchema);
        if (!req.body.bookId) {
            res.status(404).json({
                "Error": "Sorry I couldn't able to access bookId.Can you please specify bookId column"
            })
        }
        else {
            const UpdatedData = await Books.findOneAndUpdate({ "bookId": req.body.bookId }, req.body.updateData)
            try {
                if (UpdatedData) {
                    res.send({
                        "Message": "Data has been updated"
                    })
                }
                else {
                    res.status(404).json({
                        "Error": `Sorry BookNumber ${req.body.bookId} doesn't exist`
                    })
                }
            }
            catch (error) {
                res.status(404).json({
                    "Error": "Error has been occured"
                })

            }

        }


    }

    async wholeData(req, res) {
        let Books = mongoose.model('Books', booksSchema);
        let WholeData = await Books.find()
        res.send({
            "data": WholeData
        })
    }
    async borrow(req, res) {
        var Borrowing = mongoose.model('Borrowing' , borrowingSchema)
        var Books = mongoose.model('Books', booksSchema);
        let bookId= req.body.bookId;
        const book = await Books.findOne({ bookId: bookId });
        const defaultDecrement = 1;
        const decrementValue = typeof decrement === 'number' ? decrement : defaultDecrement;
        if (book.copies - decrementValue < 0) {
            return res.status(400).send({ message: 'Sorry there are no books' });
        }
        // Update the book
        const updatedBook = await Books.findOneAndUpdate(
            { bookId: bookId },
            { $inc: { copies: -decrementValue } },
            { new: true, useFindAndModify: false }
        );
        // await book.save();
        const borrowing = new Borrowing({ userId: req.body.userId ,  bookId });
        await borrowing.save();
        res.status(201).send(borrowing);
    }


   async return(req,res){
    var Books = mongoose.model('Books', booksSchema);
    var Borrowing = mongoose.model('Borrowing' , borrowingSchema)
    const { borrowingId } = req.body;
    const borrowing = await Borrowing.findById(borrowingId).populate('bookId');
    if (!borrowing) {
      return res.status(404).send();
    }
    borrowing.returnDate = new Date();
    await borrowing.save();
    const book = await Books.findById(borrowing.bookId);
    book.copies += 1;
    await book.save();
    res.send(borrowing);
  }


    async dataByBookId(req, res) {
        let Books = mongoose.model('Books', booksSchema);

        if (!req.body.bookId) {
            res.status(404).json({
                "Error": "Sorry I can only access bookId field"
            })

        }
        try {
            let DatabyId = await Books.findOne({ "bookId": req.body.bookId })
            if (DatabyId) {
                res.send({
                    "data": DatabyId
                })
            }
            else {
                res.status(404).json({
                    "Error": "Id not Found"
                })
            }

        }
        catch (error) {

            res.status(404).json({
                "Error": "An Error has been Occured"
            })
        }



    }

}

class UserInfo {
    constructor() { }
    async userRegister(req, res) {
        let User = mongoose.model('User', UserSchema)
        UserSchema.plugin(mongooseUniqueValidator, { message: 'User email {VALUE} already exist' })
        try {
            const user = new User(req.body);
            user.password = await bcrypt.hash(user.password, 8);
            await user.save();
            const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
            res.status(201).send({ user, token });
        } catch (error) {
            if (error?.errors?.email?.properties?.message) {
                res.status(404).json({
                    "Error": error.errors.email.properties.message
                })
            }
            else {
                res.status(404).json({
                    "Error": "Error"
                })
            }
        }
    }

    async login(req, res) {
        let User = mongoose.model('User', UserSchema)
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).send({ error: 'Invalid login credentials' });
        }
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
        res.send({ user, token });
    }
}




module.exports = { BooksDatabase, UserInfo }

