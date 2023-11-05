const mongoose = require('mongoose');
require('dotenv').config()
const mongooseUniqueValidator = require('mongoose-unique-validator');
const schema = require('./schema');

class BooksDatabase {
    constructor() {
        mongoose.connect(process.env.URL);
        console.log("Connected database")
    }

    async addBooks(req, res) {
        let Books = mongoose.model('Books', schema);
        schema.plugin(mongooseUniqueValidator, { message: 'Book Id {VALUE} already exist' })
        let addBooks = new Books({
            bookId: req.body.bookId,
            title: req.body.title,
            author: req.body.author,
            summary: req.body.summary
        })
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
                    "Error": "Error"
                })
            }
        }
    }



    async deleteBooks(req, res) {
        let Books = mongoose.model('Books', schema);
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
        let Books = mongoose.model('Books', schema);
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
        let Books = mongoose.model('Books', schema);
        let WholeData = await Books.find()
        res.send({
            "data": WholeData
        })
    }

    async dataByBookId(req,res) {
        let Books = mongoose.model('Books', schema);

        if (!req.body.bookId) {
            res.status(404).json({
                "Error": "Sorry I can only access bookId field"
            })

        }
        try {
            let DatabyId = await Books.findOne({ "bookId": req.body.bookId})
            if(DatabyId){
                res.send({
                    "data":DatabyId
                })
            }
            else{
                res.status(404).json({
                    "Error":"Id not Found"
                })
            }

        }
        catch (error) {

            res.status(404).json({
                "Error":"An Error has been Occured"
            })
        }



    }

}




module.exports = BooksDatabase

