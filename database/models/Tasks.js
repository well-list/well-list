const mongoose = require('mongoose');

const TasksSchema = new mongoose.Schema({
    _id: { type: String },
    username: { type: String, required: true },
    priority: { type: String, required: true },
    order: { type: Number, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, required: true }
});

const Task = new mongoose.model("Task", TasksSchema);

module.exports = Task;