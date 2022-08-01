const Product = require('../models/product')

const productsController = {}

productsController.list = (req, res) => {
    Product.find()
        .then((products) => {
            res.json(products)
        })
        .catch((err) => {
            res.json(err)
        })
}

productsController.show = (req, res) => {
    const id = req.params.id
    Product.findById(id)
        .then((product) => {
            if (!product) {
                res.json({ errors: 'Not found!' })
            } else {
                res.json(product)
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

productsController.create = (req, res) => {
    const userId = req.user._id
    const body = req.body
    const product = new Product({ ...body, user: userId })
    product.save()
        .then((product) => {
            res.json(product)
        })
        .catch((err) => {
            res.json(err)
        })
}

productsController.update = (req, res) => {
    const userId = req.user._id
    const id = req.params.id
    const body = req.body
    Product.findOneAndUpdate({ _id: id, user: req.user._id }, body, { new: true, runValidators: true })
        .then((product) => {
            if (!product) {
                res.json({ errors: 'Not found!' })
            } else {
                res.json(product)
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

productsController.destory = (req, res) => {
    const id = req.params.id
    Product.findOneAndDelete({ _id: id, user: req.user._id })
        .then((product) => {
            if (!product) {
                res.json({ errors: 'Not found!' })
            } else {
                res.json(product)
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports = productsController