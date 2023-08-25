const jwt  = require('jsonwebtoken')
const regissteruser = require('../Models/register')

const auth = async (req, res, next) => {
try {
    const token = await req.headers.authorization;
    const verifyuser = await jwt.verify(token, process.env.SECRET_KEY)
    const userverify = await regissteruser.findOne({_id: verifyuser.userId})
    next()
} catch (error) {
    res.status(401).send(error?.message)
}
}

module.exports = auth;