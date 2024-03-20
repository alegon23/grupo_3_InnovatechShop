const path = require('path');
const bcryptjs = require('bcryptjs');
const { validationResult } = require("express-validator");
const db = require('../database/models');
const fs = require('fs')

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
                if (req.file) {
                    fs.unlinkSync(req.file.path)
                }
                return res.render(path.resolve('./', './src/views/users/registro'), {errors: errors.mapped(), oldData: req.body});
            }

            let {nombre, fecha, apellido, contrasenia, email} = req.body;

            const foundUser = await db.User.findOne({
                where: {email: req.body.email},
            })
            
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
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
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
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
        
    },

    mostrarPerfil: async (req, res) =>{
        const usuario = req.session.usuario
        const idUser = usuario.idUser;
        try {
            const data = await db.User.findOne({
                where: { idUser: idUser }
            })

            const categorias = await db.Category.findAll({})

            res.render(path.resolve('./', './src/views/users/perfil'), {user: data, categorias: categorias})
         
        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
    },

    eliminarPerfil: async (req, res) =>{
        const usuario = req.session.usuario
        const idUser = req.params.id;
        try {
            if (idUser == usuario.idUser) {
                const user = await db.User.findOne({
                    where: {
                        idUser: idUser
                    }
                })
            
                if (user.avatar != "/images/users/default.png") {
                    const url = 'src\\public' + user.avatar.replace('/', '\\')
                    fs.unlinkSync(url)
                }

                await db.User.destroy({
                    where: { idUser: idUser }
                })
                req.session.destroy();
                res.clearCookie('usuarioEmail')
                res.redirect('/')
            } else {
                res.redirect('/')
            }

        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
    },
    
    editarPerfil: async (req, res) =>{ 
        const usuario = req.session.usuario
        const idUser = usuario.idUser;
        
        try {
            const foundUser = await db.User.findByPk(idUser);      
            res.render(path.resolve('./', './src/views/users/editarPerfil'), {foundUser})
        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
    },

    actualizarPerfil:async (req, res) =>{ 
        const usuario = req.session.usuario
        const idUser = req.params.id;
        
        try {
            if (idUser == usuario.idUser) {
                const foundUser = await db.User.findByPk(idUser)

                const errors = validationResult(req);

                if (!errors.isEmpty()) {
                    if (req.file) {
                        fs.unlinkSync(req.file.path)
                    } 
                    return res.render(path.resolve('./', './src/views/users/editarPerfil'), {errors: errors.mapped(), oldData: req.body, foundUser});
                }

                let {nombre, apellido, fecha, contraseniaActual, nuevaContrasenia, confirmarContrasenia} = req.body;
            
                let isPassOK = bcryptjs.compareSync(contraseniaActual, foundUser.password);
                if (!isPassOK) {
                    return res.render(path.resolve('./', './src/views/users/editarPerfil'), {
                        errors: {
                            contraseniaActual: {
                                msg: 'Contraseña incorrecta',
                            }
                        },
                        oldData: req.body,
                        foundUser
                    });
                }

                if (nuevaContrasenia) {
                    if (nuevaContrasenia == contraseniaActual) {
                        return res.render(path.resolve('./', './src/views/users/editarPerfil'), {
                            errors: {
                                nuevaContrasenia: {
                                    msg: 'La nueva contraseña coincide con la actual',
                                },
                            },
                            oldData: req.body,
                            foundUser
                        });
                    } else {
                        if (!confirmarContrasenia) {
                            return res.render(path.resolve('./', './src/views/users/editarPerfil'), {
                                errors: {
                                    confirmarContrasenia: {
                                        msg: 'Debes confirmar la contraseña nueva',
                                    },
                                },
                                oldData: req.body,
                                foundUser
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
                                    foundUser
                                });
                            }
                        }
                    }
                };


                if(foundUser!=null){

                    if (req.file && req.file != foundUser.avatar) {
                        if (foundUser.avatar != "/images/users/default.png") {
                            const url = 'src\\public' + foundUser.avatar.replace('/', '\\')
                            fs.unlinkSync(url)
                        }
                    }

                    db.User.update({
                        firstName : nombre,
                        lastName : apellido,
                        birthdate : fecha,
                        avatar : !req.file ? foundUser.avatar : "/images/users/" + req.file.filename,
                        password : nuevaContrasenia ? bcryptjs.hashSync(nuevaContrasenia, 10) : bcryptjs.hashSync(contraseniaActual, 10)
            
                    },
                    {
                        where: {idUser: foundUser.idUser }
                    });


                    req.session.destroy();
                    res.clearCookie('usuarioEmail');
            
                    res.redirect('/users/login');

                }else{
                    res.send('Usuario no encontrado');

                }

            } else {
                res.redirect('/')
            }

        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
            
        }
    },

    mostrarMenu:  (req, res) => {
        res.render(path.resolve('./', './src/views/users/menuAdmin'))
    },

    registroAdmin: (req, res) =>{
        res.render(path.resolve('./', './src/views/users/registroAdmin'))
    },

    procesarAdmin: async (req, res) =>{
        try {
            const errors = validationResult(req);
        
             if (!errors.isEmpty()) {
                return res.render(path.resolve('./', './src/views/users/registroAdmin'), {errors: errors.mapped(), oldData: req.body});
            }

            let {nombre, apellido, contrasenia, email} = req.body;

            const foundUser = await db.User.findOne({
                where: {email: req.body.email},
            })

            if (foundUser!=null) {
               return res.render(path.resolve('./', './src/views/users/registroAdmin'), {
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
                password: contrasenia ? bcryptjs.hashSync(contrasenia, 10) : bcryptjs.hashSync("Admin123", 10),
                birthdate: "2000-01-01",
                avatar: "/images/users/default.png" ,
                idRoleFK: 2,
            }

            await db.User.create(nuevoUsuario)

            return res.render(path.resolve('./', './src/views/users/registroAdmin'), {mensaje: nombre + " " + apellido + " ha sido dado de alta con éxito!"});

        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
    },

    logout: (req, res) =>{
        req.session.destroy();
        res.clearCookie('usuarioEmail')
        return res.redirect('/');
    },

    validateEmail: async (req, res) => {

        try {
            const email = req.params.email;
            const respuesta = await db.User.findOne({
                where: {email: email}
            })

            if (respuesta) {
                res.json({
                    existe: true,
                })
            } else {
                res.json({
                    existe: false,
                })
            }
        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
    },

    botonesBorrar: async (req, res) => {
        let marca = []
        let categoria = [];
        let caracteristica = []

        try {
            const brandList = await db.Brand.findAll()
            
            for (let i = 0; i < brandList.length; i++) {
                const cantidad = await db.Product.count({
                    where: {
                        idBrandFK: brandList[i].idBrand
                    }
                })

                if (cantidad == 0) {
                    marca.push({
                        id: brandList[i].idBrand,
                        brandName: brandList[i].brandName
                    })
                }
            }

            const categoryList = await db.Category.findAll()

            for (let i = 0; i < categoryList.length; i++) {
                const cantidad = await db.Product.count({
                    where: {
                        idCategoryFK: categoryList[i].idCategory
                    }
                })

                if (cantidad == 0) {
                    categoria.push({
                        id: categoryList[i].idCategory,
                        categoryName: categoryList[i].categoryName
                    })
                }
            }

            const featureList = await db.Feature.findAll()

            for (let i = 0; i < featureList.length; i++) {
                const cantidad = await db.ProductFeature.count({
                    where: {
                        idFeatureFK: featureList[i].idFeature
                    }
                })

                if (cantidad == 0) {
                    caracteristica.push({
                        id: featureList[i].idFeature,
                        featureName: featureList[i].feature,
                    })
                }
            }

            return res.render(path.resolve('./', './src/views/products/botonesBorrar'), {caracteristicas: caracteristica, marcas: marca, categorias: categoria});
            
        } catch (error) {
            res.render(path.resolve('./', './src/views/main/error'), {mensaje: error});
        }
    }
}

module.exports = usersController;
