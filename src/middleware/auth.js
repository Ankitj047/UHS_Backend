const jwt  = require('jsonwebtoken')
const regissteruser = require('../Models/register')

const auth = async (req, res, next) => {
try {
    const token = await req.body.token;
    console.log(token,"token")
    const verifyuser = await jwt.verify(token, process.env.SECRET_KEY)
    console.log(verifyuser,"verifyuser")
    const userverify = await regissteruser.findOne({_id: verifyuser.userid})
    next()
} catch (error) {
    res.status(401).send(error?.message)
}

}

module.exports = auth;