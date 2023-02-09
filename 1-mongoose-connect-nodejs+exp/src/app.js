const mongoose = require("mongoose");

// connection creation and creating a new database
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017")
.then( () => console.log("connection sucessful"))
.catch( (err) => console.log(err))