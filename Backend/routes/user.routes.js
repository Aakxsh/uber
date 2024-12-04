const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controller');

router.post('/register',[
    body('email')
    .isEmail()
    .withMessage('Invalid Email'),

    body('fullName.firstName')
    .isLength({min:3})
    .withMessage('First name must be atleast 3 charachter'),

    body('fullName.lastName')
    .isLength({min:4})
    .withMessage('lastName must be atleast 4 charachter'),

    body('password')
    .isStrongPassword()
    .isLength({min:8})
    .withMessage('Password must be alteast 8 charachter')

],
userController.registerUser)


module.exports = router;