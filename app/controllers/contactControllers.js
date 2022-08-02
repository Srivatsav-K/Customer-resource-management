const Contact = require('../models/contact')
const Enquiry = require('../models/enquiry')
const Quotation = require('../models/quotation')

const contactControllers = {}

contactControllers.list = (req, res) => {

    Contact.find().populate('client', "name").populate('createdBy', 'username').populate('updatedBy', 'username')
        .then((contacts) => {
            res.json(contacts)
        })
        .catch((err) => {
            res.json(err)
        })
}

contactControllers.show = (req, res) => {
    const id = req.params.id

    Contact.findById(id).populate('client', 'name').populate('createdBy', 'username').populate('updatedBy', 'username')
        .then((contacts) => {
            res.json(contacts)
        })
        .catch((err) => {
            res.json(err)
        })
}

contactControllers.create = (req, res) => {
    const userId = req.user
    const body = req.body

    const contact = new Contact({ ...body, createdBy: userId })
    contact.save()
        .then((contact) => {
            const contactId = contact._id
            Contact.findById(contactId).populate('client', 'name').populate('createdBy', 'username').populate('updatedBy', 'username')
                .then((contact) => res.json(contact))
                .catch((err) => res.json(err))
        })
        .catch((err) => {
            res.json(err)
        })
}

contactControllers.update = (req, res) => {
    const userId = req.user._id
    const id = req.params.id
    const body = req.body

    Contact.findByIdAndUpdate(id, { ...body, updatedBy: userId }, { new: true, runValidators: true })
        .then((contact) => {
            if (!contact) {
                res.json({ errors: 'Not found' })
            } else {
                res.json(contact)
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

contactControllers.destroy = async (req, res) => {
    const userId = req.user._id
    const id = req.params.id

    try {
        const enquiries = await Enquiry.find({ contact: id })
        await enquiries.forEach(async (enquiry) => {
            await Quotation.deleteMany({ enquiry: enquiry._id })
            await Enquiry.deleteMany({ contact: id })
        })
        const deletedContact = await Contact.findOneAndDelete({ user: userId, _id: id })
        res.json(deletedContact)
    } catch (error) {
        res.json(error)
    }
}

module.exports = contactControllers