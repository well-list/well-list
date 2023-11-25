const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Load User Model
const User = require('../models/User');

module.exports = async (passport) => {
    passport.use(
        new localStrategy({username: 'username'}, (username, password, done) => {
            
            // Match User
            const user = User.findOne({username: username})
                .then(user => {
                    if(!user) {
                        return done(null, false, { message: 'That username does not exist' });
                        console.log("!user");
                    }
                    
                    // Match Password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err;

                        if(isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Password is incorrect' });
                            console.log("!password");
                        }
                    });
                })
                .catch(err => console.log(err));
        })
    );

    passport.serializeUser((user, done) => {
        process.nextTick(() => {
            return done(null, {
                id: user.id,
                username: user.username,
                password: user.password
            });
        });
    });

    passport.deserializeUser( (user, done) => {
        process.nextTick(() => {
            return done(null, user);
        })
    });
}