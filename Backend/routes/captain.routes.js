const express = require('express');
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();


//captain registration
router.post(
    '/register',
    [
        body('firstName')
        .isString()
        .isLength({ min: 3 })
        .withMessage('First name must be at least 3 characters long'),

        body('lastName')
        .isString()
        .isLength({ min: 3 })
        .withMessage('Last name must be at least 3 characters long'),

        body('email')
        .isEmail()
        .withMessage('Invalid email address'),

        body('password')
        .isString()
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),

        body('phoneNumber')
        .isString()
        .isLength({ min: 10, max: 10 })
        .withMessage('Phone number must be 10 digits'),

        body('captain.license')
        .notEmpty()
        .isString()
        .isLength({ min: 10 })
        .withMessage('License must be at least 10 characters'),

        body('vehicle.color')
        .isString().isLength({ min: 3 })
        .withMessage('Vehicle color must be at least 3 characters long'),

        body('vehicle.vehicleType')
        .isString()
        .isIn(['Bike', 'Car', 'Autorickshaw', 'ElectricBike'])
        .withMessage('Invalid vehicle type'),

        body('vehicle.plate')
        .isString()
        .withMessage('Vehicle plate must be provided'),

        body('lat')
        .isFloat()
        .withMessage('Latitude must be a valid number'),

        body('long')
        .isFloat()
        .withMessage('Longitude must be a valid number'),
    ],
    captainController.registerCaptain // Correctly referenced callback
);


//captain login
router.post('/login',[
    body('email')
    .isEmail()
    .withMessage('Invalid email format'),

    body('password')
    .isLength({min:8})
    .withMessage('Password must be at Least 8 charachter long')
], captainController.loginCaptain);



// captain profile
router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile)



// //update captain profile
// router.patch('/profile',[
//     body('firstName')
//     .isString()
//     .isLength({min:3})
//     .withMessage('First name must be atleast 3 charachter long'),

//     body('lastName')
//     .isString()
//     .isLength({min:4})
//     .withMessage('Last name must be atleast 4 charachter long'),


// ],
//      authMiddleware.authCaptain, captainController.updateCaptainProfile);







module.exports = router;