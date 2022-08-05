const Enquiry = require('../models/enquiry')
const Quotation = require('../models/quotation')

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
    const id = req.params.id

    Enquiry.findOne({ _id: id }).populate({
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
    const id = req.params.id
    const body = req.body

    Enquiry.findByIdAndUpdate(id, body, { new: true, runValidators: true })
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

enquiryControllers.destroy = async (req, res) => {
    const id = req.params.id

    try {
        await Quotation.deleteMany({ enquiry: id })
        const deletedEnquiry = await Enquiry.findOneAndDelete({ _id: id })
        res.json(deletedEnquiry)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}

module.exports = enquiryControllers

