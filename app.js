const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const connectDB = require('./database/config/db');
const User = require('./database/models/User');
const passport = require('passport');

/* Passport Config */
require('./database/config/passport')(passport);

/* Load Config */
dotenv.config({ path: './database/config/config.env' });
connectDB();
const app = express();
app.use(express.json());
app.use(express.static('public'))

/* Setting up Express Sessions */
app.use(session ({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

/* Test Input to Database */
// const seedDatabase = require('./database/Test');
// seedDatabase();

/* Initalize Passport */
app.use(passport.initialize());
app.use(passport.session());

app.post('/api/createUser', async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username: username });

        if(existingUser) {
            return res.status(401).json({ error: 'Username already exists' });
        } else {
            const hashPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                username: username,
                password: hashPassword,
            });

            await newUser.save();
            
            return res.status(200).json({ message: 'Login successful' });;
        }
    } catch (error) {
        console.error('Error', error);
        return res.status(500).json({ error: 'Internal Server Error' });;
    }
})

/* TODO: redirect to login page and have a failure redirect */
app.post('/api/login', passport.authenticate('local', {
    successRedirect: '/',
}));

/* Port Stuff */
const PORT = process.env.PORT || 3000;
app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);