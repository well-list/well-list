import * as constants from "../constants.js";
import * as data from "../data-access/data-access.js";
import { createElement, uuidv4 } from "../utils.js";

var EDIT_MENU_IN_FOCUS = null; // null or priority
var ADDED_TASKS_BY_PRIORITY = {}; // list of added taskIDs
var COMPLETED_TASKS_BY_PRIORITY = {}; // list of completed taskIDs

export function initializeTaskSection() {
    resetTaskCounters();
    for(let i = 0; i < constants.PRIORITIES.length; i++) {
        initializePrioritySection(constants.PRIORITIES[i]);
    }
    loadPriorityTasksElements(data.getTasks());
}

export function loadPriorityTasksElements(tasks) {
    resetTaskCounters();
}

function initializePrioritySection(priority) {
    const addButtonID = `${priority}-priority-add-task-button`;
    document.getElementById(addButtonID).addEventListener('click', () => {
        handleAddTaskButtonPressed(priority);
    });
}

function resetTaskCounters() {
    for(let i = 0; i < constants.PRIORITIES.length; i++) {
        ADDED_TASKS_BY_PRIORITY[constants.PRIORITIES[i]] = [];
        COMPLETED_TASKS_BY_PRIORITY[constants.PRIORITIES[i]] = [];
    }
}

function updateCompletedStatusLabel(priority) {
    document.getElementById(`${priority}-priority-status`).innerHTML
        = `Completed ${COMPLETED_TASKS_BY_PRIORITY[priority].length}/${ADDED_TASKS_BY_PRIORITY[priority].length}`;
}

function handleAddTaskButtonPressed(priority) {
    if (EDIT_MENU_IN_FOCUS) {
        removeEditControlsElement()
    }
    const taskContainer = document.getElementById(`${priority}-priority-tasks-container`);
    if (ADDED_TASKS_BY_PRIORITY[priority].length === 0) {
        taskContainer.replaceChildren();
    }
    taskContainer.appendChild(
        getEditControlsElement(null, priority)
    );
    document.getElementById('edit-task-text-area').focus();
    EDIT_MENU_IN_FOCUS = priority;
}

function handleTaskCompletedChange(taskID, isCompleted, priority) {
    if(isCompleted) {
        COMPLETED_TASKS_BY_PRIORITY[priority].push(taskID);
    }
    else {
        COMPLETED_TASKS_BY_PRIORITY[priority].splice(COMPLETED_TASKS_BY_PRIORITY[priority].indexOf(taskID), 1);
    }
    updateCompletedStatusLabel(priority);
}

function handleEditButtonPressed(taskID, description, priority) {
    document.getElementById(taskID).replaceWith(
        getEditControlsElement(taskID, priority)
    );
    document.getElementById('edit-task-text-area').value = description;
    EDIT_MENU_IN_FOCUS = priority;
}

function handleSaveTaskButtonPressed(taskID, priority) {
    const isNewTask = taskID === null;
    const description = document.getElementById('edit-task-text-area').value;

    if(isNewTask) { taskID = uuidv4(); }
    document.getElementById('edit-controls-container').replaceWith(
        getTaskElement(taskID, description, priority)
    );
    EDIT_MENU_IN_FOCUS = null;
    if(isNewTask) {
        ADDED_TASKS_BY_PRIORITY[priority].push(taskID);
        if(ADDED_TASKS_BY_PRIORITY[priority].length === constants.TASK_LIMITS[priority]) {
            const addButtonID = `${priority}-priority-add-task-button`;
            document.getElementById(addButtonID).style.display = 'none';
        }
    }
    else if(COMPLETED_TASKS_BY_PRIORITY[priority].includes(taskID)) {
        console.log(COMPLETED_TASKS_BY_PRIORITY)
        document.getElementById(`${taskID}-checkbox`).checked = true;
    }
    updateCompletedStatusLabel(priority);
}

function handleCancelTaskButtonPressed(taskID, priority) {
    document.getElementById(`${priority}-priority-add-task-button`).style.display = 'block';
    if (taskID == null) {
        removeEditControlsElement();
        EDIT_MENU_IN_FOCUS = null;
        return;
    }
    const addedIdx = ADDED_TASKS_BY_PRIORITY[priority].indexOf(taskID);
    if (addedIdx !== -1) ADDED_TASKS_BY_PRIORITY[priority].splice(addedIdx, 1);
    const completedIdx = COMPLETED_TASKS_BY_PRIORITY[priority].indexOf(taskID);
    if (completedIdx !== -1) COMPLETED_TASKS_BY_PRIORITY[priority].splice(completedIdx, 1);
    removeEditControlsElement();
    updateCompletedStatusLabel(priority);
    EDIT_MENU_IN_FOCUS = null;
    // handle task deleted
}

function removeEditControlsElement() {
    const editContainer = document.getElementById('edit-controls-container');
    if(EDIT_MENU_IN_FOCUS !== null && ADDED_TASKS_BY_PRIORITY[EDIT_MENU_IN_FOCUS].length === 0) {
        const priority_label = EDIT_MENU_IN_FOCUS.charAt(0).toUpperCase() + EDIT_MENU_IN_FOCUS.slice(1);
        editContainer.parentElement.appendChild(
            createElement('div', ['class'], ['no-tasks-label'], `No ${priority_label} Priority Tasks Yet`)
        );
    }
    editContainer.remove();
}

function getTaskElement(taskID, description, priority) {
    const taskContainer = createElement(
        'div', ['id', 'class'], [taskID, 'task-container'], null
    );
    const leftSideContainer = createElement(
        'div', ['class'], ['task-description'], null
    );
    const rightSideContainer = createElement(
        'div', ['class'], ['task-controls'], null
    );
    const bulletElement = createElement(
        'div', ['class'], ['bullet'], '-'
    );
    const descriptionElement = createElement(
        'div', ['class'], ['text'], description
    );
    const checkboxElement = createElement(
        'input', ['type', 'id', 'name', 'value'], ['checkbox', `${taskID}-checkbox`, 'completed', taskID], null
    );
    const editButton = createElement(
        'div', ['class'], ['edit-button'], 'edit'
    );

    checkboxElement.addEventListener('change', () => {
        handleTaskCompletedChange(taskID, checkboxElement.checked, priority);
    });
    editButton.addEventListener('click', () => {
        handleEditButtonPressed(taskID, description, priority);
    });

    leftSideContainer.appendChild(bulletElement);
    leftSideContainer.appendChild(descriptionElement);
    taskContainer.appendChild(leftSideContainer);
    rightSideContainer.appendChild(checkboxElement);
    rightSideContainer.appendChild(editButton);
    taskContainer.appendChild(rightSideContainer);
    return taskContainer;
}

function getEditControlsElement(taskID, priority) {
    const cancelButtonLabel = (taskID === null) ? 'cancel' : 'delete';

    const editControlsContainer = createElement(
        'div', ['id', 'class'], ['edit-controls-container', 'task-container'], null
    );
    const leftSideContainer = createElement(
        'div', ['class'], ['task-description'], null
    );
    const rightSideContainer = createElement(
        'div', ['class'], ['edit-controls'], null
    );
    const bulletElement = createElement(
        'div', ['class'], ['bullet'], '-'
    );
    const editTextArea = createElement(
        'textarea', ['id', 'name', 'rows', 'cols'], ['edit-task-text-area', '2', '50'], null
    );
    const saveButton = createElement(
        'div', ['class'], ['save-button'], 'save'
    );
    const cancelButton = createElement(
        'div', ['class'], ['cancel-button'], cancelButtonLabel
    );

    editControlsContainer.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSaveTaskButtonPressed(taskID, priority);
        }
    });
    saveButton.addEventListener('click', () => {
        handleSaveTaskButtonPressed(taskID, priority);
    });
    cancelButton.addEventListener('click', () => {
        handleCancelTaskButtonPressed(taskID, priority);
    });

    leftSideContainer.appendChild(bulletElement);
    leftSideContainer.appendChild(editTextArea);
    editControlsContainer.appendChild(leftSideContainer);
    rightSideContainer.appendChild(saveButton);
    rightSideContainer.appendChild(cancelButton);
    editControlsContainer.appendChild(rightSideContainer);
    return editControlsContainer;
}