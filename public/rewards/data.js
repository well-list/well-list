import * as params from '../params.js';
import * as utils from './utils.js';

const THEME = 'theme';
const POINTS = 'points';
const SHELF = 'shelf-data';
const PLANT_TYPE = 'plant-type';
const COLOR_TYPE = 'plant-color-type';

export const SHELF_ROWS = 4;
export const SHELF_COLUMNS = 7;
export const EMPTY_ID = -1;
export const VINE_PATHOS_ID = 5;

export const MOVE_SELECTION_MODE = 0;
export const SELL_SELECTION_MODE = 1;
export const BUY_SELECTION_MODE = 2;

var IS_INITIALIZED = false;

var REWARDS_DATA = {};
var FOCUSED_MONTH = utils.getCurrentMonth();

var SELECTION_MODE = params.DEFAULT_SELECTION_MODE;
var SELECTED_PLANT = params.DEFAULT_SELECTED_PLANT;
var SELECTED_PLANT_COLOR = params.DEFAULT_SELECTED_PLANT_COLOR;

export function clearSelectedSettings() {
    SELECTION_MODE = params.DEFAULT_SELECTION_MODE;
    SELECTED_PLANT = params.DEFAULT_SELECTED_PLANT;
    SELECTED_PLANT_COLOR = params.DEFAULT_SELECTED_PLANT_COLOR;
}

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

export function getDefaultSettingsForMonth() {
    const defualtMonthSettings = {};
    defualtMonthSettings[THEME] = params.DEFAULT_THEME;
    defualtMonthSettings[POINTS] = params.DEFAULT_POINTS;
    defualtMonthSettings[SHELF] = [];

    for(let r = 0; r < SHELF_ROWS; r++) {
        defualtMonthSettings[SHELF].push([]);
        for(let c = 0; c < SHELF_COLUMNS; c++) {
            const defaultShelfPlantSettings = {};
            defaultShelfPlantSettings[PLANT_TYPE] = EMPTY_ID;
            defaultShelfPlantSettings[COLOR_TYPE] = EMPTY_ID;
            defualtMonthSettings[SHELF][r].push(defaultShelfPlantSettings);
        }
    }

    return defualtMonthSettings;
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

export function isDefaultSelectionMode() {
    return SELECTION_MODE === params.DEFAULT_SELECTION_MODE;
}

export function isDefaultSelectedPlant() {
    return SELECTED_PLANT === params.DEFAULT_SELECTED_PLANT;
}

export function isDefaultSelectedColor() {
    return SELECTED_PLANT_COLOR === params.DEFAULT_SELECTED_PLANT_COLOR;
}

export function isShelfPositionEmpty(row, column) {
    return REWARDS_DATA[FOCUSED_MONTH][SHELF][row][column][PLANT_TYPE] === EMPTY_ID;
}

export function isPlantAffordable(plantID, colorID) {
    return getPlantCost(plantID, colorID) <= getPointsForFocusedMonth();
}

export function getPointsForFocusedMonth() {
    return REWARDS_DATA[FOCUSED_MONTH][POINTS];
}

export function getPlantCost(plantID, colorID) {
    return params.PLANT_COSTS[plantID][colorID];
}

export function getFocusedMonthPlantType(row, column) {
    return REWARDS_DATA[FOCUSED_MONTH][SHELF][row][column][PLANT_TYPE];
}

export function getFocusedMonthColorType(row, column) {
    return REWARDS_DATA[FOCUSED_MONTH][SHELF][row][column][COLOR_TYPE]
}

export function getRewardsDataAsString() {
    return JSON.stringify(REWARDS_DATA);
}

function updateFocusedMonth(month, year) {
    FOCUSED_MONTH = `${month}-${year}`;
    if(!REWARDS_DATA.hasOwnProperty(FOCUSED_MONTH)) {
        REWARDS_DATA[FOCUSED_MONTH] = getDefaultSettingsForMonth();
    }
    SELECTION_MODE = params.DEFAULT_SELECTION_MODE;
    SELECTED_PLANT = params.DEFAULT_SELECTED_PLANT;
    SELECTED_PLANT_COLOR = params.DEFAULT_SELECTED_PLANT_COLOR;
}