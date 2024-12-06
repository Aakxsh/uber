const captainModel = require('../models/captain.model');
const userModel = require('../models/user.models');
const captainService  = require('../services/captain.service')
const {validationResult}  = require('express-validator');


//Register Captain
module.exports.registerCaptain = async (req, res, next) => {
    try {
        // Validate the request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            fullName: { firstName, lastName } = {},
            email,
            password,
            phoneNumber,
            captain: { license } = {},
            vehicle: { vehicleType, color, capacity, plate } = {},
            locations:{lat,long} = {},
        } = req.body;

        // Check for missing fields
        if (!firstName || !lastName || !license || !vehicleType ||!lat || !long) {
            return res.status(400).json({
                error: `Missing required fields: ${[
                    !firstName && 'firstName',
                    !lastName && 'lastName',
                    !license && 'license',
                    !vehicleType && 'vehicleType',
                    !lat && 'locations.lat',
                    !long && 'locations.long',
                ]
                    .filter(Boolean)
                    .join(', ')}`,
            });
        }

        // Check if email already exists
        const existingCaptain = await captainModel.findOne({ email });
        if (existingCaptain) {
            return res.status(400).json({ error: 'Captain already exists' });
        }

        // Hash the password
        const hashedPassword = await captainModel.hashPassword(password);

        // Create new captain
        const captain = await captainService.createCaptain({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phoneNumber,
            license,
            vehicleType,
            color,
            capacity,
            plate,
            lat,
            long,
        });

        // Generate auth token
        const token = captain.generateAuthToken();

        // Send response
        return res.status(201).json({
            message: 'Captain registered successfully',
            token,
            captain: {
                id: captain._id,
                fullName: captain.fullName,
                email: captain.email,
            },
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Email or license already exists.' });
        }

        console.error('Error in registerCaptain:', error.message);
        return res.status(500).json({ error: error.message });
    }
};
