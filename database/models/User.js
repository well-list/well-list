const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true }
})

const User = new mongoose.model("User", UserSchema); // Users is the Collection

module.exports = User;