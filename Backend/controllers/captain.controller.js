const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            captain: { license } = {},
            plate,
            color,
            capacity,
            vehicleType,
            lat,
            long,
        } = req.body;

        if (!firstName || !lastName || !license || !vehicleType || !lat || !long) {
            return res.status(400).json({
                error: `Missing required fields: ${[
                    !firstName && 'firstName',
                    !lastName && 'lastName',
                    !license && 'license',
                    !vehicleType && 'vehicleType',
                    !lat && 'lat',
                    !long && 'long',
                ]
                    .filter(Boolean)
                    .join(', ')}`,
            });
        }

        const existingCaptain = await captainModel.findOne({ $or:[{email },{'captain.licence': license},
            {'vehicle.plate':plate},
            {phoneNumber}
        ] });
        if (existingCaptain) {
            return res.status(400).json({ error: 'Email, license, plate or phoneNumber already exists.' });
        }

        const hashedPassword = await captainModel.hashPassword(password);
        const captain = await captainService.createCaptain({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phoneNumber,
            license,
            plate,
            color,
            capacity,
            vehicleType,
            lat,
            long,
        });

        const token = captain.generateAuthToken();

        res.status(201).json({
            message: 'Captain registered successfully',
            token,
            captain: {
                id: captain._id,
                fullName: captain.fullName,
                email: captain.email,
            },
        });
    } catch (error) {
        console.error('Error in registerCaptain:', error.message);
        res.status(500).json({ error: error.message });
    }
};
