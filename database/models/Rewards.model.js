const mongoose = require('mongoose');

const RewardsSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    month: String,
    points: Number,
    theme: Number,
    plant_ids: [[Number]],
    color_ids: [[Number]]
});

const Rewards = new mongoose.model("Rewards", RewardsSchema); // Rewards is the Collection

module.exports = Rewards;