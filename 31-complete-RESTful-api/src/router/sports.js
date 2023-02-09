const express = require("express");
const router = new express.Router();

const Sportss = require("../models/sportSchema");



router.post("/sportmen", async(req,res)=>{
    try {
        const users = new Sportss(req.body);
        const sportPost = await users.save();
        res.status(201).send(sportPost)
    } catch (error) {
        res.status(400).send(error)
    }
})


router.get("/sportmen", async(req,res)=>{
    try {
        const sportGet = await Sportss.find({}).sort({"ranking":1})
        res.status(201).send(sportGet)
    } catch (error) {
        res.status(400).send(error);
    }
})

router.get("/sportmen/:id", async(req,res)=>{
    try {
        const _id = req.params.id;
        const sportGetid = await Sportss.findById(_id)
        res.send(sportGetid);
    } catch (error) {
        res.status(400).send(error);
    }
})



router.patch("/sportmen/:id", async(req,res)=>{
    try {
        const _id = req.params.id;
        const sportpatch = await Sportss.findByIdAndUpdate(_id, req.body, {
            new: true
        })
        res.status(201).send(sportpatch)
    } catch (error) {
        res.status(400).send(error);
    }
})

router.delete("/sportmen/:id", async(req,res)=>{
    try {
        const sportDelete = await Sportss.findByIdAndDelete(req.params.id)
        res.status(201).send(sportDelete)
    } catch (error) {
        res.status(400).send(error);
    }
})




module.exports = router;