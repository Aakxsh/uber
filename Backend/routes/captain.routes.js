const express = require('express');
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller');

const router = express.Router();

router.post(
    '/register',
    [
        body('firstName')
            .isString()
            .isLength({ min: 3 })
            .withMessage('First name must be at least 3 characters long.'),
        body('lastName')
            .isString()
            .isLength({ min: 3 })
            .withMessage('Last name must be at least 3 characters long.'),
        body('email')
            .isEmail()
            .withMessage('Invalid email format.'),
        body('password')
            .isString()
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long.'),
        body('phoneNumber')
            .isString()
            .isLength({ min: 10, max: 10 })
            .withMessage('Phone number must be exactly 10 digits long.'),
        body('captain.license')
            .isString()
            .isLength({ min: 10 })
            .withMessage('License number must be at least 10 characters long.'), // Updated path
        body('plate')
            .isString()
            .withMessage('Vehicle plate must be a valid string.'),
        body('color')
            .isString()
            .isLength({ min: 3 })
            .withMessage('Vehicle color must be at least 3 characters long.'),
        body('capacity')
            .isNumeric()
            .withMessage('Vehicle capacity must be a number.'),
        body('vehicleType')
            .isString()
            .isIn(['Bike', 'Car', 'Autorickshaw', 'ElectricBike'])
            .withMessage('Invalid vehicle type. Accepted types: Bike, Car, Autorickshaw, ElectricBike.'),
        body('lat')
            .notEmpty()
            .withMessage('Latitude is required.')
            .isFloat()
            .withMessage('Latitude must be a valid number.'),
        body('long')
            .notEmpty()
            .withMessage('Longitude is required.')
            .isFloat()
            .withMessage('Longitude must be a valid number.'),
    ],
    captainController.registerCaptain
);

module.exports = router;
