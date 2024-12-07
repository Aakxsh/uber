const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required:true,
            minLength:[3,'First name must be at least 3 characters long']
        },
        lastName:{
            type:String,
            required:true,
            minLength:[3,'First name must be at least 3 characters long']
        }
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,'Invalid email format']
    },

    password:{
        type:String,
        required:true,
        minLength:[8,'Password must be at least 8 characters long']
    },

    socketId:{
        type:String,
    },

    phoneNumber:{
        type:String,
        required:true,
        unique:true,
        match:[/^\d{10}$/,'Phone number must be exactly 10 digits long']
    },

    status:{
        type:String,
        enum:['online','offline'],
        default:'offline'
    },

    vehicle:{
        vehicleType:{
            type:String,
            required:true,
            enum:['Bike', 'Car', 'Autorickshaw', 'ElectricBike']
        },
        color:{
            type:String,
            required:true,
            minLength:[3,'Vehicle color must be at least 3 characters long']
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,'Vehicle capacity must be at least 1']
        },
        plate:{
            type:String,
            required:true,
            unique:true
        }
    },

    captain: {
        license: {
            type: String,
            required: true,
            unique: true,
            minLength:[10,'License number must be at least 10 characters long']
        },
    },

    locations:{
        lat:{
            type:Number,
            required:true,
            // min:[-90,'Latitude must be a valid number'],
            // max:[90,'Latitude must be a valid number']
        },
        long:{
            type:Number,
            required:true,
            // min:[-180,'Longitude must be a valid number'],
            // max:[180,'Longitude must be a valid number']
        }
    }
})


// generate auth token
captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24hrs' });
    return token;
}


// hash password
captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10)};


// compare password
captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}    




const captainModel = mongoose.model('captain', captainSchema);


module.exports = captainModel;

