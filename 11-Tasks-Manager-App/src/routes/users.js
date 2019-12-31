const express = require('express');
const userController = require('../controllers/user');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');

const router = new express.Router();

router.post('/users', userController.add);
router.get('/users/me', authMiddleware, userController.get);
router.get('/users/:id', userController.find);
router.patch('/users/me', authMiddleware, userController.update);
router.delete('/users/me', authMiddleware, userController.delete);
router.post('/users/login', userController.login);
router.post('/users/logout', authMiddleware, userController.logout);
router.post('/users/logoutAll', authMiddleware, userController.logoutAll);

const upload = multer({
    dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter (req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('Please upload a word document'));
        }

        cb(undefined, true);
    }
});
router.post('/users/me/avatar', upload.single('avatar'), userController.setAvatar);

module.exports = router;
