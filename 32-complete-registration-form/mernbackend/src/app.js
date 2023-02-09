const express = require("express");
const hbs = require("hbs");
const path = require("path");
require("./db/conn");
const app = express();

const Register = require("./models/registersch")

const port = process.env.PORT || 3000;



//  bootstrap link
app.use("/css", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));



const staticPath = path.join(__dirname, "../public/");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);




app.get("/", (req, res) => {
    res.render("index")
})


app.get("/register", (req, res) => {
    res.render("register")
})


//  create a new user in our database
app.post("/register", async (req, res)=>{
    try {

        const pass = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(pass === cpassword){

            const users = new Register({
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



app.listen(port, () => {
    console.log(`server is running on : ${port}`);
})