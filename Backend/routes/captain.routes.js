const express = require('express');
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller');

const router = express.Router();

router.post('/register',[
    body('fullName.firstName')
    .isLength({ min: 3 })
    .withMessage('First name must be at least 3 characters long'),

    body('fullName.lastName')
    .isLength({ min: 4 })
    .withMessage('Last name must be at least 4 characters long'),

    body('email')
    .isEmail()
    .withMessage('Invalid email format'),

    body('password')
    .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
    .withMessage('Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a symbol'),

    body('phoneNumber')
    .isLength({ min: 10, max: 10 })
    .withMessage('Phone number must be exactly 10 digits long'),

    body('locations.lat')
    .notEmpty()
    .withMessage('Latitude is required')
    .isFloat()
    .withMessage('Latitude must be a valid number'),

    body('locations.long')
    .notEmpty()
    .withMessage('Longitude is required')
    .isFloat()
    .withMessage('Longitude must be a valid number'),


    body('captain.license')
    .isLength({ min: 10 })
    .withMessage('License number must be at least 10 characters long'),

    body('vehicle.color')
    .isLength({ min: 3 })
    .withMessage('Vehicle color must be at least 3 characters long'),

    body('vehicle.capacity')
    .isInt({ min: 1 })
    .withMessage('Vehicle capacity must be at least 1'),

    body('vehicle.vehicleType')
    .notEmpty()
    .withMessage('Vehicle type is required')
    .isIn(['Bike', 'Car', 'Autorickshaw', 'ElectricBike'])
    .withMessage('Invalid vehicle type'),

], captainController.registerCaptain)


module.exports = router;
