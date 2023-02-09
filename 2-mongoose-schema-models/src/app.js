const mongoose = require("mongoose");

// connection creation and creating a new database
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/abhimongo")
.then( () => console.log("connection sucessful"))
.catch( (err) => console.log(err));


// schema
// A mongoose schema define the structure of the document , default values, validation, etc.
// mongoose.Schema     => method 

const playlistSchema =new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    ctype: String,
    videos: Number,
    author: String,
    active: Boolean,
    date: {
        type: Date,
        default: Date.now
    }
})

//mongoose model
// A mongoose model is a wrapper on the Mangoose schema.
// A mongoose schema defines the structure of the document, default values, validators, etc.
// ,where as a mongoose model provides an interface to the database for creating, querying, updating, 
// deleting records etc...



// collection creation
const Playlist = mongoose.model("Playls", playlistSchema);


