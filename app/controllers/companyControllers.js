const User = require('../models/user')
const Company = require('../models/company')

const companyControllers = {}

companyControllers.details = (req, res) => {
    const userId = req.user._id
    Company.find({ user: userId })
        .then((company) => {
            if (!company) {
                res.json({ errors: 'Not found' })
            } else {
                res.json(company)
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

companyControllers.create = (req, res) => {
    const userId = req.user._id
    User.findById(userId)
        .then((user) => {
            if (!user) {
                res.json({ errors: "Can't create" })
            } else {
                const body = req.body
                const company = new Company({ ...body, user: userId })
                company.save()
                    .then((company) => {
                        res.json(company)
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

companyControllers.update = (req, res) => {
    const userId = req.user._id
    const id = req.params.id
    const body = req.body
    Company.findOneAndUpdate({ _id: id, user: userId }, body, { new: true, runValidators: true })
        .then((company) => {
            if (!company) {
                res.json({ errors: 'Not found' })
            } else {
                res.json(company)
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

companyControllers.destroy = (req, res) => {
    const userId = req.user._id
    const id = req.params.id
    Company.findOneAndDelete({ _id: id, user: userId })
        .then((company) => {
            if (!company) {
                res.json({ errors: 'Not found' })
            } else {
                res.json(company)
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports = companyControllers