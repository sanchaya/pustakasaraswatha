const mongoose = require('mongoose');

const logoSchema = new mongoose.Schema({
    data: Buffer, // Store logo data as Buffer (Blob)
    contentType: String, // Store content type of the logo
  });

const publisherSchema = new mongoose.Schema({
    userId:String,
    userName:String,
    email:String,
    webAddress:String,
    address:String,
    logo:Blob,
    phoneNumber:Number,
});


const Logo = mongoose.model('Logo', logoSchema);
const Publisher = mongoose.model('Publisher', publisherSchema);

module.exports = {Logo,Publisher};