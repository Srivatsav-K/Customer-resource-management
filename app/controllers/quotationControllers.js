const Quotation = require('../models/quotation')

const quotationControllers = {}

quotationControllers.list = (req, res) => {
    const userId = req.user._id

    Quotation.find({ user: userId }).populate('client', ['name']).populate('contact', ['name'])
        .then((quotations) => {
            res.json(quotations)
        })
        .catch((err) => {
            res.json(err)
        })
}

//admin access
quotationControllers.listAll = (req, res) => {
    Quotation.find().populate('items').populate('client', ['name']).populate('contact', ['name']).populate('user', ['username'])
        .then((quotations) => {
            res.json(quotations)
        })
        .catch((err) => {
            res.json(err)
        })
}

quotationControllers.show = (req, res) => {
    const id = req.params.id
    Quotation.findOne({ _id: id }).populate('client', ['name']).populate('contact', ['name']).populate('user', ['username'])
        .then((quotation) => {
            if (!quotation) {
                res.json({ errors: 'Not found!' })
            } else {
                res.json(quotation)
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

quotationControllers.create = (req, res) => {
    const userId = req.user._id
    const body = req.body

    const quotation = new Quotation({ ...body, user: userId })
    quotation.save()
        .then((quotation) => {
            Quotation.findById(quotation._id).populate({ path: 'items', populate: { path: 'product', select: ['name', 'basePrice'] } })
                .populate('client', ['name'])
                .populate('contact', ['name'])
                .populate('user', ['username'])
                .then((quotation) => {
                    res.json(quotation)
                })
                .catch((err) => {
                    res.json(err)
                })

        })
        .catch((err) => {
            res.json(err)
        })
}

//admin only
quotationControllers.destroy = (req, res) => {
    const id = req.params.id

    Quotation.findByIdAndDelete(id)
        .then((quotation) => {
            if (!quotation) {
                res.json({ errors: 'Not found!' })
            } else {
                res.json(quotation)
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports = quotationControllers