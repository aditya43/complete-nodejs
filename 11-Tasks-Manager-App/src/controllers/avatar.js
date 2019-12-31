const multer = require('multer');

const fileUpload = multer({
    // dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    // fileFilter (req, file, cb) {
    //     if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    //         return cb(new Error('Please upload image file. Supported extensions: .jpg, .jpeg, .png'));
    //     }

    //     cb(undefined, true);
    // }
});

module.exports = fileUpload.single('avatar');
