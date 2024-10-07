const express = require('express')
const router = express.Router();
const userController = require('../controllers/user_controller');

router.post('/login', userController.handleLogin);
router.post('/register', userController.handleRegister);
router.get('/profile/:userID', userController.getUserProfile);

module.exports = router;