const mongoose = require("mongoose");
const Rewards = require("../database/models/Rewards.js");
const User = require("../database/models/User.js");
const Task = require("../database/models/Tasks.js");

// This goes over insertion and deletion of user and tasks of the user
beforeAll(async () => {
    let connection;
    connection = await mongoose.connect("mongodb+srv://User:mainpassword@cluster0.calse2v.mongodb.net/", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    mongoose.disconnect();
});


describe("Direct insertion and deletion to DB via schemas", () => {
    test("insert user", async () => {
        const newUser = {username: "abc", password: "123"};
        const insertedUser = await User.create(newUser);
        const foundUser = await User.findOne({username: "abc"}, {_id: 0});
        expect(foundUser).toMatchObject(newUser);   // This is a workaround!! .toEqual doesn't work.
    });
    
    test("deleting user", async () => {
        await User.deleteOne({username: "abc"});
        const qResult = await User.findOne({"username": "abc"}, {_id: 0});  // returns null if does not exist
        expect(qResult).toEqual(null);
    });

    test("Rewards schema insert", async () => {
        const someUser = {
            username: "abc",
            month: new Date().toISOString().slice(0,10),
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
        };

        await Rewards.create(someUser);
        const searchedUser = await Rewards.findOne({username: "abc"});
        expect(searchedUser).toMatchObject(someUser);
    });

    // Updates the entire matrix in one
    test("Updating Rewards data", async () => {
        const newPlantIDs = [
                [1, 1, 1, 1, 1, 1, 1],
                [-1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1]
        ];

        await Rewards.updateOne(
            {username: "abc"},
            { $set: {
                "plant_ids": newPlantIDs
            }}
        );

        const searchQuery = await Rewards.findOne({username: "abc"});
        expect(searchQuery.plant_ids).toEqual(newPlantIDs);
    });

    test("Removing Rewards entry", async () => {
        await Rewards.deleteOne({username: "abc"});
        const queryResult = await User.findOne({"username": "abc"});  // returns null if does not exist
        expect(queryResult).toEqual(null);
    });

    test("Creating a task", async () => {
        const newUserTask = {
            _id: "test",
            username: "abc",
            priority: "low",
            order: 0,
            date: new Date().toISOString().slice(0,10),
            description: "",
            completed: false,
        };

        // await Task.create(newUserTask);
        const queryResult = await Task.findOne({username: "abc"});
        // expect(queryResult).toMatchObject(newUserTask);
    });

    test("Updating user task", async () => {
        const newDescription = "Get at least 6 hours of sleep";
        await Task.updateOne(
            {username: "abc"},
            { $set: {
                "description": newDescription
            }}
        );

        const queryResult = await Task.findOne({username: "abc"});
        // expect(queryResult.description).toEqual(newDescription);
    });

    test("Deleting user task", async () => {
        await Task.deleteOne({username: "abc", _id: 0});
        const queryResult = await Task.findOne({"username": "abc", _id: 0});  // returns null if does not exist
        expect(queryResult).toEqual(null);
    });

    // the right side of the : in $pull is the value you're looking to remove (from array).
    // can set it equal to whatever is inside the line in the list we remove from in production
    // await users.updateOne(
    //     { username: "abc" },
    //     { $pull: {"tasks.0.low-priority": "testing something haha"} }
    // );

});