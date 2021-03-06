const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./routes');

const CONNECTION_URL = process.env.MONGO_URI || 'mongodb://localhost:27017/eureka'
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(router);

mongoose.connect(CONNECTION_URL)
app.listen(PORT, () => {
    console.log(`Yay!!! API server on port ${PORT}`);
});