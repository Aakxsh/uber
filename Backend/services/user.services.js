const { body } = require('express-validator');
const { emit } = require('../app');
const userModel = require('../models/user.models');

module.exports.createUser = async ({ fullName, email, password }) => {
    // Ensure required fields are provided
    if (!fullName || !email || !password) {
        throw new Error('All fields are required.');
    }

    // Create and save the user
    const user = await userModel.create({
        fullName: {
            firstName: fullName.firstName,
            lastName: fullName.lastName,
        },
        email,
        password,
    });

    return user;
};

