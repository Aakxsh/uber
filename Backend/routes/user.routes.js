const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware')
const blacklistedTokenModel = require('../models/blacklistToken.model')

// Register User
router.post('/register',[
    body('email')
    .isEmail()
    .withMessage('Invalid Email'),

    body('fullName.firstName')
    .isLength({min:3})
    .withMessage('First name must be atleast 3 charachter'),

    body('fullName.lastName')
    .isLength({min:4})
    .withMessage('LastName must be atleast 4 charachter'),

    body('password')
    .isStrongPassword()
    .isLength({min:8})
    .withMessage('Password must be strong (alteast 8 charachter) include upper/lowercase, number, and symbol')

],
userController.registerUser)

// userLogin
router.post('/login',[
    body('email')
    .isEmail()
    .withMessage('Invalid Email'),

    body('password')
    .isLength({min:8})
    .withMessage('Password should be atleat 8 charachter')

],userController.logInUser);

// userProfile
router.get('/profile',authMiddleware.authUser, userController.getUserProfile);

//userlogOut
router.get('/logout',authMiddleware.authUser,
    userController.logoutUser);


module.exports = router;