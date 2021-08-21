const express = require('express');
const router = express.Router();
const homeController = require("../controllers/homeController.js");

router.get('/', homeController.index);
router.get('/about', homeController.about);

module.exports = router;

