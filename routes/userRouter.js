const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController.js");

router.get('/register', userController.registerPage);
router.post('/add', userController.addUser);

module.exports = router;

