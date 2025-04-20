const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.registerCaptain = async (req, res) => {
    try {
      const { fullName, email, password, phoneNumber, captain, vehicle, lat, long } = req.body;
  
      if (!fullName?.firstName || !fullName?.lastName || !email || !password || !phoneNumber || !captain?.license || !vehicle?.vehicleType || lat === undefined || long === undefined) {
        return res.status(400).json({ error: 'All fields are required. Please check your input.' });
      }
  
      // Check if Captain exists
      const existingCaptain = await captainModel.findOne({
        $or: [{ email }, { phoneNumber }, { 'captain.license': captain.license }, { 'vehicle.plate': vehicle.plate }],
      });
  
      if (existingCaptain) {
        return res.status(400).json({ error: 'Email, License, Phone Number, or Plate already exists.' });
      }
  
      // Create captain data
      const newCaptain = new captainModel({
        fullName,
        email,
        password,
        phoneNumber,
        captain,
        vehicle,
        locations: { lat, long }, // ✅ Corrected to use locations
      });
  
      await newCaptain.save();
  
      // Generate JWT token
      const token = jwt.sign({ _id: newCaptain._id, email: newCaptain.email }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      });
  
      res.status(201).json({ message: 'Captain registered successfully', token,
        captain:{
            id: newCaptain._id,
            fullName: newCaptain.fullName,
            email: newCaptain.email
        }
       });
    } catch (error) {
      console.error('Error in registerCaptain:', error);
      res.status(500).json({ error: error.message || 'Internal server error.' });
    }
  };








//login captain
module.exports.loginCaptain = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check for missing fields
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
      }
  
      // Find the captain by email and ensure the password is fetched
      const captain = await captainModel.findOne({ email }).select('+password');
      if (!captain) {
        return res.status(401).json({ message: 'Invalid email or password. Email not found.' });
      }
  
      // Compare the entered password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, captain.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password. Password mismatch.' });
      }
  
      // Generate JWT token securely
      if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: 'JWT_SECRET is missing in environment variables.' });
      }
  
      const token = jwt.sign(
        { _id: captain._id, email: captain.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
  
      // Optionally set token as HTTP-only cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
  
      // Successful login response
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
module.exports.getCaptainProfile = async (req, res, next) => {
  try {
    const captain = req.captain;

    if (!captain) {
      return res.status(404).json({ message: 'Captain not found.' });
    }

    // ✅ Exclude sensitive fields like password
    const { password, ...safeCaptain } = captain.toObject();

    return res.status(200).json(safeCaptain);
  } catch (error) {
    console.error('Error getting captain profile:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};


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


//delete captain profile
module.exports.delCaptainProfile = async (req, res, next) =>{

}


