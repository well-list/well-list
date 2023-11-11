loadLogin();

/* TODO: Get rid of the status errors with in try catch
    when function is completely implemented */
async function handleLogin() {
    const usernameInput = document.getElementById('username-input');
    const passwordInput = document.getElementById('password-input');
    const username = usernameInput.value;
    const password = passwordInput.value; 

    if (username.length === 0) {
        setMessageText('Please provide a username.');
    }
    else if (password.length === 0) {
        setMessageText('Please provide a password.');
    }
    else {
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
                setMessageText(`Login successful!`);
            }
            else {
                /* This error is caused by incorrect username or password */
                setMessageText(`Failed to log in. Please try again. Status 400.`);
            }

            usernameInput.value = '';
            passwordInput.value = '';
        }
        catch (error) {
            /* This error means the route is broken */
            setMessageText(`Failed to log in. Please try again. Route broken.`)
        }
    }
}

/* TODO: Get rid of the status errors with in try catch
    when function is completely implemented */
async function handleAccountCreation() {
    const usernameInput = document.getElementById('username-input');
    const passwordInput = document.getElementById('password-input');
    const username = usernameInput.value;
    const password = passwordInput.value; 

    if (username.length === 0) {
        setMessageText('Please provide a username.');
    }
    else if (password.length === 0) {
        setMessageText('Please provide a password.');
    }
    else {
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
                setMessageText(`User Account Created. Please Login.`);
            }
            else if (response.status === 401) {
                setMessageText(`Failed to create account. Status 400.`);
            }
            else {
                setMessageText(`Failed to create account. Please try again later.`);
            }

            usernameInput.value = '';
            passwordInput.value = '';
            
        } catch (error) {
            console.log('Error', error);
            setMessageText(`Error creating account.`);
        }
    }
}

var SELECTED_STICKY = []; // [id, class, innerHTML]

document.getElementById("sticky-1").addEventListener('click', () => {
    handleStickyClicked(loadCreateAccount, 1, 'account-creation', 'Create Account');
});
document.getElementById("sticky-2").addEventListener('click', () => {
    handleStickyClicked(loadCredits, 2, 'credits', 'Credits');
});
document.getElementById("sticky-3").addEventListener('click', () => {
    handleStickyClicked(loadAbout, 3, 'about', 'About');
});

function handleStickyClicked(loadStickyFunction, stickyID, stickyClass, stickyInnerHTML) {
    const sticky = document.getElementById(`sticky-${stickyID}`);
    if(sticky.innerHTML === stickyInnerHTML) {
        if(SELECTED_STICKY.length !== 0) {
            const selectedSticky = document.getElementById(`sticky-${SELECTED_STICKY[0]}`);
            selectedSticky.className = SELECTED_STICKY[1];
            selectedSticky.innerHTML = SELECTED_STICKY[2];
            document.getElementById(`plant-sticker-${SELECTED_STICKY[0]}`).className = 'default';
        }

        loadStickyFunction();
        sticky.className = 'login';
        sticky.innerHTML = 'login';
        document.getElementById(`plant-sticker-${stickyID}`).className = 'login';
        SELECTED_STICKY = [stickyID, stickyClass, stickyInnerHTML];
        document.getElementById('pin').className = stickyClass;
    }
    else {
        loadLogin();
        sticky.className = stickyClass;
        sticky.innerHTML = stickyInnerHTML;
        SELECTED_STICKY = [];
        document.getElementById(`plant-sticker-${stickyID}`).className = 'default';
        document.getElementById('pin').className = 'login';
    }
}

function loadLogin() {
    setMenuTitle('Login To Account')
    const container = document.getElementById('lined-area');
    container.innerHTML = '';
    // creating and adding elements using menu paper element
    const usernameInputContainer = createElement('div', ['class'], ['username-password-container'], null);
    usernameInputContainer.appendChild(createElement('div', ['id'], ['label'], 'Username:'));
    usernameInputContainer.appendChild(createElement('input', ['id', 'type', 'for'], ['username-input', 'text', 'username'], 'Username:'));
    container.appendChild(usernameInputContainer);
    const passwordInputContainer = createElement('div', ['class'], ['username-password-container'], null);
    passwordInputContainer.appendChild(createElement('div', ['id'], ['label'], 'Password:'));
    passwordInputContainer.appendChild(createElement('input', ['id', 'type', 'for'], ['password-input', 'password', 'password'], 'Password:'));
    container.appendChild(passwordInputContainer);
    const submitControlsContainer = createElement('div', ['class'], ['controls'], 'Login to an existing account:');
    const loginButton = createElement('div', ['id'], ['login-button'], 'Submit.');
    loginButton.addEventListener('click', () => {
        handleLogin();
    });
    submitControlsContainer.appendChild(loginButton);
    container.appendChild(submitControlsContainer);
    const messageContainer = createElement('div', ['id'], ['message-container'], null);
    messageContainer.appendChild(createElement('div', ['id'], ['message-title'], 'Message:'));
    messageContainer.appendChild(createElement('div', ['id'], ['message-text'], 'Please enter your login information. If you do not have an account then please create one.'));
    container.appendChild(messageContainer);
}

function loadCreateAccount() {
    setMenuTitle('Create Account')
    const container = document.getElementById('lined-area');
    container.innerHTML = '';
    // creating and adding elements using menu paper element
    const usernameInputContainer = createElement('div', ['class'], ['username-password-container'], null);
    usernameInputContainer.appendChild(createElement('div', ['id'], ['label'], 'Username:'));
    usernameInputContainer.appendChild(createElement('input', ['id', 'type', 'for'], ['username-input', 'text', 'username'], 'Username:'));
    container.appendChild(usernameInputContainer);
    const passwordInputContainer = createElement('div', ['class'], ['username-password-container'], null);
    passwordInputContainer.appendChild(createElement('div', ['id'], ['label'], 'Password:'));
    passwordInputContainer.appendChild(createElement('input', ['id', 'type', 'for'], ['password-input', 'password', 'password'], 'Password:'));
    container.appendChild(passwordInputContainer);
    const submitControlsContainer = createElement('div', ['class'], ['controls'], 'Create a new account:');
    const createAccountButton = createElement('div', ['id'], ['create-account-button'], 'Submit.');
    createAccountButton.addEventListener('click', () => {
        handleAccountCreation();
    });
    submitControlsContainer.appendChild(createAccountButton);
    container.appendChild(submitControlsContainer);
    const messageContainer = createElement('div', ['id'], ['message-container'], null);
    messageContainer.appendChild(createElement('div', ['id'], ['message-title'], 'Message:'));
    messageContainer.appendChild(createElement('div', ['id'], ['message-text'], 'Please enter your new account information.'));
    container.appendChild(messageContainer);
}

function loadCredits() {
    setMenuTitle('Credits')
    const container = document.getElementById('lined-area');
    container.innerHTML = '';

    const creditLines = [
        'Breanna Caudle as security lead',
        'Keegan Lloyd as software engineering lead and team lead',
        'Ben Shinnick as the coding lead',
        'Zachary Tisdale as testing lead'
    ]
    container.appendChild(createElement('div', ['id'], ['subtitle'], 'Created By:'));
    const list = document.createElement('ul', [], [], null);
    for(let i = 0; i < creditLines.length; i++) {
        list.appendChild(createElement('li', [], [], creditLines[i]))
    }
    container.appendChild(list);
}

function loadAbout() {
    setMenuTitle('About')
    const container = document.getElementById('lined-area');
    container.innerHTML = '';

    container.appendChild(createElement('div', [], [], 'Well-List is a web application designed to simplify and enhance the way users manage their daily mundane tasks. This application gamifies wellness, encouraging the user to have fun with daily tasks without becoming overwhelmed. Users are able to create, categorize, and prioritize tasks, in the hopes that nothing will fall through the cracks.'));
}

function setMenuTitle(titleText) {
    document.getElementById('title').innerHTML = titleText;
}

function setMessageText(messageText) {
    document.getElementById('message-text').innerHTML = messageText;
}

function createElement(type, attributes, values, innerHTML) {
    const element = document.createElement(type);
    for(let i = 0; i < attributes.length; i++) {
        element.setAttribute(attributes[i], values[i]);
    }
    if(innerHTML !== null) element.innerHTML = innerHTML;
    return element;
}