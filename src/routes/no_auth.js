const express = require('express');
const AuthContoller = require('./../controller/authController');

var router = express.Router();
router.post("/login", AuthContoller.login);
router.post("/register", AuthContoller.register );

module.exports = router;