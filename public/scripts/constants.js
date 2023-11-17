export const DEFAULT_THEME = 3;
export const DEFAULT_POINTS = 9999;
export const DEFAULT_SELECTION_MODE = 0;
export const DEFAULT_SELECTED_PLANT = -1;
export const DEFAULT_SELECTED_PLANT_COLOR = 0;

// position in array corresponds to color variation id
const MONEY_PLANT_COSTS = [100, 150, 200, 100, 150, 200, 100, 150, 200, 100, 150, 200, 100, 150, 200, 100, 150, 200];
const MONEY_TREE_COSTS = [200, 250, 300, 200, 250, 300, 200, 250, 300, 200, 250, 300, 200, 250, 300, 200, 250, 300];
const BAMBOO_COSTS = [300, 350, 400, 300, 350, 400, 300, 350, 400, 300, 350, 400, 300, 350, 400, 300, 350, 400];
const ELM_BONZAI_COSTS = [400, 450, 500, 400, 450, 500, 400, 450, 500, 400, 450, 500, 400, 450, 500, 400, 450, 500];
const JUNIPER_BOMZAI_COSTS = [500, 550, 600, 500, 550, 600, 500, 550, 600, 500, 550, 600, 500, 550, 600, 500, 550, 600];
const VINED_PATHOS_COSTS = [600, 650, 700, 600, 650, 700, 600, 650, 700, 600, 650, 700, 600, 650, 700, 600, 650, 700];

// position in array corresponds to plant id
export const PLANT_COSTS = [
    MONEY_PLANT_COSTS,
    MONEY_TREE_COSTS,
    BAMBOO_COSTS,
    ELM_BONZAI_COSTS,
    JUNIPER_BOMZAI_COSTS,
    VINED_PATHOS_COSTS
]

export const SHELF_ROWS = 4;
export const SHELF_COLUMNS = 7;
export const EMPTY_ID = -1;
export const VINE_PATHOS_ID = 5;

export const MOVE_SELECTION_MODE = 0;
export const SELL_SELECTION_MODE = 1;
export const BUY_SELECTION_MODE = 2;

export const HIGH_PRIORITY = "high";
export const MEDIUM_PRIORITY = "medium";
export const LOW_PRIORITY = "low";
export const PRIORITIES = [HIGH_PRIORITY, MEDIUM_PRIORITY, LOW_PRIORITY];
export const TASK_LIMITS = {}
TASK_LIMITS[HIGH_PRIORITY] = 2;
TASK_LIMITS[MEDIUM_PRIORITY] = 3;
TASK_LIMITS[LOW_PRIORITY] = 5;

// Data Keys
export const TASK_ID = "_id";
export const USERNAME = "username";
export const PRIORITY = "priority";
export const DATE = "date";
export const DESCRIPTION = "description";
export const COMPLETED = "completed";

export const MONTH = "month";
export const POINTS = "points";
export const THEME = "theme";
export const PLANT_IDS = "plant_ids";
export const COLOR_IDS = "color_ids";