const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser')
app.use(cookieParser());
connectToDb();
const captainRoutes = require('./routes/captain.routes');

app.use(express.json());
app.use(express.urlencoded({extended:true}));




app.get('/', (req, res) =>{
    res.send('hello World')
})

app.use('/users', userRoutes);
app.use('/captain', captainRoutes);



module.exports = app;