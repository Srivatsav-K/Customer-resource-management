const mongoose = require('mongoose')
const Product = require('./product')

const { Schema } = mongoose

const itemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    finalPrice: {
        type: Number,
        required: true,
        min: [0, 'price should be greater or equal to 0'],
        default: 0
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    amount: {
        type: Number,
        required: true,
        min: [0, 'price should be greater or equal to 0'],
    }
}, { timestamps: true })

itemSchema.pre('save', function (next) {
    const item = this
    Product.findById(item.product)
        .then((product) => {
            item.finalPrice = item.finalPrice || product.basePrice
            next()
        })
        .catch((err) => {
            console.log(err)
        })
})



module.exports = itemSchema
