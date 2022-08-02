const mongoose = require('mongoose')
const { pre } = require('./comments')
const itemSchema = require('./item')

const { Schema } = mongoose

const quotationSchema = new Schema({
    title: {
        type: String,
        required: [true, '{PATH} is required!']
    },
    enquiry: {
        type: Schema.Types.ObjectId,
        ref: 'Enquiry'
    },
    client: {
        type: Schema.Types.ObjectId,
        required: [true, '{PATH} is required!'],
        ref: 'Client'
    },
    date: {
        type: Date,
        required: [true, 'Issue date is required!']
    },
    expiryDate: {
        type: Date,
        required: [true, 'Expiry date is required!']
    },
    items: {
        type: [itemSchema],
        required: true,
        validate: {
            validator: (value) => {
                return value.length > 0
            },
            message: () => {
                return 'items cannot be empty'
            }
        }
    },
    subTotal: {
        type: Number,
        required: true,
        min: [0, 'price should be greater or equal to 0'],
    },
    gstRate: {
        type: Number,
        required: true,
        min: [0, `GST can't be less than 0`]
    },
    gstAmount: {
        type: Number,
        requried: [true, 'Gst amount is requried!']
    },
    total: {
        type: Number,
        required: true,
        min: [0, 'price should be greater or equal to 0'],
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const Quotation = mongoose.model('Quotation', quotationSchema)

module.exports = Quotation