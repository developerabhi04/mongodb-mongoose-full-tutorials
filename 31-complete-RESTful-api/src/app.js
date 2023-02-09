const express = require("express");
require("./db/conn");
const app = express();
const MensRanking = require("./router/sports");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(MensRanking);


app.get("/", (req, res) => {
    res.send("hi this is server");
})




app.listen(port, () => {
    console.log(`server is running on : ${port}`);
})