const mongoose = require('mongoose');

const logoSchema = new mongoose.Schema({
     logo:String,
  
  });

const userSchema = new mongoose.Schema({
    userId:String,
    name:String,
    email:{type:String,unique:true},
    weburl:String,
    address:String,
    logo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Logo', // Reference to the Logo collection
    },
    phone:String,
    role:String
});


const Logo = mongoose.model('Logo', logoSchema);
const User = mongoose.model('User', userSchema);

module.exports = {Logo,User};