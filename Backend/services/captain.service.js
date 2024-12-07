const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    license,
    plate,
    color,
    capacity,
    vehicleType,
    lat,
    long,
}) => {
    try {
        // Check for missing fields
        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !phoneNumber ||
            !license ||
            !plate ||
            !color ||
            !capacity ||
            !vehicleType ||
            !lat ||
            !long
        ) {
            throw new Error('All fields are required');
        }

        // Create a new captain document
        const captain = await captainModel.create({
            fullName: {
                firstName,
                lastName,
            },
            email,
            password,
            phoneNumber,
            captain: {
                license,
            },
            vehicle: {
                vehicleType,
                color,
                capacity,
                plate,
            },
            locations: {
                lat,
                long,   
            },
        });

        return captain;
    } catch (error) {
        console.error('Error creating captain:', error.message);
        throw error;
    }
};
