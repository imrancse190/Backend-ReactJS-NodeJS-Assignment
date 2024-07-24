const express = require('express');
const { registerUser, loginUser, updateUser, updateUserPhoto, deleteUser, upload } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/update', auth, updateUser);
router.put('/photo', auth, upload.single('photo'), updateUserPhoto);
router.delete('/delete', auth, deleteUser);

module.exports = router;
