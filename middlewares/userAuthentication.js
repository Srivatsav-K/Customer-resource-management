const jwt = require('jsonwebtoken')
const CryptoJS = require('crypto-js')

const User = require('../app/models/user')

const authenticateUser = (req, res, next) => {
    if (!req.header('x-auth')) {
        res.json({ errors: { message: 'Token not present' } })
    } else {
        const header = req.header('x-auth').split(' ')[1]

        if (header) {
            let tokenData
            try {
                const token = CryptoJS.AES.decrypt(header, process.env.CRYPTOJS_SECRET_KEY).toString(CryptoJS.enc.Utf8)
                tokenData = jwt.verify(token, process.env.SECRET_KEY)
                User.findById(tokenData._id, '-password')
                    .then((user) => {
                        if (!user) {
                            res.json({ errors: { message: 'user not found' } })
                        } else {
                            req.user = user
                            next()
                        }
                    })
                    .catch((err) => {
                        res.json(err)
                    })
            } catch (e) {
                res.json({ errors: e })
            }
        } else {
            res.json({ errors: { message: 'Invalid token' } })
        }

    }
}

module.exports = { authenticateUser }