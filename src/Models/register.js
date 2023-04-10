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

//bcrypt
registerSchema.pre("save", async function (next){

  if (this.isModified("pass")){
    this.pass = await bcrypt.hash(this.pass, 10)
  }
 next();
})
const registeruser = new mongoose.model('Userdata', registerSchema)

module.exports = registeruser