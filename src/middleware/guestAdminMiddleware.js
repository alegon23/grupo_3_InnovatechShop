function guestAdminMiddleware (req, res, next) {
    if (req.session.usuario && req.session.usuario.role == "admin") {
        return res.redirect('/');
    }

    next();
}

module.exports = guestAdminMiddleware;