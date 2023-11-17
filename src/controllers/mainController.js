const path = require('path');

const mainController = {
    index: (req, res) =>{
        res.render(path.resolve('./', './src/views/main/index'));
    }
}

module.exports = mainController;