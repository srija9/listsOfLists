const express = require('express');

const User = require('../models/user');
const authController = require('../controllers/auth');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.put('/signup',authController.signup);

router.post('/login', authController.login);

module.exports = router;