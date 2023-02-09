const express = require("express");
require("./db/conn");
const Student = require("./models/student");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());


// create a new student
app.post("/student",(req,res) => {
    console.log(req.body);
    const user = new Student(req.body);
    user.save().then(() => {
        res.status(201).send(user);
    }).catch((err)=>{
        res.status(400).send(err);
    })

    // res.send("hello from the world");
})








app.listen(port, () =>{
    console.log(`server is running on ${port}`);
})