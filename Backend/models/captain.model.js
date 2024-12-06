const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { validate } = require('./user.models')
const bcrypt = require('bcrypt')


const captainSchema = new mongoose.Schema(
    {
        fullName: {
            firstName: {
                type: String,
                required: true,
                minlength: [3, 'Firstname should be at least 3 characters long'],
            },
            lastName: {
                type: String,
                required: true,
                minlength: [3, 'Lastname should be at least 3 characters long'],
            },
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (v) {
                    return /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com)$/i.test(v);
                },
                message: props => `${props.value} is not a valid email domain!`,
            },
        },
        password: {
            type: String,
            required: true,
            minlength: [8, 'Password must be at least 8 characters long'],
            select: false,
        },

        phoneNumber:{
            type:Number,
            required:true
        },

        captain:{
            licence:{
                type:String,
                reuired:true,
                unique:true
            }
        },
        
        socketId: {
            type: String,
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
        vehicle: {
            color: {
                type: String,
                required: true,
                minlength: [3, 'Color must be at least 3 characters long'],
            },
            plate: {
                type: String,
                required: true,
                unique: true,
                minlength: [3, 'Plate must be at least 3 characters long'],
            },
            capacity: {
                type: Number,
                required: true,
                min: [1, 'Capacity must be at least 1'],
            },
            vehicleType: {
                type: String,
                required: true,
                enum: ['Bike', 'Car', 'Autorickshaw', 'ElectricBike'],
            },
        },
        locations: {
            long: {
                type: Number,
                required: true,
            },
            lat: {
                type: Number,
                required: true,
            },
        },
    },
    {
        timestamps: true,
    }
);

// Generate auth token
captainSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
};

// Compare password
captainSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Hash password
captainSchema.statics.hashPassword = async function (password) {
    return bcrypt.hash(password, 10);
};

const captainModel = mongoose.model('Captain', captainSchema);

module.exports = captainModel;