const mongoose = require('mongoose')
const itemSchema = require('./item')
const commentsSchema = require('./comments')

const { Schema } = mongoose

const orderSchema = new Schema({
    title: {
        type: String,
        required: [true, '{PATH} is required!']
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
    status: {
        type: String,
        default: 'placed',
        enum: ['placed', 'cancelled'],
    },
    paymentStatus: {
        type: String,
        default: 'pending',
        enum: ['pending', 'received']
    },
    date: {
        type: Date,
        required: [true, 'Issue date is required!']
    },
    expiryDate: {
        type: Date,
        required: [true, 'Expiry date is required!']
    },
    closedDate: {
        type: Date
    },
    expectedDeliveryDate: {
        type: Date
    },
    comments: {
        type: [commentsSchema],
    },
    enquiry: {
        type: Schema.Types.ObjectId,
        ref: "Enquiry"
    },
    contact: {
        type: Schema.Types.ObjectId,
        ref: 'Contact',
        required: [true, '{PATH} required!']
    },
    client: {
        type: Schema.Types.ObjectId,
        required: [true, '{PATH} is required!'],
        ref: 'Client'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema)

module.exports = Order