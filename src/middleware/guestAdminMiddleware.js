function guestAdminMiddleware (req, res, next) {
    if (req.session.usuario && req.session.usuario.role == 2) {
        return res.redirect('/');
    }

    next();
}

module.exports = guestAdminMiddleware;