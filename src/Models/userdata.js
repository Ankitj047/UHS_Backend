const mongoose = require('mongoose')
const validator = require('validator')


const userdataSchema = mongoose.Schema({
    fname: {type: String},
    lname: {type: String},
    age: {type: String},
    email: {type: String},
    phone: {type: String},
    isaccept: {type: Boolean},
    diseasedes: {type: String},
    userid: {type: String},
})

const loginuserdata = new mongoose.model("loginuserdata",userdataSchema)

module.exports = loginuserdata