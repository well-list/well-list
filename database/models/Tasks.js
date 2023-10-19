const mongoose = require('mongoose');
const User = require('./User');

const TasksSchema = new mongoose.Schema({
    taskInformation: String,
    priority: Number,
    userID: String
});

const Task = new mongoose.model("Task", TasksSchema);

module.exports = Task;