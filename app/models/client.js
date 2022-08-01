const mongoose = require('mongoose')
const { isEmail, isMobilePhone, isURL } = require('validator')
const uniqueValidator = require('mongoose-unique-validator')
const { Validator } = require('format-utils');

const { Schema } = mongoose

const clientSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Client name is required!'],
        minLength: [3, 'Client name must have at least 3 characters!'],
        trim: true,
        unique: true,
        lowercase: true
    },
    phone: {
        type: String,
        unique: true,
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
        unique: true,
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
                return (!value) ? true : isURL(value)
            },
            message: () => {
                return 'Invalid website'
            }
        },
        trim: true
    },
    sector: {
        type: String,
        required: [true, 'Sector is required!'],
        minLength: [2, 'Too short!'],
        lowercase: true,
    },
    address: {
        type: String,
        required: [true, 'Address is required!'],
        trim: true,
    },
    gst: {
        type: String,
        validate: {
            validator: (value) => {
                return (!value) ? true : Validator.gst(value)
            },
            message: () => {
                return 'Invalid GST'
            }
        },
        trim: true
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

clientSchema.plugin(uniqueValidator, { message: "{PATH} exists!" })


const Client = mongoose.model('Client', clientSchema)

module.exports = Client