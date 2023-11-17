const path = require('path');

const usersController = {
    login: (req, res) =>{
        res.sendFile(path.resolve('./', './src/views/users/login.html'))
    },
    
    registro: (req, res) =>{
        res.sendFile(path.resolve('./', './src/views/users/registro.html'))
    },
}

module.exports = usersController;