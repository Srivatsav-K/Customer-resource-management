const mongoose = require('mongoose')
const { isEmail, isStrongPassword } = require('validator')
const uniqueValidator = require('mongoose-unique-validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const CryptoJS = require('crypto-js')

const { Schema } = mongoose

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username required!'],
        minLength: [3, 'Username must have at least 3 characters!'],
        maxLength: [64, "Username can't exceed 64 characters !"],
        lowercase: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'email required!'],
        validate: {
            validator: (value) => {
                return isEmail(value)
            },
            message: (props) => {
                //return `${props.value} is not a valid email`
                return 'Invalid email'
            }
        },
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password required'],
        validate: {
            validator: function (value) {
                return (
                    isStrongPassword(value, {
                        minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false
                    })
                )
            },
            message: function () {
                return 'Password must contain at least 1 uppercase character,lowercase character,number & a special character'
            }
        },
    },
    role: {
        type: String,
        required: true,
        default: 'employee',
        enum: {
            values: ['admin', 'employee'],
            message: "{VALUE} is an invalid role"
        },
        lowercase: true
    }
}, { timestamps: true })

//unique validator
userSchema.plugin(uniqueValidator, { message: "{PATH} exists" })

//hash password
userSchema.pre("save", function (next) {
    const user = this
    if (user.isNew) {
        bcryptjs.genSalt()
            .then((salt) => {
                bcryptjs.hash(user.password, salt)
                    .then(encrypted => {
                        user.password = encrypted
                        next()
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    } else {
        next()
    }
})


//generate token
userSchema.methods.genToken = function (password) {
    return (
        bcryptjs.compare(password, this.password)
            .then((match) => {
                if (!match) {
                    return Promise.reject({ errors: "Inavlid email or password" })
                } else {
                    const tokenData = {
                        _id: this._id,
                        username: this.username,
                        email: this.email,
                        role: this.role
                    }

                    const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' })

                    const encoded = CryptoJS.AES.encrypt(token, process.env.CRYPTOJS_SECRET_KEY).toString()

                    return Promise.resolve({ token: `Bearer ${encoded}` })
                }
            })
    )

}


const User = mongoose.model('User', userSchema)

module.exports = User



