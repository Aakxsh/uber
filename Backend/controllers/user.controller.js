const { validationResult } = require('express-validator');
const userService = require('../services/user.services');
const userModel = require('../models/user.models');

module.exports.registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullName, email, password } = req.body;

        // Check if email already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                error: 'Email already exists. Please use a different email.',
            });
        }

        // Hash password
        const hashedPassword = await userModel.hashPassword(password);

        // Create new user
        const user = await userService.createUser({
            fullName: {
                firstName: fullName.firstName,
                lastName: fullName.lastName,
            },
            email,
            password: hashedPassword,
        });

        // Generate auth token
        const token = user.generateAuthToken();

        // Send success response
        return res.status(201).json({
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                error: 'Email already exists. Please use a different email.',
            });
        }

        console.error('Error in registerUser:', error.message);
        next(error);
    }
};
