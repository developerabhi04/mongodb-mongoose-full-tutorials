const mongoose = require("mongoose");


mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URL ,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("database connected");
}).catch((err)=>{
    console.log("no connection",err);
})