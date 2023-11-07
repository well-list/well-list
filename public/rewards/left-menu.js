import * as data from './data.js';
import * as sprites from './sources.js';
import * as utils from './utils.js';
import * as constants from './left-menu-constants.js';

import { handleRewardsScreenExit, handleMonthChange } from './rewards.js'

var IS_INITIALIZED = false;

var uiCanvas = null;
var uiCanvasContext = null;
var bgCanvas = null;
var bgCanvasContext = null;

var exitButtonHovered = false;
var nextButtonHovered = false;
var previousButtonHovered = false;

export function initializeLeftMenu() {
    exitButtonHovered = false;
    nextButtonHovered = false;
    previousButtonHovered = false;

    if(!IS_INITIALIZED) {
        IS_INITIALIZED = true;
        uiCanvas = document.getElementById('rewards-left-menu-ui');
        bgCanvas = document.getElementById('rewards-left-menu-background');
        [uiCanvas.width, uiCanvas.height]  = [15, 287];
        [bgCanvas.width, bgCanvas.height]  = [15, 287];
        uiCanvasContext = uiCanvas.getContext("2d");
        bgCanvasContext = bgCanvas.getContext("2d");
        attachEventHandlers();
    }
    drawInitialSprites();
}

function attachEventHandlers() {
    uiCanvas.addEventListener("mousemove", (event) => { handleCanvasHover(event) }, false);
    uiCanvas.addEventListener("mousedown", (event) => { handleCanvasMouseDown(event) }, false);
    uiCanvas.addEventListener("mouseleave", () => { handleCanvasMouseLeave() }, false);
}

function handleCanvasHover(event) {
    const mousePos = utils.getMouseCanvasCoordinates(uiCanvas, event);
    const exitButtonBounds = constants.CANVAS_BOUNDS[constants.EXIT_BUTTON];
    const nextButtonBounds = constants.CANVAS_BOUNDS[constants.NEXT_BUTTON];
    const previousButtonBounds = constants.CANVAS_BOUNDS[constants.PREVIOUS_BUTTON];

    if(utils.isMousePosWithinBounds(mousePos, exitButtonBounds)) { 
        if(!exitButtonHovered) { handleButtonHover(sprites.exitButton, constants.DRAWING_COORDINATES[constants.EXIT_BUTTON]); }
        exitButtonHovered = true;
    }
    else if(utils.isMousePosWithinBounds(mousePos, nextButtonBounds)) {
        if(!nextButtonHovered) { handleButtonHover(sprites.nextMonthButton, constants.DRAWING_COORDINATES[constants.NEXT_BUTTON]); }
        nextButtonHovered = true;
    }
    else if(utils.isMousePosWithinBounds(mousePos, previousButtonBounds)) {
        if(!previousButtonHovered) { handleButtonHover(sprites.previousMonthButton, constants.DRAWING_COORDINATES[constants.PREVIOUS_BUTTON]); }
        previousButtonHovered = true;
    }
    else { clearAnyHoverChanges(); }
}

function handleCanvasMouseDown(event) {
    const mousePos = utils.getMouseCanvasCoordinates(uiCanvas, event);
    const exitButtonBounds = constants.CANVAS_BOUNDS[constants.EXIT_BUTTON];
    const nextButtonBounds = constants.CANVAS_BOUNDS[constants.NEXT_BUTTON];
    const previousButtonBounds = constants.CANVAS_BOUNDS[constants.PREVIOUS_BUTTON];

    if(utils.isMousePosWithinBounds(mousePos, exitButtonBounds)) {
        handleRewardsScreenExit();
    }
    else if(utils.isMousePosWithinBounds(mousePos, nextButtonBounds)) {
        data.changeToNextMonth();
        handleMonthChange(true);
    }
    else if(utils.isMousePosWithinBounds(mousePos, previousButtonBounds)) {
        data.changeToPreviousMonth();
        handleMonthChange(false);
    }
}

function handleCanvasMouseLeave() {
    clearAnyHoverChanges();
}

function handleButtonHover(buttonImage, buttonDrawingCoordinates) {
    clearAnyHoverChanges();
    const backgroundColor = constants.THEME_BACKGROUND_COLORS[data.getFocusedMonthTheme()];
    const x = buttonDrawingCoordinates['x'];
    const y = buttonDrawingCoordinates['y'];
    utils.drawLineOnCanvas(uiCanvasContext, backgroundColor, x, y, x + constants.BUTTON_WIDTH, y);
    utils.drawImageOnCanvas(uiCanvasContext, buttonImage, x, y + 1);
}

function clearAnyHoverChanges() {
    if(exitButtonHovered) {
        const buttonCoordinates = constants.DRAWING_COORDINATES[constants.EXIT_BUTTON];
        const buttonBounds = constants.CANVAS_BOUNDS[constants.EXIT_BUTTON];
        handleButtonHoverLeave(sprites.exitButton, buttonCoordinates, buttonBounds);
        exitButtonHovered = false;
    }
    if(nextButtonHovered) {
        const buttonCoordinates = constants.DRAWING_COORDINATES[constants.NEXT_BUTTON];
        const buttonBounds = constants.CANVAS_BOUNDS[constants.NEXT_BUTTON];
        handleButtonHoverLeave(sprites.nextMonthButton, buttonCoordinates, buttonBounds);
        nextButtonHovered = false;
    }
    if(previousButtonHovered) {
        const buttonCoordinates = constants.DRAWING_COORDINATES[constants.PREVIOUS_BUTTON];
        const buttonBounds = constants.CANVAS_BOUNDS[constants.PREVIOUS_BUTTON];
        handleButtonHoverLeave(sprites.previousMonthButton, buttonCoordinates, buttonBounds);
        previousButtonHovered = false;
    }
}

function handleButtonHoverLeave(buttonImage, buttonDrawingCoordinates, buttonBounds) {
    const backgroundColor = constants.THEME_BACKGROUND_COLORS[data.getFocusedMonthTheme()];
    const x = buttonDrawingCoordinates['x'];
    const y = buttonDrawingCoordinates['y'];
    const xLineEnd = buttonBounds['x2']
    const yLine = buttonBounds['y2'];
    utils.drawLineOnCanvas(uiCanvasContext, backgroundColor, x, yLine, xLineEnd, yLine);
    utils.drawImageOnCanvas(uiCanvasContext, buttonImage, x, y);
}

function drawMonthAndYearMarkers() {
    const focusedMonthDate = data.getFocusedMonth();
    const month = parseInt(focusedMonthDate.split('-')[0]);
    const monthMarkerX = constants.DRAWING_COORDINATES[constants.MONTH_MARKER]['x'];
    const monthMarkerY = constants.DRAWING_COORDINATES[constants.MONTH_MARKER]['y'];
    utils.drawImageOnCanvas(uiCanvasContext, sprites.monthMarkers[month-1], monthMarkerX, monthMarkerY);
    const year = focusedMonthDate.split('-')[1];
    const yearMarkerX = constants.DRAWING_COORDINATES[constants.YEAR_MARKER]['x'];
    const yearMarkerY = constants.DRAWING_COORDINATES[constants.YEAR_MARKER]['y'];
    utils.drawImageOnCanvas(uiCanvasContext, sprites.yearMarkers[year], yearMarkerX, yearMarkerY);
}

function drawInitialSprites() {
    const startImage = sprites.startingLeftMenus[data.getFocusedMonthTheme()];
    utils.drawImageOnCanvas(bgCanvasContext, startImage, 0, 0);
    drawMonthAndYearMarkers();
}

export function clearContent() {
    uiCanvasContext.clearRect(0, 0, uiCanvas.width, uiCanvas.height);
    bgCanvasContext.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
}