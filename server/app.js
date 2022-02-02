// application entry point

// import required modules
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userRouter = require('./routes/User');


const CONNECTION_URL = process.env.MONGO_URI || 'mongodb://localhost:27017/eureka'
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use('/user', userRouter);


mongoose.connect(CONNECTION_URL)
app.listen(PORT, () => {
    console.log(`Yay!!! API server on port ${PORT}`);
});