import * as constants from '../constants.js';

export function buyPlant(row, column, plantID, colorID, month) {

}

export function sellPlant(row, column, month) {

}

export function movePlant(originRow, originColumn, destinationRow, destinationColumn, month) {

}

export function addNewTask(task_id, order, username, priority, description, date) {

}

export function updateTaskCompleteStatus(task_id, isCompleted) {

}

export function removeTask(task_id) {

}

export function updateTaskDescription(task_id, description) {

}

export function clearTasks(date) {

}

export function addTasks(tasks, date) {

}

export function getTasks(date) {

}

export function getRewardsData(month) {

}

// ------------------------ OLD LOCAL DATA ------------------------

import * as utils from './utils.js';

var TASK_COLLECTION = [];
var REWARDS_COLLECTION = [];

export function setRewardsData(rewardsData) {
    REWARDS_DATA = rewardsData;
    IS_INITIALIZED = true;
}

export function initializeDefaultRewardsData() {
    if(!IS_INITIALIZED) {
        const currentMonth = utils.getCurrentMonth();
        REWARDS_DATA[currentMonth] = getDefaultSettingsForMonth();
        FOCUSED_MONTH = currentMonth;
        IS_INITIALIZED = true;
    }
}

export function getDefaultMonthRewardData() {
    const defaultMonthData = {};
    defaultMonthData[THEME] = constants.DEFAULT_THEME;
    defaultMonthData[POINTS] = constants.DEFAULT_POINTS;
    defaultMonthData[PLANT_IDS] = [];
    defaultMonthData[COLOR_IDS] = [];

    for(let r = 0; r < SHELF_ROWS; r++) {
        defaultMonthData[PLANT_IDS].push([]);
        defaultMonthData[COLOR_IDS].push([]);
        for(let c = 0; c < SHELF_COLUMNS; c++) {
            const defaultShelfPlantSettings = {};
            defaultShelfPlantSettings[PLANT_TYPE] = EMPTY_ID;
            defaultShelfPlantSettings[COLOR_TYPE] = EMPTY_ID;
            defaultMonthData[SHELF][r].push(defaultShelfPlantSettings);
        }
    }

    return defaultMonthData;
}

export function setFocusedMonthTheme(themeID) {
    REWARDS_DATA[FOCUSED_MONTH][THEME] = themeID;
}

export function getFocusedMonthTheme() {
    return REWARDS_DATA[FOCUSED_MONTH][THEME];
}

export function getFocusedMonthPoints() {
    return REWARDS_DATA[FOCUSED_MONTH][POINTS];
}

export function getFocusedMonthShelfData() {
    return REWARDS_DATA[FOCUSED_MONTH][SHELF];
}

export function getFocusedMonth() {
    return FOCUSED_MONTH;
}

export function setSelectedPlant(plantID) {
    SELECTED_PLANT = plantID;
}

export function getSelectedPlant() {
    return SELECTED_PLANT;
}

export function setSelectedPlantColor(colorID) {
    SELECTED_PLANT_COLOR = colorID;
}

export function getSelectedPlantColor() {
    return SELECTED_PLANT_COLOR;
}

export function setSelectionMode(selectionMode) {
    SELECTION_MODE = selectionMode;
}

export function getSelectionMode() {
    return SELECTION_MODE;
}

export function changeToNextMonth() {
    let month = parseInt(FOCUSED_MONTH.split('-')[0]);
    let year = parseInt(FOCUSED_MONTH.split('-')[1]);
    if(month >= 12) { year += 1; month = 1; }
    else { month += 1; }
    if(year <= 2025) updateFocusedMonth(month, year);
}

export function changeToPreviousMonth() {
    let month = parseInt(FOCUSED_MONTH.split('-')[0]);
    let year = parseInt(FOCUSED_MONTH.split('-')[1]);
    if(month <= 1) { year -= 1; month = 12; }
    else { month -= 1; }
    if(year >= 2022) updateFocusedMonth(month, year);
}

export function buyPlant(row, column, plantID, colorID) {
    if (isPlantAffordable(plantID, colorID)) {
        REWARDS_DATA[FOCUSED_MONTH][SHELF][row][column][PLANT_TYPE] = plantID;
        REWARDS_DATA[FOCUSED_MONTH][SHELF][row][column][COLOR_TYPE] = colorID;
        REWARDS_DATA[FOCUSED_MONTH][POINTS] -= getPlantCost(plantID, colorID);
    }
}

export function sellPlant(row, column) {
    const plantID = REWARDS_DATA[FOCUSED_MONTH][SHELF][row][column][PLANT_TYPE];
    const colorID = REWARDS_DATA[FOCUSED_MONTH][SHELF][row][column][COLOR_TYPE];
    REWARDS_DATA[FOCUSED_MONTH][SHELF][row][column][PLANT_TYPE] = EMPTY_ID;
    REWARDS_DATA[FOCUSED_MONTH][SHELF][row][column][COLOR_TYPE] = EMPTY_ID;
    REWARDS_DATA[FOCUSED_MONTH][POINTS] += getPlantCost(plantID, colorID);
}

export function movePlant(movePlantOrigin, movePlantDestination) {
    const plantID = REWARDS_DATA[FOCUSED_MONTH][SHELF][movePlantOrigin['row']][movePlantOrigin['column']][PLANT_TYPE];
    const colorID = REWARDS_DATA[FOCUSED_MONTH][SHELF][movePlantOrigin['row']][movePlantOrigin['column']][COLOR_TYPE];
    REWARDS_DATA[FOCUSED_MONTH][SHELF][movePlantDestination['row']][movePlantDestination['column']][PLANT_TYPE] = plantID;
    REWARDS_DATA[FOCUSED_MONTH][SHELF][movePlantDestination['row']][movePlantDestination['column']][COLOR_TYPE] = colorID;
    REWARDS_DATA[FOCUSED_MONTH][SHELF][movePlantOrigin['row']][movePlantOrigin['column']][PLANT_TYPE] = EMPTY_ID;
    REWARDS_DATA[FOCUSED_MONTH][SHELF][movePlantOrigin['row']][movePlantOrigin['column']][COLOR_TYPE] = EMPTY_ID;
}

export function isPlantAffordable(plantID, colorID) {
    return getPlantCost(plantID, colorID) <= getPointsForFocusedMonth();
}

export function isShelfPositionEmpty(row, column) {
    return REWARDS_DATA[FOCUSED_MONTH][SHELF][row][column][PLANT_TYPE] === EMPTY_ID;
}

export function getPointsForFocusedMonth() {
    return REWARDS_DATA[FOCUSED_MONTH][POINTS];
}

export function getPlantCost(plantID, colorID) {
    return constants.PLANT_COSTS[plantID][colorID];
}

export function getFocusedMonthPlantType(row, column) {
    return REWARDS_DATA[FOCUSED_MONTH][SHELF][row][column][PLANT_TYPE];
}

export function getFocusedMonthColorType(row, column) {
    return REWARDS_DATA[FOCUSED_MONTH][SHELF][row][column][COLOR_TYPE]
}