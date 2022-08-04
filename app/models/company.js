const mongoose = require('mongoose')
const { isEmail, isMobilePhone, isURL } = require('validator')
const { Validator } = require('format-utils');

const { Schema } = mongoose

const companySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Company name is required!'],
        minLength: [3, 'Companyname must have at least 3 characters!'],
        trim: true,
        unique: true
    },
    address: {
        type: String,
        required: [true, 'Address is required!'],
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'Phone is required!'],
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
    email: {
        type: String,
        required: [true, 'Email is required!'],
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
                return isURL(value)
            },
            message: () => {
                return 'Invalid website'
            }
        },
        trim: true
    },
    gst: {
        type: String,
        required: [true, 'GST no. is required!'],
        validate: {
            validator: (value) => {
                return Validator.gst(value)
            },
            message: () => {
                return 'Invalid GST'
            }
        },
        trim: true
    },
    pan: {
        type: String,
        validate: {
            validator: (value) => {
                return value ? Validator.pan(value) : true
            },
            message: () => {
                return 'Invalid PAN'
            }
        },
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

const Company = mongoose.model('Company', companySchema)

module.exports = Company




