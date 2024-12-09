const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');


//register Captain
module.exports.registerCaptain = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            fullName,
            email,
            password,
            phoneNumber,
            captain: { license },
            vehicle: { vehicleType, color, capacity, plate },
            lat,
            long,
        } = req.body;

        // Validate required fields
        if (!license || !vehicleType) {
            return res.status(400).json({ error: 'Missing required fields: license or vehicleType' });
        }

        // Check for duplicates
        const existingCaptain = await captainModel.findOne({
            $or: [{ email }, { 'captain.license': license }, { 'vehicle.plate': plate }],
        });
        if (existingCaptain) {
            return res.status(400).json({ error: 'Email, license, or plate already exists.' });
        }

        // Hash password
        const hashedPassword = await captainModel.hashPassword(password);

        // Create new captain
        // const captain = new captainModel({
        //     fullName: { firstName, lastName },
        //     email,
        //     password: hashedPassword,
        //     phoneNumber,
        //     captain: { license },
        //     vehicle: { vehicleType, color, capacity, plate },
        //     locations: { lat, long },
        // });


        const user = await captainService.createUser({
            fullName: {
                firstName: fullName.firstName,
                lastName: fullName.lastName,
            },
            email,
            password: hashedPassword,
            license,
            phoneNumber,
            vehicle: {
                vehicleType,
                color,
                capacity,
                plate,
            },
            lat,
            long,
        });



        await captain.save();

        // Generate token
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
        // if (error.code === 11000) {
        //     return res.status(400).json({ error: 'Email already exists. Please use a different email.' });
        // // console.error('Error in registerCaptain:', error.message);
        res.status(500).json({ error: 'Internal server error.' });
    };
};



//login Captain
module.exports.loginCaptain = async (req, res) => {
        try {
            const { email, password } = req.body;
    
            // Validate input
            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required.' });
            }
    
            // Check if captain exists
            const captain = await captainModel.findOne({ email }).select('+password'); // Include password for comparison
            if (!captain) {
                return res.status(401).json({ message: 'Invalid email or password.' });
            }
    
            // Compare passwords
            const isPasswordValid = await bcrypt.compare(password, captain.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid email or password.' });
            }
    
            // Generate auth token
            const token = jwt.sign({ id: captain._id, email: captain.email }, process.env.JWT_SECRET, {
                expiresIn: '24h',
            });
    
            // Send token in cookie and response
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
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
            console.error('Error in loginCaptain:', error.message);
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
        sameSite:'strict' // prevent from xss xcripting attack
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



