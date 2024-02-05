const path = require('path');
const bcryptjs = require('bcryptjs');
const users = require('../data/users');
const fs = require('fs');
const usersJSON = path.join(__dirname, '../data/users.json');
const { validationResult } = require("express-validator");
const db = require('../database/models');

const usersController = {
    login: (req, res) =>{
        res.render(path.resolve('./', './src/views/users/login'))
    },
    
    registro: (req, res) =>{
        res.render(path.resolve('./', './src/views/users/registro'))
    },

    procesarRegistro: async (req, res) =>{
        try {
            const errors = validationResult(req);
        
            if (!errors.isEmpty()) {
                return res.render(path.resolve('./', './src/views/users/registro'), {errors: errors.mapped(), oldData: req.body});
            }

            let {nombre, fecha, apellido, contrasenia, email} = req.body;

            const foundUser = await db.User.findOne({
                where: {email: req.body.email},
            })
            
            if (foundUser.length > 0) {
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
                firstName: nombre,
                lastName: apellido,
                email: email,
                password: bcryptjs.hashSync(contrasenia, 10),
                birthdate: fecha,
                avatar: !req.file ? "/images/users/default.png" : "/images/users/" + req.file.filename,
                idRoleFK: 1,
            }

            await db.User.create(nuevoUsuario)
    
            res.redirect('/users/login');

        } catch (error) {
            res.send(error)
        }
    },

    procesarLogin: async (req, res) =>{
        try {
            const errors = validationResult(req);
        
            if (!errors.isEmpty()) {
                return res.render(path.resolve('./', './src/views/users/login'), {errors: errors.mapped(), oldData: req.body});
            }

            const foundUser = await db.User.findOne({
                where: {email: req.body.email},
            })

            if (foundUser) {
                let isPassOK = bcryptjs.compareSync(req.body.contrasenia, foundUser.password);
                if (isPassOK){
                    delete foundUser.password;
                    req.session.usuario = foundUser;
                    if (req.body.recuerdame){
                        res.cookie('usuarioEmail', req.body.email, { maxAge: (1000 * 60) * 60});
                    }

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
        } catch (error) {
            res.send(error)
        }
        
    },

    mostrarPerfil: async (req, res) =>{
        const usuario = req.session.usuario
        const idUser = usuario.idUser;
        try {
            const data = await db.User.findOne({
                where: { idUser: idUser }
            })
            res.render(path.resolve('./', './src/views/users/perfil'), {user: data})
            //res.json(data)
        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
    },

    eliminarPerfil: async (req, res) =>{
        const usuario = req.session.usuario
        const idUser = usuario.idUser;
        try {
            await db.User.destroy({
                where: { idUser: idUser }
            })
            req.session.destroy();
            res.clearCookie('usuarioEmail')
            res.redirect('/')
        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
    },

    //! HASTA AQUI
    editarPerfil: (req, res) =>{ 
        const userId = users.find(user => user.id == req.params.id);
        res.render(path.resolve('./', './src/views/users/editarPerfil'), {userId})
    },

    actualizarPerfil: (req, res) =>{ 
        const userId = users.find(user => user.id == req.params.id);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render(path.resolve('./', './src/views/users/editarPerfil'), {errors: errors.mapped(), oldData: req.body, userId});
        }

        let {nombre, apellido, fecha, contraseniaActual, nuevaContrasenia, confirmarContrasenia} = req.body;
        const indexUser = users.findIndex((user) => user.id == req.params.id)
        let isPassOK = bcryptjs.compareSync(contraseniaActual, userId.password);
        if (!isPassOK) {
            return res.render(path.resolve('./', './src/views/users/editarPerfil'), {
                errors: {
                    contraseniaActual: {
                        msg: 'Contraseña incorrecta',
                    }
                },
                oldData: req.body,
                userId
            });
        }

        if (nuevaContrasenia) {
            if (!confirmarContrasenia) {
                return res.render(path.resolve('./', './src/views/users/editarPerfil'), {
                    errors: {
                        confirmarContrasenia: {
                            msg: 'Debes confirmar la contraseña nueva',
                        },
                    },
                    oldData: req.body,
                    userId
                });
            } else {
                if (nuevaContrasenia != confirmarContrasenia) {
                    return res.render(path.resolve('./', './src/views/users/editarPerfil'), {
                        errors: {
                            nuevaContrasenia: {
                                msg: 'Las contraseñas no coinciden',
                            },
                        },
                        oldData: req.body,
                        userId
                    });
                }
            }
        }
        if (indexUser != -1) {
            users[indexUser].firstName = nombre
            users[indexUser].lastName = apellido
            users[indexUser].birthdate = fecha
            users[indexUser].avatar = !req.file ? userId.avatar : "/images/users/" + req.file.filename
            users[indexUser].password = nuevaContrasenia ? bcryptjs.hashSync(nuevaContrasenia, 10) : bcryptjs.hashSync(contraseniaActual, 10)

            fs.writeFileSync(usersJSON, JSON.stringify(users, null, ' '));

            req.session.destroy();
            res.clearCookie('usuarioEmail')

            res.redirect('/users/login')
        } else {
            res.send('Usuario no encontrado');
        }
    },

    registroAdmin: (req, res) =>{
        res.render(path.resolve('./', './src/views/users/registroAdmin'))
    },

    procesarAdmin: (req, res) =>{
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.render(path.resolve('./', './src/views/users/registroAdmin'), {errors: errors.mapped(), oldData: req.body});
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
           return res.render(path.resolve('./', './src/views/users/registroAdmin'), {
                errors: {
                    email: {
                        msg: 'Este email ya está registrado como usuario'
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

        return res.render(path.resolve('./', './src/views/users/registroAdmin'), {mensaje: nombre + " " + apellido + " ha sido dado de alta con éxito!"});
    },

    logout: (req, res) =>{
        req.session.destroy();
        res.clearCookie('usuarioEmail')
        return res.redirect('/');
    }
}

module.exports = usersController;
