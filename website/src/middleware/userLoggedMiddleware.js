const path = require('path')
const db = require('../database/models');

function userLoggedMiddleware (req, res, next) {
    res.locals.usuarioLog = false;

    if (req.cookies && req.cookies.usuarioEmail) {
        db.User.findOne({
            where: {email: req.cookies.usuarioEmail},
        }).then(userCookie => {
            if (userCookie) {
                delete userCookie.password;
                req.session.usuario = userCookie 
            }
        }).catch(error => {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        })
    }

    if (req.session.usuario) {
        res.locals.usuarioLog = req.session.usuario;
    }

    next();
}

module.exports = userLoggedMiddleware;
