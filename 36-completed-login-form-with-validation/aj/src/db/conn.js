const mongoose = require("mongoose");


mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1:27017/samdb",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("database connected");
}).catch((err)=>{
    console.log("no connection",err);
})