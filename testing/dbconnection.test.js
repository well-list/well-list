const {MongoClient} = require("mongodb");

// This goes over insertion and deletion of user and tasks of the user
describe("insertion and deletion", () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect("mongodb+srv://User:mainpassword@cluster0.calse2v.mongodb.net/", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = connection.db("app");  // This connects to the database called "app"
    });

    afterAll(async () => {
        // await User.deleteMany({});
        // await Task.deleteMany({});
        await connection.close();
    });


    test("Adding user to database", async () => {
        const users = db.collection("users");   // This connects to the collection/table called "users"
        
        const mockUser = {
            "username": "abc", 
            "password": "123",
            "tasks": [
                {"low-priority": []},   // Low priority
                {"med-priority": []},   // Med priority
                {"high-priority": []},  // High priority
            ]
        };
        await users.insertOne(mockUser);

        // the {_id:0} here basically returns the user WITHOUT the _id property.
        const insertedUser = await users.findOne({"username": "abc"}, {_id: 0});
        expect(insertedUser).toEqual(mockUser);

    });


    test("Adding to list in user", async () => {
        const users = db.collection("users");

        // Adding in tasks individually. updateMany seems to affect the collection when I just want to update
        // this one user in particular. TODO: look into makin this cleaner
        // "tasks.0.low-priority" is saying: in the task property's 0th element's low-priority property
        // it's basically getting access low-priority array inside the "tasks" property.
        await users.updateOne(
            { username: "abc" }, 
            { $addToSet: {"tasks.0.low-priority": "testing something haha"} }
        );

        await users.updateOne(
            { username: "abc" }, 
            { $addToSet: {"tasks.0.low-priority": "hmmm something else"} }
        );

        await users.updateOne(
            { username: "abc" }, 
            { $addToSet: {"tasks.1.med-priority": "thing in med prio"} }
        );

        await users.updateOne(
            { username: "abc" }, 
            { $addToSet: {"tasks.2.high-priority": "thing in high prio"} }
        );

        // This is essenitally what should be inside the "tasks" property
        let someVar = [
            {"low-priority": ["testing something haha", "hmmm something else"]},
            {"med-priority": ["thing in med prio"]}, 
            {"high-priority": ["thing in high prio"]}
        ];

        const findUser = await users.findOne({"username": "abc"}, {_id: 0});
        const {tasks} = findUser;
        expect(tasks).toEqual(someVar);
    });


    test("Removing item from list in user", async () => {
        const users = db.collection("users");
        
        // the right side of the : in $pull is the value you're looking to remove.
        // can set it equal to whatever is inside the line in the list we remove from in production
        await users.updateOne(
            { username: "abc" },
            { $pull: {"tasks.0.low-priority": "testing something haha"} }
        );

        let someVar = [
            {"low-priority": ["hmmm something else"]},
            {"med-priority": ["thing in med prio"]}, 
            {"high-priority": ["thing in high prio"]}
        ];

        const findUser = await users.findOne({"username": "abc"}, {_id: 0});
        const {tasks} = findUser;
        expect(tasks).toEqual(someVar);
    });

    
    test("Deleting user from database", async () => {
        const users = db.collection("users");

        await users.deleteOne({username: "abc"});
        qResult = await users.findOne({"username": "abc"}, {_id: 0});  // returns null if does not exist
        expect(qResult).toEqual(null);
    });
});