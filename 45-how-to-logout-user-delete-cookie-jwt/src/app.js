require('dotenv').config();
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth")


const app = express();
require("./db/conn")


const routers  = require("./routers/regirouter");
app.use("/css", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
//const {json} = require("express");
//const {log} = require("console");

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));



const htmlPath = path.join(__dirname,"../public")
app.use(express.static(htmlPath))

app.set("view engine", "hbs")
const viewPath = path.join(__dirname, "../template/views")
app.set("views", viewPath);

const partialPath = path.join(__dirname, "../template/partials")
hbs.registerPartials(partialPath);


app.use(routers);

// console.log(process.env.SECRET_KEY);

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/secret", auth, (req, res) => {
    // console.log(`this is cookie awesome ${req.cookies.jwt}`);
    res.render("secret");
})




app.get("/register" ,(req, res) => {
    res.render("register");
})

app.get("/login", (req, res) => {
    res.render("login")
})






app.listen(PORT, () => {
    console.log(`server is running in ${PORT}`);
})