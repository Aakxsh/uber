const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//register captain
module.exports.registerCaptain = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const {
        fullName = {},
        email,
        password,
        phoneNumber,
        captain = {},
        vehicle = {},
        lat,
        long,
      } = req.body;
  
      if (!fullName.firstName || !fullName.lastName || !email || !password || !phoneNumber || !captain.license || !vehicle.vehicleType) {
        return res.status(400).json({ error: 'Missing required fields. Please check all inputs.' });
      }
  
      // Check for duplicates
      const existingCaptain = await captainModel.findOne({
        $or: [
          { email },
          { phoneNumber },
          { 'captain.license': captain.license },
          { 'vehicle.plate': vehicle.plate },
        ],
      });
  
      if (existingCaptain) {
        return res.status(400).json({ error: 'Email, License, Phone Number, or Plate already exists.' });
      }
  
      // Hash password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create captain using service
      const captainData = await captainService.createCaptain({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword,
        phoneNumber,
        license: captain.license,
        vehicleType: vehicle.vehicleType,
        color: vehicle.color,
        capacity: vehicle.capacity,
        plate: vehicle.plate,
        lat,
        long,
      });
  
      // Generate token
      const token = captainData.generateAuthToken();
  
      res.status(201).json({
        message: 'Captain registered successfully',
        token,
        captain: {
          id: captainData._id,
          fullName: captainData.fullName,
          email: captainData.email,
        },
      });
  
    } catch (error) {
      console.error('Error in registerCaptain:', error);
      res.status(500).json({ error: error.message || 'Internal server error.' });
    }
  };
  
















//login Captain
module.exports.loginCaptain = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validate input
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
      }
  
      // Check if captain exists and select password
      const captain = await captainModel.findOne({ email }).select('+password');
      if (!captain) {
        return res.status(401).json({ message: 'Invalid email or password. Email not found.' });
      }
  
      // Compare hashed passwords using bcrypt
      const isPasswordValid = await bcrypt.compare(password, captain.password);
      if (!isPasswordValid) {
        console.log('Password mismatch. Entered:', password, 'Stored:', captain.password);
        return res.status(401).json({ message: 'Invalid email or password. Password mismatch.' });
      }
  
      // Generate JWT token
      if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: 'JWT_SECRET is missing in environment variables.' });
      }
  
      const token = captain.generateAuthToken ? captain.generateAuthToken() : jwt.sign(
        { id: captain._id, email: captain.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
  
      // Send token in cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
  
      res.status(200).json({
        message: 'Login successful',
        token,
        captain: {
          id: captain._id,
          fullName: captain.fullName,
          email: captain.email,
        },
      });
  
    } catch (error) {
      console.error('Error in loginCaptain:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  







//get captain profile
module.exports.getCaptainProfile = async (req, res, next)=>{
    return res
    .status(200)
    .json(req.captain)
}


//logout captain
module.exports.logoutCaptain = async (req, res, next) =>{
   
    const token = req.cookies.token || req.headers.generateAuthToken.split(' ')[1];

    await blacklistTokenModel.create({token});

    res.clearCookie('token',{
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite:'strict' // prevent from xss scripting attack
    });

    res
    .status(200)
    .json({message:'Logout successful'})
}


//update captain profile
//     try {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         const captain = req.captain;
//         const {
//             firstName,
//             lastName,
//             email,
//             password,
//             phoneNumber,
//             captain: { license } = {},
//             plate,
//             color,
//             capacity,
//             vehicleType,
//             lat,
//             long,
//         } = req.body;

//         if (!firstName || !lastName || !license || !vehicleType || !lat || !long) {
//             return res.status(400).json({
//                 error: `Missing required fields: ${[
//                     !firstName && 'firstName',
//                     !lastName && 'lastName',
//                     !license && 'license',
//                     !vehicleType && 'vehicleType',
//                     !lat && 'lat',
//                     !long && 'long',
//                 ]
//                     .filter(Boolean)
//                     .join(', ')}`,
//             });
//         }

//         const existingCaptain = await captainModel.findOne({ $or:[{email },{'captain.licence': license},
//             {'vehicle.plate':plate},
//             {phoneNumber}
//         ] });
//         if (existingCaptain) {
//             return res.status(400).json({ error: 'Email, license, plate or phoneNumber already exists.' });
//         }

//         const hashedPassword = await captainModel.hashPassword(password);
//         const updatedCaptain = await captainService.updateCaptainProfile({
//             captain,
//             firstName,
//             lastName,
//             email,
//             password: hashedPassword,
//             phoneNumber,
//             license,
//             plate,
//             color,
//             capacity,
//             vehicleType,
//             lat,
//             long,
//         });

//         res.status(200).json({
//             message: 'Captain profile updated successfully',
//             captain: {
//                 id: updatedCaptain._id,
//                 fullName: updatedCaptain.fullName,
//                 email: updatedCaptain.email,
//             },
//         });
//     } catch (error) {
//         console.error('Error in updateCaptainProfile:', error.message);
//         res.status(500).json({ error: error.message });
//     }
// };



//delete captain profile
module.exports.delCaptainProfile = async (req, res, next) =>{

}


