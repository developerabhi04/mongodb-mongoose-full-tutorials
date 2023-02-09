const mongoose = require("mongoose");
const validator = require("validator");



const register = new mongoose.Schema({
    firstname: {
        type: String,
        validation: true
    },
    lastname: {
        type: String,
        validation: true
    },
    email: {
        type: String,
        validation: true,
        unique: true,
    },
    phone: {
        type: Number,
        validation: true,
        unique: true
    },
    age: {
        type: Number,
        validation: true,
    },
    gender: {
        type: String,
        validation: true
    },
    password: {
        type: String,
        validation: true
    },
    confirmpassword: {
        type: String,
        validation: true
    }
})


const User = mongoose.model("newregi", register);


module.exports = User;