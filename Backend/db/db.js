const mongoose = require('mongoose');



function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT)
        .then(() => {
            console.log('Connected to DB');
        })
        .catch((error) => {
            console.error('Failed to connect to DB:', error);
        });
}



module.exports = connectToDb;