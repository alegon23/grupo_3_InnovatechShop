
const db = require('../../database/models');

const usersApiController = {
    list: async (req, res) => {

        try {
            const users = await db.User.findAll({
                attributes: {exclude: [ 'password', 'birthdate', 'avatar','idRoleFK' ]}
            })

            const userDetail = users.map((user) => {
                return {
                    user,
                    detalle: `/api/users/${user.idUser}`,
                }
            })

            res.json({
                meta: {
                    status: 200,
                    count: users.length,
                    url: req.originalUrl
                },
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
                data: {
                    user
                }
            })

        } catch (error) {
            res.json({
                error: error.message
            })
        }
    }
}

module.exports = usersApiController;