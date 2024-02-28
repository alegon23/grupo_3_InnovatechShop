
const db = require('../../database/models');

const productsApiController = {
    list: async (req, res) => {

        try {
            


        } catch (error){ 
            res.json({
                error: error.message
            })
        }

    },
    
    detail: async (req, res) => {
        
        try {
            


        } catch (error) {
            res.json({
                error: error.message
            })
        }
    }
}

module.exports = productsApiController;