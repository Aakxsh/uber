const userModel = require('../models/user.models'); // User model
const blacklistedTokenModel = require('../models/blacklistToken.model'); // Blacklisted token model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



// Middleware to check if the user is authenticated
module.exports.authUser = async (req, res, next) => {
    try {
        // Extract token from cookies or Authorization header
        const token =
            (req.cookies && req.cookies.token) || // Check cookies
            (req.headers.authorization &&
                req.headers.authorization.startsWith('Bearer ') &&
                req.headers.authorization.split(' ')[1]); // Check header

        // If no token is provided
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized. Token is required.' });
        }

        // Check if the token is blacklisted
        const isBlacklisted = await blacklistedTokenModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Unauthorized. Token has been blacklisted.' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by ID from the token
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Attach the user to the request
        req.user = user;
        next(); // Pass control to the next middleware/route
    } catch (error) {
        console.error('Authentication Error:', error.message);

        // Handle token-specific errors
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired. Please log in again.' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token. Please log in again.' });
        }

        // General server error
        return res.status(500).json({ message: 'Internal server error.' });
    }
};


// Middleware to check if the captain is authenticated
module.exports.authCaptain = async (req, res, next) =>{
try {
        const token = (req.cookies && req.cookies.token) || (req.headers.authorization && req.headers.authorization.startsWith('Bearer ') && req.headers.authorization.split(' ')[1]);
    
        if(!headers){
            return res
            .status(401)
            .json({message:'Unauthorized. Token is requires'})
        }
    
        const isBlacklisted = await blacklistTokenModel.findOne({token});
    
        if(isBlacklisted){
            return res
            .status(401)
            .json({message: 'Unauhtorized. Token has been blacklisted'})
        }
        
    
        const decode = jwt.sign(token, process.env.JWT_SECRET);
    
        const captain = await captainModel.findById(decode._id);
    
        if(!captain){
            return res
            .status(404)
            .json({message:'Captain not found'})
        }
    
        req.captain = captain;
        next();
} catch (error) {
    console.log('Authentication Error : ', error.message);
    
    if(error.name === 'TokenExpiredError'){
        return res
        .status(401)
        .json({message:'Token expired. Please log in again'})
    } else if(error.name === 'JsonWebTokenError'){
        return res
        .status(401)
        .json({message:'Invalid token. Please log in again'})
    }
    
    return res
    .status(500)
    .json({message:'Internal server error'})
}
}