import * as constants from '../constants.js';
import * as utils from '../utils.js';

// TODO: implement remote data to work with database and switch implmentation
import * as data_connection from './local-data.js';
// import * as data_connection from './remote-data.js';

var LOGGED_IN_USER = null;
var FOCUSED_DATE = new Date();
var FOCUSED_DATE_STRING = utils.getDateString(new Date());
var FOCUSED_MONTH = utils.getMonthString(new Date());

var SELECTION_MODE = constants.DEFAULT_SELECTION_MODE;
var SELECTED_PLANT = constants.DEFAULT_SELECTED_PLANT;
var SELECTED_PLANT_COLOR = constants.DEFAULT_SELECTED_PLANT_COLOR;

var CACHED_REWARDS_DATA = null;

export function setLoggedInUser(username) {
    LOGGED_IN_USER = username;
}

export function changeToNextDay() {
    FOCUSED_DATE.setDate(FOCUSED_DATE.getDate()+1);
}

export function changeToPreviousDay() {
    FOCUSED_DATE.setDate(FOCUSED_DATE.getDate()-1);
}

export function getFocusedDate() {
    return FOCUSED_DATE;
}

export function getFocusedMonth() {
    return FOCUSED_MONTH;
}

export function setFocusedMonth(date) {
    FOCUSED_MONTH = utils.getMonthString(date);
    CACHED_REWARDS_DATA = null;
}

export function changeToNextMonth() {
    let month = parseInt(FOCUSED_MONTH.split('-')[1]);
    let year = parseInt(FOCUSED_MONTH.split('-')[0]);
    if(month >= 12) { year += 1; month = 1; }
    else { month += 1; }
    if(year <= 2025) { // only support years 2022-2024
        FOCUSED_MONTH = `${year}-${month}`;
        resetSelectedSettings();
        CACHED_REWARDS_DATA = null;
    }
}

export function changeToPreviousMonth() {
    let month = parseInt(FOCUSED_MONTH.split('-')[1]);
    let year = parseInt(FOCUSED_MONTH.split('-')[0]);
    if(month <= 1) { year -= 1; month = 12; }
    else { month -= 1; }
    if(year >= 2022) { // only support years 2022-2024
        FOCUSED_MONTH = `${year}-${month}`;
        resetSelectedSettings();
        CACHED_REWARDS_DATA = null;
    }
}

// selection settings

export function resetSelectedSettings() {
    SELECTION_MODE = constants.DEFAULT_SELECTION_MODE;
    SELECTED_PLANT = constants.DEFAULT_SELECTED_PLANT;
    SELECTED_PLANT_COLOR = constants.DEFAULT_SELECTED_PLANT_COLOR;
}

export function setSelectedPlant(plantID) {
    SELECTED_PLANT = plantID;
}

export function setSelectedPlantColor(colorID) {
    SELECTED_PLANT_COLOR = colorID;
}

export function getSelectedPlant() {
    return SELECTED_PLANT;
}

export function getSelectedPlantColor() {
    return SELECTED_PLANT_COLOR;
}

export function isPlantSelected() {
    return SELECTED_PLANT !== constants.EMPTY_ID;
}

export function isSelectedPlantVinePathos() {
    return SELECTED_PLANT !== constants.VINE_PATHOS_ID;
}

export function setSelectionMode(selectionMode) {
    SELECTION_MODE = selectionMode;
}

export function getSelectionMode() {
    return SELECTION_MODE;
}

export function isBuySelectionMode() {
    return SELECTION_MODE === constants.BUY_SELECTION_MODE;
}

export function isSellSelectionMode() {
    return SELECTION_MODE === constants.SELL_SELECTION_MODE;
}

export function isMoveSelectionMode() {
    return SELECTION_MODE === constants.MOVE_SELECTION_MODE;
}

// --- Data Updates ---

export function buyPlant(row, column, plantID, colorID) {
    CACHED_REWARDS_DATA = null;
    return data_connection.buyPlant(row, column, plantID, colorID, LOGGED_IN_USER, FOCUSED_MONTH);
}

export function sellPlant(row, column) {
    CACHED_REWARDS_DATA = null;
    return data_connection.sellPlant(row, column, LOGGED_IN_USER, FOCUSED_MONTH);
}

export function movePlant(originRow, originColumn, destinationRow, destinationColumn) {
    CACHED_REWARDS_DATA = null;
    return data_connection.movePlant(originRow, originColumn, destinationRow, destinationColumn, LOGGED_IN_USER, FOCUSED_MONTH);
}

export function setRewardsTheme(themeID) {
    CACHED_REWARDS_DATA = null;
    return data_connection.setRewardsTheme(themeID, LOGGED_IN_USER, FOCUSED_MONTH);
}

export function addNewTask(taskID, order, priority, description) {
    return data_connection.addNewTask(taskID, order, LOGGED_IN_USER, priority, description, FOCUSED_DATE_STRING);
}

export function updateTaskCompleteStatus(taskID, isCompleted) {
    return data_connection.updateTaskCompleteStatus(taskID, isCompleted, LOGGED_IN_USER, FOCUSED_MONTH);
}

export function removeTask(taskID) {
    return data_connection.removeTask(taskID);
}

export function updateTaskDescription(taskID, description) {
    return data_connection.updateTaskDescription(taskID, description);
}

export function clearTasks() {
    return data_connection.clearTasks(FOCUSED_DATE_STRING);
}

export function addTasks(tasks) {
    return data_connection.addTasks(tasks, FOCUSED_DATE_STRING);
}

// --- Data Retrieval ---

// gets all tasks for focused day
export function getTasks() {
    return data_connection.getTasks(FOCUSED_DATE_STRING);
}

// gets rewards data for focused month

export function getRewardsData() {
    if (CACHED_REWARDS_DATA === null) {
        CACHED_REWARDS_DATA = data_connection.getRewardsData(LOGGED_IN_USER, FOCUSED_MONTH);
    }
    return CACHED_REWARDS_DATA;
}

export function getRewardsTheme() {
    return getRewardsData()[constants.THEME];
}

export function getRewardsPoints() {
    return getRewardsData()[constants.POINTS];
}

export function getRewardsPlantIDs() {
    return getRewardsData()[constants.PLANT_IDS];
}

export function getRewardsColorIDs() {
    return getRewardsData()[constants.COLOR_IDS];
}

export function getRewardsPlantID(row, column) {
    return getRewardsData()[constants.PLANT_IDS][row][column];
}

export function getRewardsColorID(row, column) {
    return getRewardsData()[constants.COLOR_IDS][row][column];
}

export function isRewardsPositionEmpty(row, column) {
    return getRewardsPlantID(row, column) === constants.EMPTY_ID && getRewardsColorID(row, column) === constants.EMPTY_ID;
}

export function isPlantAffordable(plantID, colorID) {
    return getRewardsPoints() >= constants.PLANT_COSTS[plantID][colorID];
}