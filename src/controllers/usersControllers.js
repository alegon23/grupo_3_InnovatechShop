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

        let allUsers = JSON.parse(fs.readFileSync(usersJSON, {encoding: 'utf-8'}))
        let foundUser = allUsers.find(user => user['email'] === req.body.email);
    
        if (foundUser) {
            return res.render(path.resolve('./', './src/views/users/registro'), {
                errors: {
                    email: {
                        msg: 'Este email ya está registrado'
                    }
                },
                oldData: req.body
            });
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

        res.redirect('/users/login');

    },

    procesarLogin: (req, res) =>{
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.render(path.resolve('./', './src/views/users/login'), {errors: errors.mapped(), oldData: req.body});
        }

        let allUsers = JSON.parse(fs.readFileSync(usersJSON, {encoding: 'utf-8'}))
        let foundUser = allUsers.find(user => user['email'] === req.body.email);

        if (foundUser) {
            let isPassOK = bcryptjs.compareSync(req.body.contrasenia, foundUser.password);
            if (isPassOK){
                delete foundUser.password;
                req.session.usuario = foundUser;

                return res.redirect('/');
            }
            return res.render(path.resolve('./', './src/views/users/login'), {
                errors: {
                    email: {
                        msg: 'Las credenciales son inválidas',
                    }
                },
                oldData: {email: req.body.email}
            });
        }

        return res.render(path.resolve('./', './src/views/users/login'), {
            errors: {
                email: {
                    msg: 'El email no esta conectado a una cuenta existente. Registresé'
                }
            },
            oldData: {email: req.body.email}
        });
    },

    mostrarPerfil: (req, res) =>{
        res.render(path.resolve('./', './src/views/users/perfil'), {usuario: req.session.usuario})
    },

    registroAdmin: (req, res) =>{
        res.render(path.resolve('./', './src/views/users/registroAdmin'))
    },

    procesarAdmin: (req, res) =>{
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            res.render(path.resolve('./', './src/views/users/registroAdmin'), {errors: errors.mapped(), oldData: req.body});
        }

        let {nombre, apellido, contrasenia, email} = req.body;
        
        const generateId = () => {
            let allUsers = JSON.parse(fs.readFileSync(usersJSON, {encoding: 'utf-8'}));
            let lastUser = allUsers.pop();
            if (lastUser) {
                return lastUser.id + 1;
            }
            return 1;
        }

        let allUsers = JSON.parse(fs.readFileSync(usersJSON, {encoding: 'utf-8'}))
        let foundUser = allUsers.find(user => user['email'] === req.body.email);
    
        if (foundUser) {
            res.render(path.resolve('./', './src/views/users/registroAdmin'), {
                errors: {
                    email: {
                        msg: 'Este email ya está registrado'
                    }
                },
                oldData: req.body
            });
        }

        let nuevoUsuario = {
            id: generateId(),
            firstName: nombre,
            lastName: apellido,
            email: email,
            password: contrasenia ? bcryptjs.hashSync(contrasenia, 10) : bcryptjs.hashSync("Admin123", 10),
            birthdate: "2000-01-01",
            avatar: "/images/users/default.png",
            role: "admin"
        }
        users.push(nuevoUsuario);

        fs.writeFileSync(usersJSON, JSON.stringify(users, null, ' '));

        res.render(path.resolve('./', './src/views/users/registroAdmin'), {mensaje: nombre + " " + apellido + " ha sido dado de alta con éxito!"});
    },

    logout: (req, res) =>{
        req.session.destroy();
        return res.redirect('/');
    }
}

module.exports = usersController;
