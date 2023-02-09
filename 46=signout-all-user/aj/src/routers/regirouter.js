const express = require("express");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth")

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
                gender: req.body.gender
                
            });

            // console.log("the success part" + users);

            // using middleware jwt
            const token = await users.generateAuthToken();

            // using cookies
            // the res.cookie() function is used to set the cookie name to value.
            // the value parameter may be a string or object converted to JSON

            res.cookie("jwt", token, {
                expires:new Date(Date.now() + 30000),
                httpOnly:true
            });
            

        

            const registered = await users.save();
            res.status(201).render("index");
    
        }else{
            res.send("Password is not matching");
        }
        
    } catch (error) {
        res.status(400).send(error);
        // console.log("the error part page");
    }
})

// simple login
// router.post("/login", async(req,res) => {
//     try {
//         const email = req.body.email;
//         const password = req.body.password;
//         const useremail = await Regis.findOne({email:email})
    
//         if(useremail.password === password){
//             res.status(201).render("index");
//         }else{
//             res.send("password are not matching");
//         }

//     }catch(err){
//         res.status(400).send("Invaild email")
//     }

// })





// LOGIN with bcrypt

router.post("/login", async(req,res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await Regis.findOne({email:email})

        const isMatch = await bcrypt.compare(password, useremail.password);
        
        const token = await useremail.generateAuthToken();
        // console.log("the token part" + token);

        // cookie
        res.cookie("jwt", token, {
            expires:new Date(Date.now() + 650000),
            httpOnly:true,
            // secure:true
        });

        if(isMatch){
            res.status(201).render("index");
        }else{
            res.send("password are not matching");
        }

    }catch(err){
        res.status(400).send("Invaild email")
    }

})  
// logout

router.get("/logout", auth, async(req, res) => {
    try {
        console.log(req.user);

        // for single logout
        // req.user.tokens = req.user.tokens.filter((currentElem)=>{
        //     return currentElem.token !== req.token

        // })

        // logout from all devices
        req.user.tokens = [];

        res.clearCookie("jwt");

        console.log("logout successful");
        //  auth
        await req.user.save()
        res.render("login");

    } catch (error) {
         res.status(500).send(error);
    }
 })


module.exports = router;



// creating bcrypt hashing 
// const bcrypt = require("bcryptjs");
// const securePassword = async (password) => {

//     const passwordHash = await bcrypt.hash(password, 10);
//     console.log(passwordHash);

//     const passwordmatch = await bcrypt.compare("abhishek", passwordHash);
//     console.log(passwordmatch);

// }
// securePassword("abhishek");


// creating jwt token
// const jwt = require("jsonwebtoken");
// const createToken = async() => {
//    const tokens = await jwt.sign({_id:"63d20e9eed45240e4000003e"}, "uhuhnuhhhuihkhkjkhjkhuhuhuiiikjlkj", {
//         expiresIn: "2 seconds"
//    });
//     console.log(tokens);

//     const userVer = await jwt.verify(tokens, "uhuhnuhhhuihkhkjkhjkhuhuhuiiikjlkj");
//     console.log(userVer);
// }
// createToken();