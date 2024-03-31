const mongoose = require('mongoose');

// Define a schema for storing book photos
const bookPhotoSchema = new mongoose.Schema({
    data: Buffer, // Store book photo data as Buffer (Blob)
    contentType: String, // Store content type of the book photo
  });

const bookSchema = new mongoose.Schema({
    
    bookTitle: String,
    pageCount: Number,
    volume:String,
    authorName: String,
    publisherYear: String,
    publisherMonth:Number,
    isbn:String,
    price:Number,
    userId:String,
    userName:String,
    photo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookPhoto', // Reference to the BookPhoto collection
  },
    edition:String,
    subject:String,
    seriesChecked:String,
    seriesName:String,
});


const BookPhoto = mongoose.model('BookPhoto', bookPhotoSchema);
const Book = mongoose.model('Book', bookSchema);

module.exports = {Book,BookPhoto};
