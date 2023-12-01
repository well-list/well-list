const mongoose = require('mongoose');

const RewardsSchema = new mongoose.Schema({
    username: { type: String, required: true },
    month: { type: String, required: true },
    points: { type: Number, required: true },
    theme: { type: Number, required: true },
    plant_ids: { type: [[Number]], required: true },
    color_ids: { type: [[Number]], required: true }
});

const Rewards = new mongoose.model("Rewards", RewardsSchema); // Rewards is the Collection

module.exports = Rewards;