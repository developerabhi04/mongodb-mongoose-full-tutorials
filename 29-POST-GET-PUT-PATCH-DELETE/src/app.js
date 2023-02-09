const express = require("express");
require("./db/conn");

const Student = require("./models/student")
const app = express();
const port = process.env.PORT || 8000;


app.use(express.json());
// create a new student
// app.post("/student", (req,res)=>{
//     console.log(req.body);
//     const user = new Student(req.body);

//     user.save().then(()=>{
//         res.status(201).send(user);
//     }).catch((err)=>{
//         res.status(400).send(err)
//     })
  
//     // res.send("hi this is from server")
// })

// create a new student
app.post("/student", async(req, res) => {
    try{
        const users = new Student(req.body);
        const selectuser = await users.save()
        res.status(201).send(selectuser);
    }catch(err){
        res.status(400).send(err);
    }
})



// read the data ofregistered students

// app.get("/student", async(req,res)=>{

//     try{
//         const studentData = await Student.find()
//         res.send(studentData);
//     }catch(e){
//         res.send(e)
//     }
    
// })

app.get("/student", async(req,res)=>{

    try{
        const studentData = await Student.find()
        res.send(studentData);
    }catch(e){
        res.send(e)
    }
    
})

// get the indivisual student data using id

app.get("/student/:id", async (req, res)=>{
    try {
        const _id = req.params.id;
        const studentsData= await Student.findById(_id);
        console.log(studentsData);

        if(!studentsData){
            return res.status(404).send();
        }else{
            res.send(studentsData)
        }

        // res.send(studentsData)
    } catch (error) {
        res.status(500).send(error)
    }

})



// update the student by it id
// app.patch("/student/:id", async(req,res) => {
//     try{
//         const _id = req.params.id;
//         const updateStudent = await Student.findByIdAndUpdate(_id, req.body)
//         res.send(updateStudent);
//     }catch(err){
//         res.status(400).send(err)
//     }
// })

app.patch("/student/:id", async(req,res) => {
    try{
        const _id = req.params.id;
        const updateStudent = await Student.findByIdAndUpdate(_id, req.body,{
            new :true
        })
        res.send(updateStudent);
    }catch(err){
        res.status(400).send(err)
    }
})





// delete

app.delete("/student/:id", async(req, res) => {
    try {
        // const id = req.params.id;
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(400).send()
        }
        res.send(deleteStudent);
    } catch (error) {
        res.status(400).send(error)
    }
})




app.listen(port, () => {
    console.log(`server is running on ${port}`);
})