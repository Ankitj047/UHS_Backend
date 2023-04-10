const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt') 

const registerSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: [true,"Email ID is already present"],
        validate(value) {
            if (!validator.isEmail(value)) {
              throw new Error("Invalid EMail");
            }
          },
    },
    pass: {
        type:String,
        minLength: 4
    }
})

const registeruser = new mongoose.model('Userdata', registerSchema)

module.exports = registeruser