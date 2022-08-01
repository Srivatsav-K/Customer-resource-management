const Task = require('../models/task')

const taskControllers = {}

taskControllers.list = (req, res) => {
    const userId = req.user._id

    Task.find({ user: userId })
        .then((tasks) => {
            res.json(tasks)
        })
        .catch((err) => {
            res.json(err)
        })
}

taskControllers.show = (req, res) => {
    const userId = req.user._id
    const id = req.params.id

    Task.findOne({ _id: id, user: userId })
        .then((task) => {
            if (!task) {
                res.json({ errors: 'Not found' })
            } else {
                res.json(task)
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

taskControllers.create = (req, res) => {
    const userId = req.user._id
    const body = req.body

    const task = new Task({ ...body, user: userId })
    task.save()
        .then((task) => {
            res.json(task)
        })
        .catch((err) => {
            res.json(err)
        })
}

taskControllers.update = (req, res) => {
    const userId = req.user._id
    const id = req.params.id
    const body = req.body

    Task.findOneAndUpdate({ _id: id, user: userId }, body, { new: true, runValidators: true })
        .then((task) => {
            if (!task) {
                res.json({ errors: 'Not found' })
            } else {
                res.json(task)
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

taskControllers.destroy = (req, res) => {
    const userId = req.user._id
    const id = req.params.id

    Task.findOneAndDelete({ _id: id, user: userId })
        .then((task) => {
            if (!task) {
                res.json({ errors: 'Not found' })
            } else {
                res.json(task)
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports = taskControllers