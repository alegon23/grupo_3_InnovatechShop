const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/images/products");
  },
  filename: function (req, file, cb) {
    cb(null, `img-${Math.floor(Math.random() * 9999999)}${path.extname(file.originalname)}`);
  },
});

const uploadImg = multer({storage});

module.exports = uploadImg;