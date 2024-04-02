const {Book,BookPhoto} =require('./models/bookModel');
const {Publisher,Logo} = require('./models/publisherModel');

async function savePhoto(buffer, mimetype) {
    try {
        console.log("photo");
        if (!mimetype.startsWith('image')) {
            throw new Error('File type is invalid');
        }

        const file = new BookPhoto({
            data: buffer,
            contentType:mimetype
        });

        await file.save();

        return file._id;
    }
    catch (e){
 
    throw new Error(e.message);
      
    }
}

async function saveLogo(buffer, mimetype) {
    try {
        if (!mimetype.startsWith('image')) {
            throw new Error('File type is invalid');
        }

        const file = new Logo({
            data: buffer,
            contentType:mimetype
        });

        await file.save();

        return file._id;
    }
    catch (e){
 
    throw new Error(e.message);
      
    }
}

module.exports = {
    savePhoto,
    saveLogo
};