import multer from 'multer';

const MIME_TYPE_NAME = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const isValid = MIME_TYPE_NAME[file.mimetype];
    let error = new Error('Invalid MIME Type');
    if (isValid)
      error = null;
    callback(error, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const extension = MIME_TYPE_NAME[file.mimetype];
    callback(null, name + '-' + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('postImage');