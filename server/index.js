const express = require('express');
const multer = require('multer');
const app = express();
const PORT = 8000;
const connectDB = require('./connection');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { Book, BookPhoto } = require('./models/bookModel');
const {Logo, Publisher } = require('./models/publisherModel');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {savePhoto, saveLogo} = require('./savePhoto');
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

  app.post('/upload',async (req, res) => {
    try {
      console.log("call");
      const body = req.body;
      const cover = await BookPhoto.create(body);
      cover.save();
      console.log(cover._id);
      res.status(201).json({message:cover._id});
    } catch (error) {
      res.status(409).json({message:error.message});
    }
  });

  app.post('/books/save-book-data',async (req, res) => {
    try {
        const {
            bookTitle,
            pageCount,
            authorName,
            seriesName,
            volume,
            edition,
            isbn,
            bookCover,
            publishedYear,
            publishedMonth,
            seriesChecked,
            subject,
        } = req.body;
        console.log(req.body);
       

        // Create a new Book document with photo reference
        const book = new Book({
            bookTitle,
            pageCount,
            authorName,
            seriesName,
            volume,
            edition,
            isbn,
            bookCover,
            publishedYear,
            publishedMonth,
            seriesChecked,
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
        const book_photo = await BookPhoto.findById(book.bookCover);
        const photoData = book_photo ? book_photo: null;
  
        // Return book details along with photo data
        return {
          ...book.toObject(),
          book_photo: photoData,
        };
      }));
 
      // Send the response with books and corresponding photo data
      res.status(200).json(booksWithPhoto);
    } catch (error) {
      console.error('Error fetching book details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.post('/publishers/logo',async(req,res)=>{
  try {
    console.log("call logo");
    const body = req.body;
    const logo = await Logo.create(body);
    logo.save();
    console.log(logo._id);
    res.status(201).json({message:logo._id});
  } catch (error) {
    res.status(409).json({message:error.message});
  }
})
  
app.post('/publishers/register',async(req,res)=>{
  try {
    const {
        name,
        email,
        weburl,
        address,
        phone,
        logo
      
    } = req.body;
    console.log(req.body);
   

 
    const user = new Publisher({
      name,
      email,
      weburl,
      address,
      phone,
      logo
       
    });

    await user.save();

    res.status(201).json({ message: 'New User added' });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
}
})



app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
});
})
.catch((error) => {
  console.error('Error:', error);
});

module.exports=app;