function authAdminMiddleware (req, res, next) {
    if (!req.session.usuario) {
        return res.redirect('/');
    }

    if (req.session.usuario && req.session.usuario.idRoleFK != 2){
        return res.redirect('/');
    }

    next();
}

module.exports = authAdminMiddleware;