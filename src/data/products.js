const fs = require('fs');

const productsJSON = fs.readFileSync(__dirname + '/products.json', 'utf-8');

const productsParseado = JSON.parse(productsJSON);

module.exports = productsParseado;