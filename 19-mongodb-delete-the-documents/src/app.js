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
const Playlist = mongoose.model("Playl", playlistSchema);


// create a document or insert

const createDocument = async () => {
    try{
        const jsPlaylist = new Playlist({
            name: "node js",
            ctype: "front end",
            videos: 27,
            author: "virat",
            active: true
        })
        const mongoPlaylist = new Playlist({
            name: "mongo js",
            ctype: "back end",
            videos: 2,
            author: "virat",
            active: true
        })

        const mongosPlaylist = new Playlist({
            name: "mongooes",
            ctype: "back end",
            videos: 4,
            author: "virat",
            active: true
        })
        const exPlaylist = new Playlist({
            name: "express js",
            ctype: " end",
            videos: 24,
            author: "virat",
            active: true
        })

        const result = await Playlist.insertMany([jsPlaylist, mongoPlaylist, mongosPlaylist, exPlaylist ]);
        console.log(result);
    
    }catch(err){
        console.log(err);
    }    

}

// createDocument();

const getDocument =  async() => {
    try{
        const result = await Playlist
        .find({author:"virat" })
        .select({name:1})
        .sort("name : 1")
        // .countDocuments()
        // .limit(1)

    console.log(result);

    }catch(err){
        console.log(err);
    }
    
}

// getDocument();


// update the document
const updateDocument = async (_id) =>{
    try{
        const result= await Playlist.findByIdAndUpdate({_id : "63c6544b043749300191a030"},{
            $set : {
                name: "javascript abhishl"
            }
        }, {
            new : true,
            useFindAndModify : false
        
        });
        console.log(result);

    }catch(err){
        console.log(err);
    }
    

}


// updateDocument()



// delete document

const  deleteDocument = async(_id) => {
    try{
        const results = await Playlist.deleteOne({_id });
        console.log(results);

    }catch(err){
        console.log(err);
    }
}

deleteDocument("63c65c3d2ca395633d411383");