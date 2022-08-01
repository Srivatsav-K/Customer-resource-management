const Enquiry = require('../models/enquiry')

const enquiryControllers = {}

enquiryControllers.list = (req, res) => {
    const userId = req.user._id

    Enquiry.find({ user: userId }).populate({
        path: 'contact', select: ['name', 'email', 'phone'],
        populate: { path: 'client', select: 'name' }
    }).populate('user', 'username')
        .then((enquiries) => {
            res.json(enquiries)
        })
        .catch((err) => {
            res.json(err)
        })
}

//for admin
enquiryControllers.listAll = (req, res) => {

    Enquiry.find().populate({
        path: 'contact', select: ['name', 'email', 'phone'],
        populate: { path: 'client', select: 'name' }
    }).populate('user', 'username')
        .then((enquiries) => {
            res.json(enquiries)
        })
        .catch((err) => {
            res.json(err)
        })
}

enquiryControllers.show = (req, res) => {
    const userId = req.user._id
    const id = req.params.id

    Enquiry.findOne({ _id: id, user: userId }).populate({
        path: 'contact', select: ['name', 'email', 'phone'],
        populate: { path: 'client', select: 'name' }
    }).populate('user', 'username')
        .then((enquiry) => {
            if (!enquiry) {
                res.json({ errors: 'Not found!' })
            } else {
                res.json(enquiry)
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

enquiryControllers.create = (req, res) => {
    const userId = req.user._id
    const body = req.body

    const enquiry = new Enquiry({ ...body, user: userId })
    enquiry.save()
        .then((enquiry) => {
            Enquiry.findById(enquiry._id).populate({
                path: 'contact', select: ['name', 'email', 'phone'],
                populate: { path: 'client', select: 'name' }
            }).populate('user', 'username')
                .then((enquiry) => {
                    res.json(enquiry)
                })
                .catch((err) => {
                    res.json(err)
                })
        })
        .catch((err) => {
            res.json(err)
        })
}


enquiryControllers.update = (req, res) => {
    const userId = req.user._id
    const id = req.params.id
    const body = req.body

    Enquiry.findOneAndUpdate({ _id: id, user: userId }, body, { new: true, runValidators: true, context: 'query' })
        .populate({
            path: 'contact', select: ['name', 'email', 'phone'],
            populate: { path: 'client', select: 'name' }
        }).populate('user', 'username')
        .then((enquiry) => {
            if (!enquiry) {
                res.json({ errors: 'Not found!' })
            } else {
                res.json(enquiry)
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

enquiryControllers.destroy = (req, res) => {
    const id = req.params.id

    Enquiry.findByIdAndDelete(id)
        .then((enquiry) => {
            if (!enquiry) {
                res.json({ errors: 'Not found!' })
            } else {
                res.json(enquiry)
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports = enquiryControllers

