const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Users = require("./models/User");
const Tasks = require("./models/Tasks");

dotenv.config({ path: './config/config.env' });
connectDB();
const app = express();
app.use(express.json());
app.use(express.static('public'))

/* Test Input to Database */
const seedDatabase = require('./Test');
seedDatabase();

/* Port Stuff */
const PORT = process.env.PORT || 3000;
app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);