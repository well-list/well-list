import { initializeMainBanner } from "./control-header.js";
import { initializeTaskSection } from "./tasks.js";
import { updateRewardsSection } from "./rewards-section.js";
import * as data from "../data-access/data-access.js";

initializeMainBanner(data.getFocusedDate());
initializeTaskSection();
updateRewardsSection();