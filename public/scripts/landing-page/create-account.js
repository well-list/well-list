export function handleAccountCreation() {
    const [username, password] = getUsernamePasswordInput();

    if (username.length === 0) {
        setMessageText('Please provide a username.');
    }
    else if (password.length === 0) {
        setMessageText('Please provide a password.');
    }
    else {
        const isPasswordStrong = checkPassword(password);

        if(isPasswordStrong.length === 0) {
            attemptAccountCreation(username, password);
        } 
        else {
            const message = `Password is missing: ${isPasswordStrong.join(', ')}`;
            setMessageText(message);
        }
    }
}

function checkPassword(password) {
    const missingRequirements = [];
    
    if (password.length < 8) {
        missingRequirements.push('at least 8 characters');
    }
    if (!/[A-Z]/.test(password)) {
        missingRequirements.push('at least 1 uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
        missingRequirements.push('at least 1 lowercase letter');
    }
    if (!/\d/.test(password)) {
        missingRequirements.push('at least one digit');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        missingRequirements.push('at least one special character');
    }

    return missingRequirements;
}

/* TODO: Get rid of the status errors with in try catch
    when function is completely implemented */
async function attemptAccountCreation(username, password) {
    try {
        const response = await fetch('/api/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        if (response.status === 200) {
            handleAccountCreationSuccess()
        }
        else if (response.status === 401) {
            handleAccountCreationFail('Failed to create account. Status 400.');
        }
        else {
            handleAccountCreationFail('Failed to create account. Please try again later.');
        }

    } catch (error) {
        console.log('Error', error);
        handleAccountCreationFail('Error creating account.');
    }
}

function handleAccountCreationSuccess() {
    setMessageText('User Account Created. Please Login.');
}

function handleAccountCreationFail(message) {
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