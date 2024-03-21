
const db = require('../../database/models');

const usersApiController = {
    //lista todos los usuarios
    list: async (req, res) => {

        try {
            //se traen todos los usuarios en la bd, excluyendo determindos atributos
            const users = await db.User.findAll({
                attributes: {exclude: [ 'password', 'birthdate', 'avatar','idRoleFK' ]}
            })
            //se hace un map sobre los usuarios traidos, para obtener un array de objetos compuestos
            //por la info del usuario y una url para su detalle
            const userDetail = users.map((user) => {
                return {
                    user,
                    detalle: `/api/users/${user.idUser}`,
                }
            })


            res.json({
                meta: {
                    status: 200,
                    //cantidad de usuario en la bd
                    count: users.length,
                    url: req.originalUrl
                },
                //contien un objeto formado por objetos que contien la informacion de los usuarios
                data: {

                    ...userDetail,

                }
            })

        } catch (error){ 
            res.json({
                error: error.message
            })
        }

    },
    //detalle del usuario
    detail: async (req, res) => {
        
        try {
            //se hace un findByPk para traer el primer usuario que coincida con el id enviado,
            //no se incluyen atributos sensibles
            const user = await db.User.findByPk(req.params.id, {
                attributes: {exclude: [ 'password', 'idRoleFK' ]}
            })
            //se controla que user no venga vacio
            if(user){
                res.json({
                    meta: {
                        status: 200,
                        url: req.originalUrl
                    },
                    //contien la informacion del unico usuario traido
                    data: {
                        user
                    }
                })
            }else{
                throw new Error("Usuario inexistente");
            }

           

        } catch (error) {
            res.json({
                error: error.message
            })
        }
    }
}

module.exports = usersApiController;