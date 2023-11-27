import * as data from "../data-access/data-access.js";
import * as rewardsSection from "./rewards-section.js";
import * as tasks from "./tasks.js";

export function initializeMainBanner(date) {
    setMainBannerDateLabel(date);
    setUsernameLabel(data.getLoggedInUser());
    
    document.getElementById('logout-button').addEventListener('click', () => {
        handleLogout();
    });
    document.getElementById('previous-day-button').addEventListener('click', () => {
        handleDaySwitch(true, false);
    });
    document.getElementById('next-day-button').addEventListener('click', () => {
        handleDaySwitch(false, true);
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

function handleDaySwitch(switchToPrevious, switchToNext) {
    const monthBefore = data.getFocusedDate().getMonth();
    if(switchToPrevious) data.changeToPreviousDay();
    if(switchToNext) data.changeToNextDay();
    setMainBannerDateLabel(data.getFocusedDate());
    if(monthBefore !== data.getFocusedDate().getMonth()) {
        data.setFocusedMonth(data.getFocusedDate());
        rewardsSection.updateRewardsSection();
    }
    tasks.loadPriorityTasksElements(data.getTasks());
}

function handleLogout() {
    console.log("Logout Button Pressed");
    window.location.href = `/`;
}

function setUsernameLabel(username) {
    const usernameLabel = document.getElementById('username-label')
    usernameLabel.innerHTML = username;
}