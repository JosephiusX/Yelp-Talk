const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ','') // form the authorization key we subtract 'Bearer ' from the value, whats left is called token
        const decoded = jwt.verify(token, 'thisismynewcourse') // using jsonwebtoken to verify the token and call it decoded
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth
