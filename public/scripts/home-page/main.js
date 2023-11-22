import { initializeMainBanner } from "./control-header.js";
import { initializeTaskSection } from "./tasks.js";
import { updateRewardsSection } from "./rewards-section.js";
import * as data from "../data-access/data-access.js";

let params = (new URL(document.location)).searchParams;
data.setLoggedInUser(params.get('user'));

initializeMainBanner(data.getFocusedDate());
initializeTaskSection();
updateRewardsSection();