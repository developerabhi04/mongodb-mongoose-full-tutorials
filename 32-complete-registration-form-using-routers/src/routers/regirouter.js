const express = require("express");
const router = new express.Router();



const Regis = require("../models/regiSchema");



router.get("/hello", (req, res) => {
    res.send("hello this is router")
})
router.post("/register", async (req, res)=>{
    try {

        const pass = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(pass === cpassword){

            const users = new Regis({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                phone: req.body.phone,
                email: req.body.email,
                age: req.body.age,
                password: pass,
                confirmpassword: cpassword,
                gender: req.body.gender,
                
            });
            const registered = await users.save();
            res.status(201).send("index");
    
        }else{
            res.send("Password is not matching");
        }
        
    } catch (error) {
        res.status(400).send(error)
    }
})



module.exports = router;