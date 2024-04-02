const mongoose = require('mongoose');

const logoSchema = new mongoose.Schema({
     logo:String
  });

const publisherSchema = new mongoose.Schema({
    userId:String,
    name:String,
    email:String,
    weburl:String,
    address:String,
    logo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Logo', // Reference to the BookPhoto collection
    },
    phone:Number,
});


const Logo = mongoose.model('Logo', logoSchema);
const Publisher = mongoose.model('Publisher', publisherSchema);

module.exports = {Logo,Publisher};