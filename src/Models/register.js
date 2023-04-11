const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt') 
const jwttoken = require('jsonwebtoken')

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
    },
    tokens: [{
      token: {
        type: String,
        require: true,
      }
    }]
})
//jwttoken 
registerSchema.methods.generateAuthToken = async function () {

  try {
    const token = jwttoken.sign({_id:this._id.toString()}, process.env.SECRET_KEY)
    this.tokens = this.tokens.concat({token: token})
    await this.save();
return token;
  } catch (error) {
    console.log(error?.message)
  }
}

//bcrypt
registerSchema.pre("save", async function (next){

  if (this.isModified("pass")){
    this.pass = await bcrypt.hash(this.pass, 10)
  }
 next();
})
const registeruser = new mongoose.model('Userdata', registerSchema)

module.exports = registeruser