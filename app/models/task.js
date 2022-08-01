const mongoose = require('mongoose')

const { Schema } = mongoose

const taskSchema = new Schema({
    task: {
        type: String,
        required: [true, '{PATH} is required!'],
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    trash: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date //yy-mm-dd
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, '{PATH} is required!']
    },
}, { timestamps: true })

const Task = mongoose.model('Task', taskSchema)

module.exports = Task