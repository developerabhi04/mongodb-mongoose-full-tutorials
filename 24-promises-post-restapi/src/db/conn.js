const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/studentapi",{   
    useNewUrlParser:true,
    useUnifiedTopology:true
    
}).then(()=>{
    console.log("connection is successful");
}).catch((e) =>{
    console.log("no connection",e);
})