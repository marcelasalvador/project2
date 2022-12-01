const isLoggedIn = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/auth-views/login')
    } else {
        next()
    }
}

module.exports = isLoggedIn