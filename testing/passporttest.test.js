// Server MUST be running in order to test.

test("adding user to db using passport", async () => {
    try {
        const response = await fetch("http://localhost:3000/api/createUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: "hahayestesterhehe",
                password: "testPassword",
            }),
        });
        expect(response.status).toBe(200);
    } catch (error) {
        console.log(error);
    }
});

test("reject account creation where username already exists", async () => {
    try {
        const response = await fetch("http://localhost:3000/api/createUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: "hahayestesterhehe",
                password: "testPassword",
            }),
        });
        expect(response.status).toBe(401);
    } catch (error) {
        console.log(error);
    }
});

test("successful login", async () => {
    try {
        const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: "hahayestesterhehe",
                password: "testPassword",
            }),
        });
        expect(response.redirected).toBe(true); //response.status is 200
    } catch (error) {
        console.log(error);
    }
});