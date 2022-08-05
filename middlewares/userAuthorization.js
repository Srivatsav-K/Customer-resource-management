const authorizeUser = (req, res, next) => {
    if (req.user.role !== 'admin') {
        res.json({ errors: { notice: 'Access denied! Contact your admin!' } }).status(401)
    } else {
        next()
    }
}

module.exports = { authorizeUser }