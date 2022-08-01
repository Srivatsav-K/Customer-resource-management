const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const { Schema } = mongoose


const productSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
        lowercase: true,
        minLength: 3,
        unique: true
    },
    description: {
        type: String,
        lowercase: true,
        minLength: 3,
    },
    basePrice: {
        type: Number,
        required: [true, '{PATH} is required!'],
        min: [1, '{PATH} should be greater or equal to 1']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

productSchema.plugin(uniqueValidator, { message: "{PATH} already exists" })

const Product = mongoose.model('Product', productSchema)

module.exports = Product