const Client = require('../models/client')
const Contact = require('../models/contact')

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

clientControllers.destroy = (req, res) => {
    const id = req.params.id

    Client.findOneAndDelete({ _id: id })
        .then((client) => {
            if (!client) {
                res.json({ errors: 'Not found' })
            } else {
                Contact.deleteMany({ client: client._id })
                    .then(() => {
                        res.json(client)
                    })
                    .catch((err) => {
                        res.json(err)
                    })
            }
        })
        .catch((err) => {
            res.json(err)
        })

}

module.exports = clientControllers