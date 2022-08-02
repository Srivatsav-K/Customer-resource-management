const Client = require('../models/client')
const Contact = require('../models/contact')
const Enquiry = require('../models/enquiry')
const Quotation = require('../models/quotation')

const clientControllers = {}

clientControllers.list = (req, res) => {

    Client.find().populate('createdBy', 'username').populate('updatedBy', 'username')
        .then((clients) => {
            res.json(clients)
        })
        .catch((err) => {
            res.json(err)
        })
}

clientControllers.show = (req, res) => {
    const id = req.params.id

    Client.findById(id).populate('createdBy', 'username').populate('updatedBy', 'username')
        .then((client) => {
            if (!client) {
                res.json({ errors: 'Not found' })
            } else {
                res.json(client)
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

clientControllers.create = (req, res) => {
    const userId = req.user._id
    const body = req.body

    const client = new Client({ ...body, createdBy: userId })
    client.save()
        .then((client) => {
            const clientId = client._id
            Client.findById(clientId).populate('createdBy', 'username').populate('updatedBy', 'username')
                .then((client) => res.json(client))
                .catch((err) => res.json(err))
        })
        .catch((err) => {
            res.json(err)
        })
}

clientControllers.update = (req, res) => {
    const userId = req.user._id
    const id = req.params.id
    const body = req.body

    Client.findByIdAndUpdate(id, { ...body, updatedBy: userId }, { new: true, runValidators: true, context: 'query' })
        .then((client) => {
            if (!client) {
                res.json({ errors: 'Not found' })
            } else {
                const clientId = client._id
                Client.findById(clientId).populate('createdBy', 'username').populate('updatedBy', 'username')
                    .then((client) => res.json(client))
                    .catch((err) => res.json(err))
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

clientControllers.destroy = async (req, res) => {
    const userId = req.user._id
    const id = req.params.id

    try {
        const contacts = await Contact.find({ client: id })
        const deletion = await contacts.forEach(async (contact) => {
            const enquiries = await Enquiry.find({ contact: contact._id })
            if (enquiries.length > 0) {
                enquiries.forEach(async (enquiry) => {
                    const deleteQuotations = await Quotation.deleteMany({ enquiry: enquiry._id })
                    const deleteEnquiries = await Enquiry.deleteMany({ contact: contact._id })
                    const deleteContacts = await Contact.deleteMany({ client: id })
                })
            } else {
                await Contact.deleteMany({ client: id })
            }
        })
        const deletedClient = await Client.findOneAndDelete({ user: userId, _id: id })
        res.json(deletedClient)
    } catch (err) {
        console.log(err)
        res.json(err)
    }

}

module.exports = clientControllers