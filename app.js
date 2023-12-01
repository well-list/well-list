const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const connectDB = require('./database/config/db');
const passport = require('passport');

const User = require('./database/models/User');
const Tasks = require('./database/models/Tasks');
const Rewards = require('./database/models/Rewards');

const constants = require("./public/scripts/constants");
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
            
            const newUserRewards = new Rewards({
                username: username,
                month: new Date().toISOString().slice(0,7), // stores as yyyy-mm
                points: 0,
                theme: 0,
                plant_ids: [
                    [-1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1]
                ],
                color_ids: [
                    [-1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1]
                ]
            });
            await newUserRewards.save();

            return res.status(200).json({ message: 'Login successful' });;
        }
    } catch (error) {
        console.error('Error', error);
        return res.status(500).json({ error: 'Internal Server Error' });;
    }
}

async function deleteTask(req, res) {
    const {username, task_id} = req.body;

    await Tasks.deleteOne({_id: task_id});
    return res.status(200).json({message: "Successfully removed"});
}

async function addNewTask(req, res) {
    const {task_id, order, username, priority, description, date} = req.body;

    await Tasks.create({
        _id: task_id,
        username: username,
        prioirty: priority,
        order: order,
        date: date,
        description, description,
        completed: false
    });
    return res.status(200).json({message: "Inserted task successfully"});
}

async function updateTaskStatus(req, res) {
    const {task_id, isCompleted} = req.body;

    await Tasks.updateOne(
        {_id: task_id},
        {$set: {
            "completed": isCompleted
        }}
    );
    return res.status(200).json({message: "Task updated"});
}

async function updateTaskDescription(req, res) {
    const {task_id, description} = req.body;

    await Tasks.updateOne(
        {_id: task_id},
        {$set: {
            "description": description
        }}
    );
    return res.status(200).json({message: "Task updated"});
}

async function clearTasks(req, res) {
    const {username, date} = req.body;

    try {
        // deletes all tasks of the username at that specified date
        await Tasks.deleteMany({username: username, date: date});

        return res.status(200).json({message: "Task updated"});
    } catch (error) {
        print(error);
        return restart.status(401).json({message: "Could not delete all tasks"}); // should status be 401?
    }
}

// TODO: error handling
async function getTasks(req, res) {
    const {username, date} = req.body;

    const results = await Tasks.find({username: username, date: date});
    return results;
}

async function setRewardsTheme(req, res) {
    const {theme_id, username, month} = req.body;
    await Rewards.updateOne(
        {username: username, month: month},
        {$set: {
            "theme": theme_id
        }}
    );
    return res.status(200).json({message: "Theme updated"});
}

// TODO: error handling
async function getRewardsData(req, res) {
    const {username, month} = req.body;

    const result = await Rewards.findOne({username: username, month: month});
    return result;
}

async function buyPlant(req, res) {
    const {row, column, plantID, colorID, username, month} = req.body;
    const costOfPlant = constants.PLANT_COSTS[plantID][colorID];

    const currUserRewards = await Rewards.findOne({username: username, month: month});
    let currUserPoints = currUserRewards.points;
    currUserPoints -= costOfPlant;

    let currUserPlantIDs = currUserRewards.plant_ids;
    currUserPlantIDs[row][column] = plantID;

    let currUserColorIDs = currUserRewards.color_ids;
    currUserColorIDs[row][column] = colorID;

    await Rewards.updateOne(
        {username: username, month: month},
        {$set: {
            "points": currUserPoints,
            "plant_ids": currUserPlantIDs,
            "color_ids": currUserColorIDs
        }}
    );
    return res.status(200);
}

async function sellPlant(req, res) {
    const {row, column, username, month} = req.body;
    const currUserRewards = await Rewards.findOne({username: username, month: month});

    const plantID = currUserRewards.plant_ids[row][column];
    const colorID = currUserRewards.color_ids[row][column];
    const costOfPlant = constants.PLANT_COSTS[plantID][colorID];
    
    let currUserPoints = currUserRewards.points;
    currUserPoints += costOfPlant;   // adding points back for selling plant

    let currUserPlantIDs = currUserRewards.plant_ids;
    currUserPlantIDs[row][column] = -1;

    let currUserColorIDs = currUserRewards.color_ids;
    currUserColorIDs[row][column] = -1;

    await Rewards.updateOne(
        {username: username, month: month},
        {$set: {
            "points": currUserPoints,
            "plant_ids": currUserPlantIDs,
            "color_ids": currUserColorIDs
        }}
    );
    return res.status(200);
}

async function movePlant(req, res) {
    const {originRow, originColumn, destinationRow, destinationColumn, username, month} = req.body;

    let currentRewardMonth = await Rewards.findone({username: username, month: month});
    let updatedUserPlantIDs = currentRewardMonth.plant_ids;
    let updatedUserColorIDs = currentRewardMonth.color_ids;

    updatedUserPlantIDs[destinationRow][destinationColumn] = updatedUserPlantIDs[originRow][originColumn];
    updatedUserPlantIDs[originRow][originColumn] = -1;

    updatedUserColorIDs[destinationRow][destinationColumn] = updatedUserColorIDs[originRow][originColumn];
    updatedUserColorIDs[originRow][originColumn] = -1;
    await Rewards.updateOne(
        {username: username, month: month},
        {$set: {
            "plant_ids": updatedUserPlantIDs,
            "color_ids": updatedUserColorIDs
        }}
    );
    return res.status(200);
}