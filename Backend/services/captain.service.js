
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
      lat === undefined ||
      long === undefined
    ) {
      throw new Error('All fields are required. Please check your input.');
    }

    // Create a new captain document
    const captain = new captainModel({
      fullName: { firstName, lastName },
      email,
      password,
      phoneNumber,
      captain: { license },
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

    await captain.save();
    return captain;
  } catch (error) {
    console.error('Error creating captain:', error.message);
    throw new Error(error.message);
  }
};
