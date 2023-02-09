const express = require("express");
const router = new express.Router();

const Student = require("../models/students");




// 2. we need to define the router

router.get("/abhi", (req, res) => {
    res.send("hello this is router");
})

// create a new student
router.post("/students", async(req, res) => {
    try{
        const users = new Student(req.body);
        const selectuser = await users.save()
        res.status(201).send(selectuser);
    }catch(err){
        res.status(400).send(err);
    }
})



// read the data ofregistered students
router.get("/students", async(req,res)=>{

    try{
        const studentData = await Student.find()
        res.send(studentData);
    }catch(e){
        res.send(e)
    }
    
})


// get the indivisual student data using id
router.get("/students/:id", async (req, res)=>{
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

router.patch("/students/:id", async(req,res) => {
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

router.delete("/student/:id", async(req, res) => {
    try {
        // const id = req.params.id;
        const deleteStudent = await Student.findByIdAndDelete(req.params.id,{
            new: true
        });
        if(!req.params.id){
            return res.status(400).send()
        }
        res.send(deleteStudent);
    } catch (error) {
        res.status(400).send(error)
    }
})



module.exports = router;
