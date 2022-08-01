const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const commentsSchema = require('./comments')

const { Schema } = mongoose

const enquirySchema = new Schema({
    name: {
        type: String,
        required: [true, '{PATH} is required!'],
        minLength: [3, '{PATH} must have at least 3 characters '],
        unique: true,
        trim: true,
        lowercase: true
    },
    contact: {
        type: Schema.Types.ObjectId,
        ref: 'Contact',
        required: [true, '{PATH} name is required!']
    },
    requirements: {
        type: String,
        required: [true, '{PATH} are requied!'],
        trim: true
    },
    budget: {
        type: Number,
        required: [true, '{PATH} is required!'],
        min: [1, '{PATH} should be greater or equal to 1'],
        trim: true
    },
    competitors: {
        type: String,
        trim: true
    },
    estimatedTimelines: {
        type: String
    },
    expectedClosingDate: {
        type: Date
    },
    status: {
        type: String,
        default: 'inprocess',
        enum: ['inprocess', 'orderplaced', 'not interested']
    },
    comments: {
        type: [commentsSchema],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

enquirySchema.plugin(uniqueValidator, { message: '{PATH} exists!' })

const Enquiry = mongoose.model('Enquiry', enquirySchema)

module.exports = Enquiry