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
        const monthBefore = data.getFocusedDate().getMonth();
        data.changeToPreviousDay();
        setMainBannerDateLabel(data.getFocusedDate());
        if(monthBefore !== data.getFocusedDate().getMonth()) {
            data.setFocusedMonth(data.getFocusedDate());
            rewardsSection.updateRewardsSection();
        }
        tasks.loadPriorityTasksElements(data.getTasks());
    });
    document.getElementById('next-day-button').addEventListener('click', () => {
        const monthBefore = data.getFocusedDate().getMonth();
        data.changeToNextDay();
        setMainBannerDateLabel(data.getFocusedDate());
        if(monthBefore !== data.getFocusedDate().getMonth()) {
            data.setFocusedMonth(data.getFocusedDate());
            rewardsSection.updateRewardsSection();
        }
        tasks.loadPriorityTasksElements(data.getTasks());
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