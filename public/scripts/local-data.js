import * as constants from '../constants.js';

var TASK_COLLECTION = [];
var REWARDS_COLLECTION = [];

export function buyPlant(row, column, plantID, colorID, username, month) {
    const rewardsElement = getRewardsData(username, month);
    const plantCost = constants.PLANT_COSTS[plantID][colorID];
    if(rewardsElement[constants.POINTS] >= plantCost && isPositionFree(rewardsElement, row, column)) {
        const updatedPoints = rewardsElement[constants.POINTS] - plantCost;
        const updatedPlantIDs = rewardsElement[constants.PLANT_IDS];
        const updatedColorIDs = rewardsElement[constants.COLOR_IDS];
        updatedPlantIDs[row][column] = plantID;
        updatedColorIDs[row][column] = colorID;
        // update data
        const rewardsElementIndex = getElementIndex(
            REWARDS_COLLECTION,
            [constants.USERNAME, constants.MONTH],
            [username, month]
        );
        REWARDS_COLLECTION[rewardsElementIndex][constants.POINTS] = updatedPoints;
        REWARDS_COLLECTION[rewardsElementIndex][constants.PLANT_IDS] = updatedPlantIDs;
        REWARDS_COLLECTION[rewardsElementIndex][constants.COLOR_IDS] = updatedColorIDs;
        return true;
    }
    return false;
}

export function sellPlant(row, column, username, month) {
    const rewardsElement = getRewardsData(username, month);
    if(!isPositionFree(rewardsElement, row, column)) {
        const plantCost = constants.PLANT_COSTS[plantID][colorID];
        const updatedPoints = rewardsElement[constants.POINTS] + plantCost;
        const updatedPlantIDs = rewardsElement[constants.PLANT_IDS];
        const updatedColorIDs = rewardsElement[constants.COLOR_IDS];
        updatedPlantIDs[row][column] = constants.EMPTY_ID;
        updatedColorIDs[row][column] = constants.EMPTY_ID;
        // update data
        const rewardsElementIndex = getElementIndex(
            REWARDS_COLLECTION,
            [constants.USERNAME, constants.MONTH],
            [username, month]
        );
        REWARDS_COLLECTION[rewardsElementIndex][constants.POINTS] = updatedPoints;
        REWARDS_COLLECTION[rewardsElementIndex][constants.PLANT_IDS] = updatedPlantIDs;
        REWARDS_COLLECTION[rewardsElementIndex][constants.COLOR_IDS] = updatedColorIDs;
        return true;
    }
    return false;
}

export function movePlant(originRow, originColumn, destinationRow, destinationColumn, username, month) {
    const rewardsElement = getRewardsData(username, month);
    if(!isPositionFree(rewardsElement, originRow, originColumn) && isPositionFree(destinationRow, destinationColumn)) {
        const updatedPlantIDs = rewardsElement[constants.PLANT_IDS];
        const updatedColorIDs = rewardsElement[constants.COLOR_IDS];
        updatedPlantIDs[destinationRow][destinationColumn] = updatedPlantIDs[originRow][originColumn]
        updatedColorIDs[destinationRow][destinationColumn] = updatedColorIDs[originRow][originColumn]
        updatedPlantIDs[originRow][originColumn] = constants.EMPTY_ID;
        updatedColorIDs[originRow][originColumn] = constants.EMPTY_ID;
        // update data
        const rewardsElementIndex = getElementIndex(
            REWARDS_COLLECTION,
            [constants.USERNAME, constants.MONTH],
            [username, month]
        );
        REWARDS_COLLECTION[rewardsElementIndex][constants.PLANT_IDS] = updatedPlantIDs;
        REWARDS_COLLECTION[rewardsElementIndex][constants.COLOR_IDS] = updatedColorIDs;
    }
    return false;
}

export function addNewTask(task_id, order, username, priority, description, date) {
    taskElement = createTaskElement(task_id, order, username, priority, description, date);
    TASK_COLLECTION.push(taskElement);
}

export function updateTaskCompleteStatus(task_id, isCompleted) {
    const taskIndex = getElementIndex(TASK_COLLECTION, [constants.TASK_ID], [task_id]);
    TASK_COLLECTION[taskIndex][constants.COMPLETED] = isCompleted;
}

export function removeTask(task_id) {
    const taskIndex = getElementIndex(TASK_COLLECTION, [constants.TASK_ID], [task_id]);
    TASK_COLLECTION.splice(taskIndex, 1);
}

export function updateTaskDescription(task_id, description) {
    const taskIndex = getElementIndex(TASK_COLLECTION, [constants.TASK_ID], [task_id]);
    TASK_COLLECTION[taskIndex][constants.DESCRIPTION] = description;
}

export function clearTasks(username, date) {
    const matchingElementsIndexes = getElementIndexes(
        TASK_COLLECTION,
        [constants.USERNAME, constants.DATE],
        [username, date]
    );
    for (let i = 0; i < matchingElementsIndexes.length; i++) {
        TASK_COLLECTION.splice(matchingElementsIndexes[i], 1);
    }
}

// for paste functionality, make sure task_ids and dates are updated before calling
export function addTasks(tasks) {
    for(let i = 0; i < tasks.length; i++) {
        TASK_COLLECTION.push(tasks[i]);
    }
}

export function getTasks(username, date) {
    return getAllElementsWithMatchingKeyValues(
        TASK_COLLECTION,
        [constants.USERNAME, constants.DATE],
        [username, date]
    );
}

export function getRewardsData(username, month) {
    rewardsIndex = getElementIndex(
        REWARDS_COLLECTION,
        [constants.USERNAME, constants.MONTH],
        [username, month]
        );
    if(rewardsIndex === -1) {
        REWARDS_COLLECTION.push(createDefaultRewardsElement(username, month));
        return REWARDS_COLLECTION[REWARDS_COLLECTION.length-1];
    }
    return REWARDS_COLLECTION[rewardsIndex];
}

function isPositionFree(rewardsElement, row, column) {
    return rewardsElement[constants.PLANT_IDS][row] == constants.EMPTY_ID &&
            rewardsElement[constants.COLOR_IDS][row] == constants.EMPTY_ID;
}

function createTaskElement(task_id, order, username, priority, description, date) {
    task = {};
    task[`${constants.TASK_ID}`] = task_id;
    task[`${constants.ORDER}`] = order;
    task[`${constants.USERNAME}`] = username;
    task[`${constants.PRIORITY}`] = priority;
    task[`${constants.DESCRIPTION}`] = description;
    task[`${constants.DATE}`] = date;
    return task;
}

function createDefaultRewardsElement(username, month) {
    defaultRewards = {};
    defaultRewards[`${constants.USERNAME}`] = username;
    defaultRewards[`${constants.MONTH}`] = month;
    defaultRewards[`${constants.POINTS}`] = constants.DEFAULT_POINTS;
    defaultRewards[`${constants.THEME}`] = constants.DEFAULT_THEME;
    [plant_ids, color_ids] = getEmptyShelfData()
    defaultRewards[`${constants.PLANT_IDS}`] = plant_ids;
    defaultRewards[`${constants.COLOR_IDS}`] = color_ids;
    return defaultRewards;
}

function getEmptyShelfData() {
    [plant_ids, color_ids] = [], []
    for(let r = 0; r < constants.SHELF_ROWS; r++) {
        plant_ids.push([]);
        color_ids.push([]);
        for(let c = 0; c < constants.SHELF_COLUMNS; c++) {
            plant_ids[r].push(constants.EMPTY_ID);
            color_ids[r].push(constants.EMPTY_ID);
        }
    }
    return [plant_ids, color_ids]
}


function getAllElementsWithMatchingKeyValues(jsonArray, keys, values) {
    const matchingElementsIndexes = getElementIndexes(jsonArray, keys, values);
    const matchingElements = [];
    for (let i = 0; i < matchingElementsIndexes.length; i++) {
        matchingElements.push(jsonArray[matchingElementsIndexes[i]]);
    }
    return matchingElements;
}

function getElementIndex(jsonArray, keys, values) {
    return getElementIndexes(jsonArray, keys, values)[0];
}

function getElementIndexes(jsonArray, keys, values) {
    const elementIndexes = [];
    if (keys.length !== values.length) {
        return elementIndexes;
    }

    for (let i = 0; i < jsonArray.length; i++) {
        keyValuesEqual = Array(keys.length).fill(false);
        for (let j = 0; j < keys.length; j++) {
            if (jsonArray[i][keys[j]] === values[j]) {
                keyValuesEqual[j] = true;
            }
        }
        if (!keyValuesEqual.includes(false)) {
            elementIndexes.push(i);
        }
    }
    return elementIndexes;
}