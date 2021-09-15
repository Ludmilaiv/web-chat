const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController.js");

router.get('/register', userController.registerPage);
router.get('/authorization', userController.authorizationPage);
router.post('/login', userController.login);
router.post('/add', userController.addUser);

module.exports = router;

