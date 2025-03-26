const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
  fullName: {
    firstName: { type: String, 
        required: true, 
        minlength: 3 },

    lastName: { type: String, 
        required: true, 
        minlength: 3 },
  },

  email: { type: String, 
    required: true, 
    unique: true, 
    lowercase: true 
},

  password: { type: String, 
    required: true, 
    minlength: 8,
    select: false
},

  phoneNumber: { type: String, 
    required: true, 
    unique: true 
},

  captain: {
    license: { type: String, 
        required: true, 
        unique: true },
  },

  vehicle: {
    vehicleType: { 
        type: String, 
        required: true, 
        enum: ['Bike', 'Car', 'Autorickshaw', 'ElectricBike'] 
    },

    color: { 
        type: String, 
        required: true, 
        minlength: 3 
    },

    capacity: { 
        type: Number, 
        required: true, 
        min: 1 
    },

    plate: { 
        type: String, 
        required: true, 
        unique: true },
  },

  locations: {
    lat: { 
        type: Number, 
        required: true 
    },

    long: { 
        type: Number, 
        required: true 
    },
  },
}, { timestamps: true });

// ✅ Generate Auth Token
captainSchema.methods.generateAuthToken = function() {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  return jwt.sign(
    { _id: this._id, email: this.email, role: 'captain' },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// ✅ Pre-save Middleware to Hash Password
captainSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });
  

const captainModel = mongoose.model('Captain', captainSchema);
module.exports = captainModel;
