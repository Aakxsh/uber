const bcrypt = require('bcrypt');
const captainModel = require('../models/captain.model');


// Create Captain Function
// module.exports.createCaptain = async ({
//     firstName,
//     lastName,
//     email,
//     password,
//     phoneNumber,
//     plate,
//     color,
//     capacity,
//     license,
//     vehicleType,
// }) => {
//     try {
//         // Validate input fields
//         if (
//             !firstName ||
//             !lastName ||
//             !email ||
//             !password ||
//             !phoneNumber ||
//             !plate ||
//             !color ||
//             !capacity ||
//             !license||
//             !vehicleType
//         ) {
//             throw new Error('All aakash are required');
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create the captain
//         const captain = await captainModel.create({
//             fullName: {
//                 firstName,
//                 lastName,
//             },
//             email,
//             password: hashedPassword,
//             phoneNumber,
//             vehicle: {
//                 color,
//                 plate,
//                 vehicleType,
//                 capacity,
//             },
//         });

//         return captain;
//     } catch (error) {
//         console.error('Error creating captain:', error.message);
//         throw error; // Re-throw error to handle in the calling function
//     }
// };




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
        // Identify missing fields
        const missingFields = [];
        if (!firstName) missingFields.push('firstName');
        if (!lastName) missingFields.push('lastName');
        if (!email) missingFields.push('email');
        if (!password) missingFields.push('password');
        if (!phoneNumber) missingFields.push('phoneNumber');
        if (!license || license.length < 10) missingFields.push('license');
        if (!plate) missingFields.push('plate');
        if (!color) missingFields.push('color');
        if (!capacity) missingFields.push('capacity');
        if (!vehicleType) missingFields.push('vehicleType');
        if (!lat) missingFields.push('locations.lat');
        if (!long) missingFields.push('locations.long');

        if (missingFields.length > 0) {
            throw new Error(`Missing fields: ${missingFields.join(', ')}`);
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the captain
        const captain = await captainModel.create({
            fullName: {
                firstName,
                lastName,
            },
            email,
            password: hashedPassword,
            phoneNumber,
            captain: {
                license,
            },
            vehicle: {
                color,
                plate,
                vehicleType,
                capacity,
            },
            locations: {
                lat,
                long,
            },
        });

        return captain;
    } catch (error) {
        console.error('Error creating captain:', error.message);
        throw error; // Re-throw error to handle in the calling function
    }
};
