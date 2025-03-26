const { validationResult, body } = require('express-validator');
const userService = require('../services/user.services');
const userModel = require('../models/user.models');
const blacklistTokenModel = require('../models/blacklistToken.model');


// Register User
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





// userLogin
module.exports.logInUser = async (req, res, next) =>{
try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(200)
            .json({errors: errors.array()})
        }
    
    
    const {email, password} = req.body;
    
    
    const user = await userModel.findOne({email}).select('+password');
    
    if(!user){
        return res.status(200)
        .json({message:'User not found'});
    }
    
    const isMatch = await user.comparePassword(password);
    
    if(!isMatch){
        return res.status(401)
        .json({message:'Invalid Email or Password'})
    }
    
    const token = user.generateAuthToken();
    return res
    .status(200)
    .json({message:'Login Successful',
        token,
        user:{
            id:user._id,
            fullName:user.fullName,
            email:user.email
        },
    })

} catch (error) {
    console.log('Error in logInUser : ', error.message)
    return res
    .status(500)
    .json({message:'Internal server error'});
}}


// userProfile
module.exports.getUserProfile = async (req, res, next)=>{
   return res
   .status(200)
   .json(req.user)
}


// userlogout
module.exports.logoutUser = async (req, res, next)=>{
    res.clearCookie('token');
    const token = req.cookies.token || req.heaaders.generateAuthToken.split(' ')[1];

    await blacklistTokenModel.create({token})

    res
    .status(200)
    .json({message:'logout successful'});
 }