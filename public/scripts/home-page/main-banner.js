export function initializeMainBanner(date) {
    setMainBannerDateLabel(date);
    setUsernameLabel('username');
    document.getElementById('logout-button').addEventListener('click', () => {
        handleLogout();
    });
}

export function setMainBannerDateLabel(date) {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    document.getElementById('date-banner').innerHTML = date.toLocaleString("en-US", options);
}

function handleLogout() {
    console.log("Logout Button Pressed");
}

function setUsernameLabel(username) {
    const usernameLabel = document.getElementById('username-label')
    usernameLabel.innerHTML = username;
}