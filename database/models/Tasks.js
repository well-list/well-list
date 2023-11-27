const mongoose = require('mongoose');
//const User = require('./User');

const TasksSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    priority: String,
    order: Number,
    _id: Number,
    date: String,
    description: String,
    completed: Boolean
});
    

const Task = new mongoose.model("Task", TasksSchema);

module.exports = Task;