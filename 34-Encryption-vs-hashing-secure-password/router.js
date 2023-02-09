const express = require("express");
const router = new express.Router();



const Regis = require("../models/regiSchema");


//SIGIN

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
            res.status(201).render("index");
    
        }else{
            res.send("Password is not matching");
        }
        
    } catch (error) {
        res.status(400).send(error)
    }
})

// LOGIN

router.post("/login", async(req,res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Regis.findOne({email:email})
    
        if(useremail.password === password){
            res.status(201).render("index");
        }else{
            res.send("password are not matching");
        }

    }catch(err){
        res.status(400).send("Invaild email")
    }

})



// const bcrypt = require("bcryptjs");

// const securePassword = async (password) => {

//     const passwordHash = await bcrypt.hash(password, 10);
//     console.log(passwordHash);

//     const passwordmatch = await bcrypt.compare("abhishek", passwordHash);
//     console.log(passwordmatch);

// }
// securePassword("abhishek")





module.exports = router;