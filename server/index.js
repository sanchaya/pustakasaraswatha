const express = require('express');
const multer = require('multer');
const app = express();
const PORT = 8000;
const connectDB = require('./connection');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { Book, BookPhoto } = require('./models/bookModel');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

connectDB()
  .then(() => {
    // Set up your middleware, routes, and other server configurations here
 
app.use(cors());
app.options('*',cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('App is running on port 8000..');
  });

  app.post('/books/save-book-data', upload.single('photo'), async (req, res) => {
    try {
        const {
            bookTitle,
            pageCount,
            authorName,
            seriesName,
            volume,
            edition,
            isbn,
            publishedYear,
            publishedMonth,
            seriesChecked,
            subject,
        } = req.body;
        console.log(req.body);
        // req.file contains the file uploaded using multer
        const photo = req.file;

        // Create a new BookPhoto document
        const bookPhoto = new BookPhoto({
            data: photo.buffer,
            contentType: photo.mimetype,
        });

        // Save the photo
        await bookPhoto.save();

        // Create a new Book document with photo reference
        const book = new Book({
            bookTitle,
            pageCount,
            authorName,
            seriesName,
            volume,
            edition,
            isbn,
            publishedYear,
            publishedMonth,
            seriesChecked,
            photo: bookPhoto._id,
            subject,
        });

        // Save the book
        await book.save();

        res.status(201).json({ message: 'New book added' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/books/details', async (req, res) => {
    try {
      // Fetch all books from the Book collection
      const books = await Book.find();
  
      // Process each book to fetch corresponding photo data
      const booksWithPhoto = await Promise.all(books.map(async (book) => {
        // Fetch photo data using the photo ID stored in the book
        const book_photo = await BookPhoto.findById(book.photo);
        const photoData = book_photo ? book_photo: null;
  
        // Return book details along with photo data
        return {
          ...book.toObject(),
          book_photo: photoData,
        };
      }));
      console.log(booksWithPhoto);
      // Send the response with books and corresponding photo data
      res.status(200).json(booksWithPhoto);
    } catch (error) {
      console.error('Error fetching book details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
app.post('/users/sign-up',(req,res)=>{

})



app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
});
})
.catch((error) => {
  console.error('Error:', error);
});

module.exports=app;