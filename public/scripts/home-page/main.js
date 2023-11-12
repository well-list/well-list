import { initializeMainBanner } from "./main-banner.js";
import { initializeTaskSection } from "./tasks.js";
import { loadRewardsSection } from "./rewards-section.js";

const focusedDate = new Date();

initializeMainBanner(focusedDate);
loadRewardsSection(focusedDate);

export function handleDateChange() {

}

function handleMonthChange() {
    
}