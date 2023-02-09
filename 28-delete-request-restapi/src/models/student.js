const mongoose = require("mongoose");
const validator = require("validator")

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        validatation: true
    },
    email: {
        type: String,
        validator: true,
        unique: [true, "Email already exists"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new error("Invalid Email")
            }
        }
    },
    phone: {
        type: Number,
        validation: true,
        unique: true,
        min:10
    },
    address: {
        type: String,
        validation:true
    }
})


const Student = new mongoose.model("Table", StudentSchema);

module.exports = Student;