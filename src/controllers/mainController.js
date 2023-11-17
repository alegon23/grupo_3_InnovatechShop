const path = require('path');

const mainController = {
    index: (req, res) =>{
        res.sendFile(path.resolve('./', './src/views/main/index.html'));
    }
}

module.exports = mainController;