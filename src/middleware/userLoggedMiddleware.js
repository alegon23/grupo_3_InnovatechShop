function userLoggedMiddleware (req, res, next) {
    res.locals.usuarioLog = false;

    if (req.session.usuario) {
        res.locals.usuarioLog = true;
        res.locals.usuarioLog = req.session.usuario;
    }

    next();
}

module.exports = userLoggedMiddleware;