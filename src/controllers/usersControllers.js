const path = require('path');
const bcryptjs = require('bcryptjs');
const users = require('../data/users');
const fs = require('fs');
const usersJSON = path.join(__dirname, '../data/users.json');
const { validationResult } = require("express-validator");

const usersController = {
    login: (req, res) =>{
        res.render(path.resolve('./', './src/views/users/login'))
    },
    
    registro: (req, res) =>{
        res.render(path.resolve('./', './src/views/users/registro'))
    },

    procesarRegistro: (req, res) =>{
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.render(path.resolve('./', './src/views/users/registro'), {errors: errors.mapped(), oldData: req.body});
        }

        let {nombre, fecha, apellido, contrasenia, email} = req.body;
        const generateId = () => {
            let allUsers = JSON.parse(fs.readFileSync(usersJSON, {encoding: 'utf-8'}));
            let lastUser = allUsers.pop();
            if (lastUser) {
                return lastUser.id + 1;
            }
            return 1;
        }

        let nuevoUsuario = {
            id: generateId(),
            firstName: nombre,
            lastName: apellido,
            email: email,
            password: bcryptjs.hashSync(contrasenia, 10),
            birthdate: fecha,
            avatar: !req.file ? "/images/users/default.png" : "/images/users/" + req.file.filename,
            role: "user"
        }
        users.push(nuevoUsuario);

        fs.writeFileSync(usersJSON, JSON.stringify(users, null, ' '));

        res.redirect('/');

    },

    procesarLogin: (req, res) =>{
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.render(path.resolve('./', './src/views/users/login'), {errors: errors.mapped(), oldData: req.body});
        }

        let allUsers = JSON.parse(fs.readFileSync(usersJSON, {encoding: 'utf-8'}))
        
        for (let index = 0; index < allUsers.length; index++) {
            if (req.body.email == allUsers[index].email && bcryptjs.compareSync(req.body.contrasenia, allUsers[index].password)) {
                res.redirect('/');
            }
        }

        return res.render(path.resolve('./', './src/views/users/login'), {errors: {email: {msg: 'Las credenciales son inválidas'}}, oldData: {email: req.body.email}})
    }
}


module.exports = usersController;