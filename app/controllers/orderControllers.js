const Order = require('../models/order')

const orderControllers = {}

orderControllers.list = (req, res) => {
    const userId = req.user._id

    Order.find({ user: userId }).populate('client', ['name']).populate('contact', ['name'])
        .then((orders) => {
            res.json(orders)
        })
        .catch((err) => {
            res.json(err)
        })
}

orderControllers.listAll = (req, res) => {
    Order.find()
        .then((orders) => {
            res.json(orders)
        })
        .catch((err) => {
            res.json(err)
        })
}

orderControllers.show = (req, res) => {
    const userId = req.user._id
    const id = req.params.id

    Order.findOne({ _id: id, user: userId })
        .then((order) => {
            if (!order) {
                res.json({ errors: 'Not found!' })
            } else {
                res.json(order)
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

orderControllers.create = (req, res) => {
    const userId = req.user._id
    const body = req.body

    const order = new Order({ ...body, user: userId })
    order.save()
        .then((order) => {
            res.json(order)
        })
        .catch((err) => {
            res.json(err)
        })
}

orderControllers.update = (req, res) => {
    const userId = req.user._id
    const body = req.body
    const id = req.params.id

    Order.findOneAndUpdate({ _id: id, user: userId }, body, { new: true, runValidators: true })
        .then((order) => {
            if (!order) {
                res.json({ errors: 'Not found!' })
            } else {
                res.json(order)
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

orderControllers.destroy = (req, res) => {
    const userId = req.user._id
    const id = req.params.id

    Order.findOneAndDelete({ _id: id, user: userId })
        .then((order) => {
            if (!order) {
                res.json({ errors: 'Not found!' })
            } else {
                res.json(order)
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports = orderControllers