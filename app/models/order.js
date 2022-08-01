const mongoose = require('mongoose')
const itemSchema = require('./item')
const commentsSchema = require('./comments')

const { Schema } = mongoose

const orderSchema = new Schema({
    contact: {
        type: Schema.Types.ObjectId,
        ref: 'Contact',
        required: [true, '{PATH} required!']
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
    comments: {
        type: [commentsSchema],
    },
    closedDate: {
        type: Date
    },
    expectedDeliveryDate: {
        type: Date
    },
    enquiry: {
        type: Schema.Types.ObjectId,
        ref: "Enquiry"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema)

module.exports = Order