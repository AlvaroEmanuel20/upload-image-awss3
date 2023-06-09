const multer = require('multer');

const upload = multer({
  limits: {
    files: 1,
    fileSize: 1050000,
  },
  fileFilter(req, file, cb) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.mimetype))
      cb(new Error('Invalid file type'), false);

    cb(null, true);
  },
});

function uploadFile(req, res, next) {
  const uploadHandle = upload.single('image');
  uploadHandle(req, res, (error) => {
    if (error) {
      return res.status(400).json({
        message: error.message,
        status: 400,
      });
    }

    next();
  });
}

module.exports = uploadFile;
