import * as constants from '../constants.js';
import * as utils from './utils.js';

// TODO: implement remote data to work with database and switch implmentation
import * as data_connection from './local-data.js';
// import * as data_connection from './remote-data.js';

var FOCUSED_DATE = new Date();
var FOCUSED_DATE_STRING = utils.getDateString(new Date());
var FOCUSED_MONTH = utils.getMonthString(new Date());

export var SELECTION_MODE = constants.DEFAULT_SELECTION_MODE;
export var SELECTED_PLANT = constants.DEFAULT_SELECTED_PLANT;
export var SELECTED_PLANT_COLOR = constants.DEFAULT_SELECTED_PLANT_COLOR;

export function resetSelectedSettings() {
    SELECTION_MODE = constants.DEFAULT_SELECTION_MODE;
    SELECTED_PLANT = constants.DEFAULT_SELECTED_PLANT;
    SELECTED_PLANT_COLOR = constants.DEFAULT_SELECTED_PLANT_COLOR;
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

export function setFocusedMonth(date) {
    FOCUSED_MONTH = utils.getMonthString(date);
}

export function changeToNextMonth() {
    let month = parseInt(FOCUSED_MONTH.split('-')[0]);
    let year = parseInt(FOCUSED_MONTH.split('-')[1]);
    if(month >= 12) { year += 1; month = 1; }
    else { month += 1; }
    if(year <= 2025) { // only support years 2022-2024
        FOCUSED_MONTH = `${month}-${year}`;
        resetSelectedSettings()
    }
}

export function changeToPreviousMonth() {
    let month = parseInt(FOCUSED_MONTH.split('-')[0]);
    let year = parseInt(FOCUSED_MONTH.split('-')[1]);
    if(month <= 1) { year -= 1; month = 12; }
    else { month -= 1; }
    if(year >= 2022) { // only support years 2022-2024
        FOCUSED_MONTH = `${month}-${year}`;
        resetSelectedSettings()
    }
}

// --- Data Updates ---

export function buyPlant(row, column, plantID, colorID) {
    return data_connection.buyPlant(row, column, plantID, colorID, FOCUSED_MONTH);
}

export function sellPlant(row, column) {
    return data_connection.sellPlant(row, column, FOCUSED_MONTH);
}

export function movePlant(originRow, originColumn, destinationRow, destinationColumn) {
    return data_connection.movePlant(originRow, originColumn, destinationRow, destinationColumn, FOCUSED_MONTH);
}

export function addNewTask(task_id, order, username, priority, description) {
    return data_connection.addNewTask(task_id, order, username, priority, description, FOCUSED_DATE_STRING);
}

export function updateTaskCompleteStatus(task_id, isCompleted) {
    return data_connection.updateTaskCompleteStatus(task_id, isCompleted);
}

export function removeTask(task_id) {
    return data_connection.removeTask(task_id);
}

export function updateTaskDescription(task_id, description) {
    return data_connection.updateTaskDescription(task_id, description);
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
    return data_connection.getRewardsData(FOCUSED_MONTH);
}