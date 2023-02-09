const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


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
    },
    tokens:[{
        token:{
            type: String,
            validation: true
        }
    }]
})

//generating jwt token
registerSchema.methods.generateAuthToken = async function(){
    try {
        const token = jwt.sign({_id:this._id.toString()}, "mynameisabhishekkumarkumarabhishekkumarajsieurty");
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        return token;
    } catch (error) {
        res.send("the error part" + error);
        console.log("the error part" + error);
    }
}




// bcrypt and hashing password
registerSchema.pre("save", async function(next) {

    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmpassword = await bcrypt.hash(this.password, 10);
    }
   
    next();

})

// registerSchema.pre("save", async function(next) {

//     if(this.isModified("password")){
//         this.password = await bcrypt.hash(this.password, 10);
//         this.confirmpassword = undefined;
//     }
   
//     next();

// })






const User = mongoose.model("newregi", registerSchema);


module.exports = User;