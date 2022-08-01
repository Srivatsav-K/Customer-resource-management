const mongoose = require('mongoose')
const { isEmail, isMobilePhone, isURL } = require('validator')
const uniqueValidator = require('mongoose-unique-validator')

const { Schema } = mongoose

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, '{PATH} is required!'],
        minLength: [4, '{PATH} must have at least 4 characters!'],
        trim: true,
        unique: true,
        lowercase: true
    },
    designation: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        unique: true,
        required: [true, '{PATH} is required!'],
        validate: {
            validator: (value) => {
                return isMobilePhone(value, ['en-US', 'en-IN'])
            },
            message: () => {
                return 'Invalid phone'
            }
        },
        trim: true
    },
    alternatePhone: {
        type: String,
        validate: {
            validator: (value) => {
                return (value) ? (isMobilePhone(value, ['en-US', 'en-IN'])) : true
            },
            message: () => {
                return 'Invalid phone'
            }
        },
        trim: true
    },
    email: {
        type: String,
        required: [true, '{PATH} is required!'],
        unique: true,
        validate: {
            validator: (value) => {
                return isEmail(value)
            },
            message: () => {
                return 'Invalid email'
            }
        },
        lowercase: true,
        trim: true
    },
    website: {
        type: String,
        validate: {
            validator: (value) => {
                return (value) ? (isURL(value)) : true
            },
            message: () => {
                return 'Invalid website'
            }
        },
        trim: true
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: "Client",
        required: [true, '{PATH} is required!']
    },
    customer: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        immutable: true,
        required: true
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true })

contactSchema.plugin(uniqueValidator, { message: '{PATH} exists!' })

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact