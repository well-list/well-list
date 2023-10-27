const mongoose = require('mongoose');
const User = require('./models/User');
const Task = require('./models/Tasks');

async function seedDatabase() {
  try {
   
    /* Clear Existing Data*/
    await User.deleteMany({});
    await Task.deleteMany({});

    /* Create a user */
    const user = await User.create({
      username: 'john_doe',
      password: 'password123'
    });

    /* Attach tasks to the user */
    const tasks = [
      {
        taskInformation: 'Complete homework',
        priority: 5,
        userID: user._id
      },
      {
        taskInformation: 'Buy groceries',
        priority: 3,
        userID: user._id
      },
      {
        taskInformation: 'Go for a run',
        priority: 2,
        userID: user._id
      }
    ];

    /* Create Tasks */
    await Task.create(tasks);

    console.log('User with tasks created successfully!');
  } 
  catch (error) {
    console.error('Error seeding the database:', error);
  } 
  finally {
    mongoose.disconnect();
  }
}

module.exports = seedDatabase;
