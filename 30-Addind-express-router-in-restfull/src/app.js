const express = require("express");
require("./db/conn");

const studentRouter = require("./routers/student");

const app = express();
const port = process.env.PORT || 8000;


app.use(express.json());
app.use(studentRouter);




// 1. create a new router
// const router = new express.Router();

// // 2. we need to define the router
// router.get("/abhi", (req, res) => {
//     res.send("hello this is router");
// })

// 3. we need to register our router
// app.use(router)







app.listen(port, () => {
    console.log(`server is running on ${port}`);
})