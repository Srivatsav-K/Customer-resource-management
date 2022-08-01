const mongoose = require('mongoose')

const { Schema } = mongoose

const commentsSchema = new Schema({
    body: {
        type: String
    }
}, { timestamps: true })

module.exports = commentsSchema