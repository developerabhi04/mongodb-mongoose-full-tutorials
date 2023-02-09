const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");



const registerSchema = new mongoose.Schema({
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

registerSchema.pre("save", async function(next) {

    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmpassword = undefined;
    }
   
    next();

})






const User = mongoose.model("newregi", registerSchema);


module.exports = User;