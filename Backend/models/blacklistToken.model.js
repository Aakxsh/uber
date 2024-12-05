const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


// Define the blacklist token schema
const blacklistedTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

// Set TTL index to automatically remove documents after 24 hours
blacklistedTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

// Export the blacklist token model
module.exports = mongoose.model('BlacklistedToken', blacklistedTokenSchema);
