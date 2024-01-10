const path = require('path')
const usersJSON = path.join(__dirname, '../data/users.json');
const fs = require('fs');

function userLoggedMiddleware (req, res, next) {
    res.locals.usuarioLog = false;

    let allUsers = JSON.parse(fs.readFileSync(usersJSON, {encoding: 'utf-8'}))
    let userCookie = allUsers.find(user => user['email'] === req.cookies.usuarioEmail);

    if (userCookie) {
        delete userCookie.password;
        req.session.usuario = userCookie 
    }

    if (req.session.usuario) {
        res.locals.usuarioLog = req.session.usuario;
    }

    next();
}

module.exports = userLoggedMiddleware;
