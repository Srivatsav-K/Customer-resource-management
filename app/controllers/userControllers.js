const User = require('../models/user')
const bcryptjs = require('bcryptjs')

const userControllers = {}

userControllers.show = (req, res) => {
    const id = req.params.id
    User.findById(id)
        .then((user) => res.json(user))
        .catch(err => res.json(err))
}

//check if users are present in db(for new registration)
userControllers.isNew = (req, res) => {
    User.findOne({ role: "admin" })
        .then((user) => {
            if (!user) {
                res.json({ status: true })
            } else {
                res.json({ status: false })
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

userControllers.adminRegistration = (req, res) => {
    const body = req.body
    User.findOne({ role: "admin" })
        .then((admin) => {
            if (admin) {
                res.json({ errorMessage: 'Admin account is already present' })
            } else {
                const user = new User({ ...body, role: 'admin' })
                user.save()
                    .then((user) => {
                        res.json({ message: 'Admin registration successfull' })
                    })
                    .catch((err) => {
                        res.json(err)
                    })
            }
        })
        .catch(err => res.json(err))
}

userControllers.employeeRegistration = (req, res) => {
    const body = req.body
    const user = new User(body)
    user.save()
        .then((user) => {
            res.json({ message: 'Employee registration successfull' })
        })
        .catch((err) => {
            res.json(err)
        })
}

userControllers.login = (req, res) => {
    const body = req.body
    User.findOne({ email: body.email })
        .then((user) => {
            if (!user) {
                res.json({ errors: 'Invalid email or password' })
            } else {
                return user.genToken(body.password)
            }
        })
        .then((token) => {
            res.json(token)
        })
        .catch(err => {
            res.json(err)
        })
}

userControllers.updateDetails = (req, res) => {
    const id = req.user._id
    const { username, email } = req.body
    User.findByIdAndUpdate(id, { username, email }, { new: true, runValidators: true },)
        .then((user) => {
            if (!user) {
                res.json({ errorMessage: 'User not found' })
            } else {
                const { password: Password, ...rest } = user._doc
                res.json(rest)
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

userControllers.changePassword = (req, res) => {
    const userId = req.user._id
    const body = req.body
    User.findById(userId)
        .then((user) => {
            if (!user) {
                res.json({ errors: 'user not found' })
            } else {
                bcryptjs.compare(body.password, user.password)
                    .then((match) => {
                        if (!match) {
                            //previous password entered ->incorrect
                            res.json({ error: 'Incorrect password.Try again' })
                        } else {
                            //hash and save new password
                            bcryptjs.genSalt()
                                .then((salt) => {
                                    bcryptjs.hash(body.newPassword, salt)
                                        .then((encrypted) => {
                                            User.findByIdAndUpdate(userId, { password: encrypted }, { new: true, runValidators: true, context: 'query' })
                                                .then((user) => {
                                                    res.json({ message: 'Password changed successfully' })
                                                })
                                                .catch((err) => {
                                                    res.json(err)
                                                })
                                        })
                                        .catch(err => res.json(err))
                                })
                                .catch(err => res.json(err))
                        }
                    })
                    .catch(err => res.json(err))
            }
        })
        .catch(err => res.json(err))
}




userControllers.account = (req, res) => {
    res.json(req.user)
}


module.exports = userControllers