const mongoose = require('mongoose');

// Define a schema for storing book photos
const bookPhotoSchema = new mongoose.Schema({
    bookCover: String, 

  });

const bookSchema = new mongoose.Schema({
    
    bookTitle: String,
    pageCount: Number,
    volume:String,
    authorName: String,
    publishedYear: Number,
    publishedMonth:Number,
    isbn:String,
    price:Number,
    email:String,
    publisherName:String,
    bookCover: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookPhoto', // Reference to the BookPhoto collection
  },
    edition:String,
    subject:String,
    seriesChecked:String,
    seriesName:String,
    uploadedAt:{type:Date, default:Date.now}
});


const BookPhoto = mongoose.model('BookPhoto', bookPhotoSchema);
const Book = mongoose.model('Book', bookSchema);

module.exports = {Book,BookPhoto};
