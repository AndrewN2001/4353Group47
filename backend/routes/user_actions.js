const express = require('express')
const router = express.Router();
const userController = require('../controllers/user_controller');

router.post('/login', userController.handleLogin);
router.post('/register', userController.handleRegister);
router.get('/profile/:userID', userController.getUserProfile);
router.patch('/notifications/:userID', userController.handleNotifications);
router.get('/volunteer-history/:userID', userController.getVolunteerHistory);
router.get('/volunteer-matching', userController.handleMatching);
router.get('/data', userController.getData);
router.post('/eventapply', userController.EventSignUp);
router.get('/eventsattending', userController.getEvents);
router.put('/:userID/addSkill', userController.addSkill);
router.delete('/:userID/removeSkill/:skill', userController.removeSkill);
router.put('/:userID/editInfo', userController.editUserInfo)
router.put('/:userID/editAvailability', userController.editAvailability);

module.exports = router;