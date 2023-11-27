import * as constants from "../constants.js";
import * as data from "../data-access/data-access.js";
import { createElement, uuidv4 } from "../utils.js";
import { updatePointsEarnedLabel } from "./rewards-section.js";

var EDIT_MENU_IN_FOCUS = null; // null or priority
var ADDED_TASKS_BY_PRIORITY = {}; // list of added taskIDs
var COMPLETED_TASKS_BY_PRIORITY = {}; // list of completed taskIDs
var FOCUSED_STICKY = null;
var NO_SELECTED = false;
var COPIED_TASKS = [];

export function initializeTaskSection() {
    EDIT_MENU_IN_FOCUS = null;
    ADDED_TASKS_BY_PRIORITY = {};
    COMPLETED_TASKS_BY_PRIORITY = {};
    FOCUSED_STICKY = null;
    NO_SELECTED = false;
    COPIED_TASKS = [];

    loadPriorityTasksElements(data.getTasks());
    for(let i = 0; i < constants.PRIORITIES.length; i++) {
        initializePrioritySection(constants.PRIORITIES[i]);
    }
    const stickyTypes = ['clear', 'copy', 'paste'];
    for(let i = 0; i < stickyTypes.length; i++) {
        document.getElementById(`${stickyTypes[i]}-sticky`).addEventListener('click', () => {
            handleStickySelected(stickyTypes[i]);
        });
    }
}

export function loadPriorityTasksElements(tasks) {
    resetTaskCounters();
    // sort tasks by order
    tasks.sort(function(a,b){ 
        let x = a[constants.ORDER] < b[constants.ORDER] ? -1:1; 
        return x; 
    });
    // clear task containers
    for(let i = 0; i < constants.PRIORITIES.length; i++) {
        document.getElementById(`${constants.PRIORITIES[i]}-priority-tasks-container`).replaceChildren()
    }
    // add tasks
    for(let i = 0; i < tasks.length; i++) {
        const taskID = tasks[i][constants.TASK_ID];
        const priority = tasks[i][constants.PRIORITY];
        const description = tasks[i][constants.DESCRIPTION];
        const isCompleted = tasks[i][constants.COMPLETED];
        document.getElementById(`${priority}-priority-tasks-container`).appendChild(
            getTaskElement(taskID, description, priority)
        );
        ADDED_TASKS_BY_PRIORITY[priority].push(taskID);
        if(isCompleted) {
            COMPLETED_TASKS_BY_PRIORITY[priority].push(taskID);
            document.getElementById(`${taskID}-checkbox`).checked = true;
        }
    }
    // handle no tasks for priority category
    for(let i = 0; i < constants.PRIORITIES.length; i++) {
        updateCompletedStatusLabel(constants.PRIORITIES[i])
        if(ADDED_TASKS_BY_PRIORITY[constants.PRIORITIES[i]].length === 0) {
            const priority_label = constants.PRIORITIES[i].charAt(0).toUpperCase() + constants.PRIORITIES[i].slice(1);
            document.getElementById(`${constants.PRIORITIES[i]}-priority-tasks-container`).appendChild(
                createElement('div', ['class'], ['no-tasks-label'], `No ${priority_label} Priority Tasks Yet`)
            );
        }
    }
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
    if (EDIT_MENU_IN_FOCUS) { removeEditControlsElement(priority); }
    const taskContainer = document.getElementById(`${priority}-priority-tasks-container`);
    if (ADDED_TASKS_BY_PRIORITY[priority].length === 0) { taskContainer.replaceChildren(); }
    taskContainer.appendChild(getEditControlsElement(null, priority));
    document.getElementById('edit-task-text-area').focus();
    EDIT_MENU_IN_FOCUS = priority;
}

function handleTaskCompletedChange(taskID, isCompleted, priority) {
    if(isCompleted) { COMPLETED_TASKS_BY_PRIORITY[priority].push(taskID); }
    else { COMPLETED_TASKS_BY_PRIORITY[priority].splice(COMPLETED_TASKS_BY_PRIORITY[priority].indexOf(taskID), 1); }
    updateCompletedStatusLabel(priority);
    data.updateTaskCompleteStatus(taskID, isCompleted);
    updatePointsEarnedLabel();
}

function handleEditButtonPressed(taskID, description, priority) {
    if (EDIT_MENU_IN_FOCUS) { return; }
    document.getElementById(taskID).replaceWith(getEditControlsElement(taskID, priority));
    document.getElementById('edit-task-text-area').value = description;
    EDIT_MENU_IN_FOCUS = priority;
}

function handleSaveTaskButtonPressed(taskID, priority) {
    const isNewTask = taskID === null;
    const description = document.getElementById('edit-task-text-area').value;
    EDIT_MENU_IN_FOCUS = null;
    if(isNewTask) { taskID = uuidv4(); }

    document.getElementById('edit-controls-container').replaceWith(
        getTaskElement(taskID, description, priority)
    );
    if(COMPLETED_TASKS_BY_PRIORITY[priority].includes(taskID)) {
        document.getElementById(`${taskID}-checkbox`).checked = true;
    }

    if(isNewTask) { handleTaskAdded(taskID, description, priority); }
    else { handleDescriptionUpdated(taskID, description); }
}

function handleCancelTaskButtonPressed(taskID, priority) {
    document.getElementById(`${priority}-priority-add-task-button`).style.display = 'block';
    EDIT_MENU_IN_FOCUS = null;
    if (taskID == null) {
        removeEditControlsElement(priority);
        return;
    }
    handleTaskDeleted(taskID, priority);
}

function handleDescriptionUpdated(taskID, description) {
    data.updateTaskDescription(taskID, description);
}

function handleTaskAdded(taskID, description, priority) {
    ADDED_TASKS_BY_PRIORITY[priority].push(taskID);
    if(ADDED_TASKS_BY_PRIORITY[priority].length === constants.TASK_LIMITS[priority]) {
        const addButtonID = `${priority}-priority-add-task-button`;
        document.getElementById(addButtonID).style.display = 'none';
    }
    const order = ADDED_TASKS_BY_PRIORITY[priority].indexOf(taskID);
    data.addNewTask(taskID, order, priority, description);
    updateCompletedStatusLabel(priority);
}

function handleTaskDeleted(taskID, priority) {
    const addedIdx = ADDED_TASKS_BY_PRIORITY[priority].indexOf(taskID);
    if (addedIdx !== -1) ADDED_TASKS_BY_PRIORITY[priority].splice(addedIdx, 1);
    const completedIdx = COMPLETED_TASKS_BY_PRIORITY[priority].indexOf(taskID);
    if (completedIdx !== -1) { COMPLETED_TASKS_BY_PRIORITY[priority].splice(completedIdx, 1); }
    removeEditControlsElement(priority);
    updateCompletedStatusLabel(priority);
    data.deleteTask(taskID);
    updatePointsEarnedLabel();
}

function removeEditControlsElement(priority) {
    const editContainer = document.getElementById('edit-controls-container');
    if(ADDED_TASKS_BY_PRIORITY[priority].length === 0) {
        const priority_label = priority.charAt(0).toUpperCase() + priority.slice(1);
        editContainer.parentElement.appendChild(
            createElement('div', ['class'], ['no-tasks-label'], `No ${priority_label} Priority Tasks Yet`)
        );
    }
    editContainer.remove();
}

function handleStickySelected(type) {
    if(NO_SELECTED) {
        NO_SELECTED = false;
        return;
    }

    if (FOCUSED_STICKY !== null) {
        resetSticky(FOCUSED_STICKY);
    }

    const sticky = document.getElementById(`${type}-sticky`);
    sticky.replaceChildren();

    const confirmLabel = createElement('div', [], [], 'Confirm');
    const optionContainer = createElement('div', ['id'], ['sticky-option-container'], null);
    const yesButton = createElement('div', ['class'], ['option-button'], 'Yes');
    yesButton.addEventListener('click', () => {
        if(type === 'clear') clearTasks();
        if(type === 'copy') copyTasks();
        if(type === 'paste') pasteTasks();
        resetSticky(type);
        NO_SELECTED = true;
    });
    const slashLabel = createElement('div', [], [], '/');
    const noButton = createElement('div', ['class'], ['option-button'], 'No');
    noButton.addEventListener('click', () => {
        resetSticky(type);
        NO_SELECTED = true;
    });

    sticky.appendChild(confirmLabel);
    optionContainer.appendChild(yesButton);
    optionContainer.appendChild(slashLabel);
    optionContainer.appendChild(noButton);
    sticky.appendChild(optionContainer);

    FOCUSED_STICKY = type;
}

function clearTasks() {
    data.clearTasks();
    loadPriorityTasksElements(data.getTasks());
    updatePointsEarnedLabel();
    for(let i = 0; i < constants.PRIORITIES.length; i++) {
        document.getElementById(`${constants.PRIORITIES[i]}-priority-add-task-button`).style.display = 'block';
    }
}

function copyTasks() {
    COPIED_TASKS = data.getTasks();
}

function pasteTasks() {
    for(let i = 0; i < COPIED_TASKS.length; i++) {
        const taskID = uuidv4();
        const priority = COPIED_TASKS[i][constants.PRIORITY];
        const description = COPIED_TASKS[i][constants.DESCRIPTION];
        ADDED_TASKS_BY_PRIORITY[priority].push(taskID);
        const order = ADDED_TASKS_BY_PRIORITY[priority].indexOf(taskID);
        data.addNewTask(taskID, order, priority, description);
    }
    loadPriorityTasksElements(data.getTasks());
}

function resetSticky(type) {
    const sticky = document.getElementById(`${type}-sticky`);
    const capitializedType = type.charAt(0).toUpperCase() + type.slice(1);
    sticky.textContent = `${capitializedType} Tasks`;
    FOCUSED_STICKY = null;
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