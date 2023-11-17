import { initializeMainBanner } from "./main-banner.js";
import { initializeTaskSection } from "./tasks.js";
import { updateRewardsSection } from "./rewards-section.js";
import * as data from "../data-access/data-access.js";

initializeMainBanner(data.getFocusedDate());
updateRewardsSection();

// export function handleDateChange() {

// }

// function handleMonthChange() {
    
// }