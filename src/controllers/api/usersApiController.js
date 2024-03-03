
const db = require('../../database/models');

const usersApiController = {
    list: async (req, res) => {

        try {
            const usersList = await db.User.findAll({
                attributes: {exclude: [ 'password', 'birthdate', 'avatar','idRoleFK' ]}
            })

            const users = usersList.map((user) => {
                return {
                    idUser: user.idUser,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    detalle: `/api/users/${user.idUser}`,
                }
            })

            res.json({
                meta: {
                    status: 200,
                    count: usersList.length,
                    url: req.originalUrl
                },
                users,
            })

        } catch (error){ 
            res.json({
                error: error.message
            })
        }

    },
    
    detail: async (req, res) => {
        
        try {
            const user = await db.User.findByPk(req.params.id, {
                attributes: {exclude: [ 'password', 'idRoleFK' ]}
            })

            res.json({
                meta: {
                    status: 200,
                    url: req.originalUrl
                },
                user
            })

        } catch (error) {
            res.json({
                error: error.message
            })
        }
    }
}

module.exports = usersApiController;