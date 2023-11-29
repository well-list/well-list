const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const connectDB = require('./database/config/db');
const passport = require('passport');

const User = require('./database/models/User');
const Tasks = require('./database/models/Tasks');
const Rewards = require('./database/models/Rewards');

/* --- Config --- */

require('./database/config/passport')(passport);

/* --- Load Config --- */

dotenv.config({ path: './database/config/config.env' });
connectDB();
const app = express();
app.use(express.json());
app.use(express.static('public'))

/* --- Express Session --- */

app.use(session ({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

/* Test Input to Database */
// const seedDatabase = require('./database/Test');
// seedDatabase();

/* --- Passport --- */

app.use(passport.initialize());
app.use(passport.session());

/* --- Routes --- */

app.post('/api/createUser', createUser)
app.post('/api/login', passport.authenticate('local', { successRedirect: '/home' }));
app.get('/home', (req, res) => { res.sendFile(__dirname + '/public/home.html'); });

/* --- Port Definition --- */

const PORT = process.env.PORT || 3000;
app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

/* --- Route Handlers --- */

async function createUser(req, res) {
    // console.log(req.body);
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
}