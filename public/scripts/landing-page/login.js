export function handleLogin() {
    const [username, password] = getUsernamePasswordInput();

    if (username.length === 0) {
        setMessageText('Please provide a username.');
    }
    else if (password.length === 0) {
        setMessageText('Please provide a password.');
    }
    else {
        attemptLogin(username, password);
    }
}

/* TODO: Get rid of the status errors with in try catch
    when function is completely implemented */
async function attemptLogin(username, password) {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                username: username,
                password: password,
            }),
        });

        if (response.redirected) {
            handleLoginSuccess();
            window.location.href = '/home';
        }
        else {
            /* This error is caused by incorrect username or password */
            handleLoginFail(`Failed to log in. Please try again. Status 400.`);
        }
    }
    catch (error) {
        /* This error means the route is broken */
        handleLoginFail(`Failed to log in. Please try again. Route broken.`);
    }
}

function handleLoginSuccess() {
    setMessageText(`Login successful!`);
}

function handleLoginFail(message) {
    setMessageText(message);
    document.getElementById('username-input').value = '';
    document.getElementById('password-input').value = '';
}

function getUsernamePasswordInput() {
    const usernameInput = document.getElementById('username-input');
    const passwordInput = document.getElementById('password-input');
    return [usernameInput.value, passwordInput.value]
}

function setMessageText(messageText) {
    document.getElementById('message-text').innerHTML = messageText;
}