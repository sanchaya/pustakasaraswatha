const express = require('express');
const multer = require('multer');
const app = express();
const PORT = 3002;
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
    res.send('App is running on port 3002..');
  });

  app.get('/publishers/check/:email',async(req,res)=>{
    try{
      const email = req.params.email;
      // console.log(email);
      const user = await Publisher.findOne({email});
      // console.log(user);
      if(user===null){
        return res.status(401).json({"message":"User does not exists"});
      }
      else{
        return res.status(200).json({ "isRegistered": true });
      }
    }
    catch(error){
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post('/upload',async (req, res) => {
    try {

      const body = req.body;
      const cover = await BookPhoto.create(body);
      cover.save();
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
            price,
            bookCover,
            publishedYear,
            publishedMonth,
            seriesChecked,
            subject,
            email
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
            price,
            bookCover,
            publishedYear,
            publishedMonth,
            seriesChecked,
            subject,
            email:email.emailAddress
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
  
      const books = await Book.find();
  
 
      const booksWithPhoto = await Promise.all(books.map(async (book) => {
       
        const book_photo = await BookPhoto.findById(book.bookCover);
        const photoData = book_photo ? book_photo: null;
  
   
        return {
          ...book.toObject(),
          book_photo: photoData,
        };
      }));
 
 
      res.status(200).json(booksWithPhoto);
    } catch (error) {
      console.error('Error fetching book details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.post('/publishers/logo',async(req,res)=>{
  try {

    const body = req.body;
    const logo = await Logo.create(body);
    logo.save();

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
app.put('/publishers/update/:email',async(req,res)=>{
  try {
    const userEmail = req.params.email;
    console.log(userEmail);
    const publisher = await Publisher.findOne({email:userEmail});
    if(!publisher){
      return res.status(404).json({message:"User not found"});
    }
    const {
      name,
      email,
      weburl,
      address,
      phone,
      logo
    
  } = req.body;
  const logoData = await Logo.create({logo});
    logoData.save();
    const updatedProfile = await Publisher.findByIdAndUpdate(publisher._id,{
      name,
      email,
      weburl,
      address,
      phone,
      logo:logoData._id
    },
  {new:true}
)

    res.status(201).json({ updatedProfile});
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
}
})
app.get('/profile/:email', async(req,res)=>{
  try{
    const email = req.params.email;
    const publisher = await Publisher.findOne({email:email});
    if(!publisher){
      return res.status(404).json({message:"User not found"});
    }
    
    const publisherWithLogo = await Logo.findById(publisher.logo);
    return res.status(200).json({publisher,publisherWithLogo});
  }catch(error){
    console.error(error);
    res.status(500).json({ error: 'Error fetching user profile' });
  }
})
app.get('/publishers/books/:email',async(req,res)=>{
  try{
    const email=req.params.email;
    const books = await Book.find({email:email});
    if(!books){
      return res.status(404).json({message:"Books not found"});
    }
    return res.status(200).json({books});
  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: 'Error fetching books' });
  }
})
app.get('/getAllPublishers', async(req,res)=>{
  try{
    const publishers = await Publisher.find();
    if(!publishers){
      return res.status(404).json({message:'No publisher found'});
    }
    const publishersWithLogo = await Promise.all(publishers.map(async (publisher) => {
       
      const logo = await Logo.findById(publisher.logo);
      const logoData = logo ? logo: null;

 
      return {
        ...publisher.toObject(),
        logo: logoData,
      };
    }));
    return res.status(200).json({publishersWithLogo});
  }catch(error){
    console.error(error);
    res.status(500).json({ error: 'Error fetching publishers profile' });
  }
})

// app.get('/books/search', async (req, res) => {
//   try {
//     const { query, criteria } = req.query;
   
//     let searchQuery = {};
//     if (criteria === 'bookTitle') {
//       searchQuery = { bookTitle: { $regex: new RegExp(query, 'i') } }; 
//     } else if (criteria === 'authorName') {
//       searchQuery = { authorName: { $regex: new RegExp(query, 'i') } };
//     } else if (criteria === 'publisherName') {
//       searchQuery = { publisherName: { $regex: new RegExp(query, 'i') } };
//     } else if (criteria === 'publishedYear') {
//       // Check if the query is a valid year
//       const year = parseInt(query);
//       if (!isNaN(year)) {
//         searchQuery = { publishedYear: year };
//       } else {
//         return res.status(400).json({ error: 'Invalid published year' });
//       }
//     } 
//     else if(criteria === 'isbn'){
//         searchQuery = {isbn:{$regex: new RegExp(query,'i')}};
//     }
//     else {
//       return res.status(400).json({ error: 'Invalid search criteria' });
//     }

//     const searchResults = await Book.find(searchQuery);
  
//     if(searchResults.length>0){
  
//     const booksWithPhoto = await Promise.all(searchResults.map(async (book) => {
  
//       const book_photo = await BookPhoto.findById(book.bookCover);
//       const photoData = book_photo ? book_photo: null;

//       return {
//         ...book.toObject(),
//         book_photo: photoData,
//       };
//     }));
 
//     res.json(booksWithPhoto);
//   }
//   else{
//     res.json([]);
//   }
//   } catch (error) {
//     console.error('Error searching books:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

app.get('/books/search', async (req, res) => {
  try {
    const { query } = req.query;
    console.log(req.query);
    // Search across multiple fields using regex
    const searchQuery = {
      $or: [
        { bookTitle: { $regex: new RegExp(query, 'i') } },
        { authorName: { $regex: new RegExp(query, 'i') } },
        { publisherName: { $regex: new RegExp(query, 'i') } },
        { isbn: { $regex: new RegExp(query, 'i') } },
      
      ],
    };
       // Check if the query can be parsed as a number for publishedYear
       const year = parseInt(query);
       if (!isNaN(year)) {
         searchQuery.$or.push({ publishedYear: year });
       }
    const searchResults = await Book.find(searchQuery);

    if (searchResults.length > 0) {
      const booksWithPhoto = await Promise.all(
        searchResults.map(async (book) => {
          const book_photo = await BookPhoto.findById(book.bookCover);
          const photoData = book_photo ? book_photo : null;

          return {
            ...book.toObject(),
            book_photo: photoData,
          };
        })
      );

      res.json(booksWithPhoto);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error('Error searching books:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
});
})
.catch((error) => {
  console.error('Error:', error);
});

module.exports=app;