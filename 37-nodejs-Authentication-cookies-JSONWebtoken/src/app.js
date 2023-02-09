const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();
require("./db/conn")


const routers  = require("./routers/regirouter");
//const {json} = require("express");
//const {log} = require("console");

const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({extended:false}));



const htmlPath = path.join(__dirname,"../public")
app.use(express.static(htmlPath))

app.set("view engine", "hbs")
const viewPath = path.join(__dirname, "../template/views")
app.set("views", viewPath);

const partialPath = path.join(__dirname, "../template/partials")
hbs.registerPartials(partialPath);


app.use(routers);



app.get("/", (req, res) => {
    res.render("index")
})

app.get("/register", (req, res) => {
    res.render("register")
})

app.get("/login", (req, res) => {
    res.render("login")
})






app.listen(PORT, () => {
    console.log(`server is running in ${PORT}`);
})