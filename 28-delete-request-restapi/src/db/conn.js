const mongoose = require("mongoose")

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/abhishek",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> {
    console.log("connection is successfull");
}).catch((err)=> {
    console.log("no connection",err);
})