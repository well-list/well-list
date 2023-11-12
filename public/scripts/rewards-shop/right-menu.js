import * as data from '../local-data.js';
import * as sprites from '../sprite-sources.js';
import * as utils from './utils.js';
import * as constants from './right-menu-constants.js';
import { handleThemeChange } from './main.js';

var IS_INITIALIZED = false;

var uiCanvas = null;
var uiCanvasContext = null;
var textCanvas = null;
var textCanvasContext = null;
var bgCanvas = null;
var bgCanvasContext = null;

var plantCardHovered = data.EMPTY_ID;
var colorSelectionHovered = data.EMPTY_ID;
var themeSelectionHovered = data.EMPTY_ID;

var drawnCostOnTextCanvas = false;
var drawnBudgetOnTextCanvas = false;

export function initializeRightMenu() {
    plantCardHovered = data.EMPTY_ID;
    colorSelectionHovered = data.EMPTY_ID;
    themeSelectionHovered = data.EMPTY_ID;

    if(!IS_INITIALIZED) {
        IS_INITIALIZED = true;
        uiCanvas = document.getElementById('rewards-right-menu-ui');
        textCanvas = document.getElementById('rewards-right-menu-text');
        bgCanvas = document.getElementById('rewards-right-menu-background');
        [uiCanvas.width, uiCanvas.height]  = [156, 287];
        [textCanvas.width, textCanvas.height]  = [156, 287];
        [bgCanvas.width, bgCanvas.height]  = [156, 287];
        uiCanvasContext = uiCanvas.getContext("2d");
        textCanvasContext = textCanvas.getContext("2d");
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
    const plantCardBounds = constants.CANVAS_PLANT_CARD_BOUNDS;

    for(let plantID = 0; plantID < plantCardBounds.length; plantID++) {
        if(utils.isMousePosWithinBounds(mousePos, plantCardBounds[plantID])) {
            if(plantCardHovered !== plantID) clearAnyHoverChanges();
            if(data.getSelectedPlant() === plantID) return;
            if(plantCardHovered !== plantID) handlePlantCardHovered(plantID);
            return;
        }
    }

    const colorSelectionBounds = constants.CANVAS_COLOR_SELECTION_BOUNDS;
    for(let colorID = 0; colorID < colorSelectionBounds.length; colorID++) {
        if(utils.isMousePosWithinBounds(mousePos, colorSelectionBounds[colorID])) {
            if(colorSelectionHovered !== colorID) clearAnyHoverChanges();
            if(colorSelectionHovered !== colorID) handleColorSelectionHovered(colorID);
            return;
        }
    }

    const themeSelectionBounds = constants.CANVAS_THEME_SELECTION_BOUNDS;
    for(let themeID = 0; themeID < themeSelectionBounds.length; themeID++) {
        if(utils.isMousePosWithinBounds(mousePos, themeSelectionBounds[themeID])) {
            if(themeSelectionHovered !== themeID) clearAnyHoverChanges();
            if(themeID === data.getFocusedMonthTheme()) return;
            if(themeSelectionHovered !== themeID) handleThemeSelectionHovered(themeID);
            return;
        }
    }

    clearAnyHoverChanges();
}

function handleCanvasMouseDown(event) {
    const mousePos = utils.getMouseCanvasCoordinates(uiCanvas, event);
    const plantCardBounds = constants.CANVAS_PLANT_CARD_BOUNDS;

    for(let plantID = 0; plantID < plantCardBounds.length; plantID++) {
        if(utils.isMousePosWithinBounds(mousePos, plantCardBounds[plantID])) {
            if(data.getSelectedPlant() !== plantID) handlePlantCardSelected(plantID);
            else {
                handlePlantCardUnselected(plantID, data.MOVE_SELECTION_MODE);
                handlePlantCardHovered(plantID);
            }
            return;
        }
    }

    const selectionModeButtonBounds = constants.CANVAS_SELECTION_MODE_BOUNDS;
    for(let selectionMode = 0; selectionMode < selectionModeButtonBounds.length; selectionMode++) {
        if(utils.isMousePosWithinBounds(mousePos, selectionModeButtonBounds[selectionMode])) {
            if(selectionMode !== data.BUY_SELECTION_MODE) {
                if(data.getSelectionMode() === data.BUY_SELECTION_MODE && data.getSelectedPlant() != data.EMPTY_ID) {
                    handlePlantCardUnselected(data.getSelectedPlant(), selectionMode);
                }
                else { handleSelectionModeChange(selectionMode); }
            }
        }
    }

    const colorSelectionBounds = constants.CANVAS_COLOR_SELECTION_BOUNDS;
    for(let colorID = 0; colorID < colorSelectionBounds.length; colorID++) {
        if(utils.isMousePosWithinBounds(mousePos, colorSelectionBounds[colorID])) {
            if(data.getSelectedPlantColor() !== colorID) handleColorSelected(colorID);
            return;
        }
    }

    const themeSelectionBounds = constants.CANVAS_THEME_SELECTION_BOUNDS;
    for(let themeID = 0; themeID < themeSelectionBounds.length; themeID++) {
        if(utils.isMousePosWithinBounds(mousePos, themeSelectionBounds[themeID])) {
            if(themeID !== data.getFocusedMonthTheme()) handleThemeSelected(themeID);
            return;
        }
    }
}

function handleCanvasMouseLeave() {
    clearAnyHoverChanges();
}

function handlePlantCardHovered(plantID) {
    drawHoveredCard(plantID);
    plantCardHovered = plantID;
}

function handleColorSelectionHovered(colorID) {
    drawHoveredColorSelection(colorID);
    colorSelectionHovered = colorID;
}

function handleThemeSelectionHovered(themeID) {
    drawThemeColorSelection(themeID);
    themeSelectionHovered = themeID;
}

function handleThemeSelected(themeID) {
    drawSelectedThemeSelectionOutline(themeID);
    resetArea(constants.CANVAS_THEME_SELECTION_BOUNDS[data.getFocusedMonthTheme()]);
    data.setFocusedMonthTheme(themeID);
    handleThemeChange();
}
 
function handlePlantCardSelected(plantID) {
    if(data.getSelectedPlant() !== data.EMPTY_ID) resetPlantCard(data.getSelectedPlant());
    drawPlantCostLabel(data.getPlantCost(plantID, data.getSelectedPlantColor()));
    plantCardHovered = data.EMPTY_ID;
    data.setSelectedPlant(plantID);
    drawSelectedCard(plantID);
    handleSelectionModeChange(data.BUY_SELECTION_MODE);
}

function handlePlantCardUnselected(plantID, selectionMode) {
    resetPlantCard(plantID);
    drawPlantCostLabel(0);
    handleSelectionModeChange(selectionMode);
    data.setSelectedPlant(data.EMPTY_ID);
}

function handleSelectionModeChange(selectionMode) {
    if(selectionMode === data.getSelectionMode()) return;
    resetArea(constants.CANVAS_SELECTION_MODE_BOUNDS[data.getSelectionMode()]);
    drawSelectedSelectionModeButton(selectionMode);
    data.setSelectionMode(selectionMode);
}

function handleColorSelected(colorID) {
    drawSelectedColorMarker(colorID);
    for(let plantID = 0; plantID < constants.NUM_PLANTS; plantID++) {
        drawPlantOnCard(plantID, colorID);
    }
    data.setSelectedPlantColor(colorID);
    if(data.getSelectedPlant() !== data.EMPTY_ID) drawPlantCostLabel(data.getPlantCost(data.getSelectedPlant(), colorID));
}

function clearAnyHoverChanges() {
    if(plantCardHovered !== data.EMPTY_ID) {
        resetPlantCard(plantCardHovered);
        plantCardHovered = data.EMPTY_ID;
    }
    if(colorSelectionHovered !== data.EMPTY_ID) {
        resetArea(constants.CANVAS_COLOR_SELECTION_BOUNDS[colorSelectionHovered]);
        colorSelectionHovered = data.EMPTY_ID;
    }
    if(themeSelectionHovered !== data.EMPTY_ID) {
        resetArea(constants.CANVAS_THEME_SELECTION_BOUNDS[themeSelectionHovered]);
        themeSelectionHovered = data.EMPTY_ID;
    }
}

function drawPlantCostLabel(plantCost) {
    const costText = plantCost.toString();
    const bounds = constants.PLANT_COST_LABEL_BOUNDS;
    let numeralDrawCoordinates = { // copy
        'x': constants.PLANT_COST_LABEL_DRAWING_COORDINATES['x'],
        'y': constants.PLANT_COST_LABEL_DRAWING_COORDINATES['y']
    };
    const drawCanvasContext = (drawnCostOnTextCanvas) ? uiCanvasContext : textCanvasContext;
    const clearCanvasContext = (drawnCostOnTextCanvas) ? textCanvasContext : uiCanvasContext;
    drawNumerals(drawCanvasContext, clearCanvasContext, numeralDrawCoordinates, bounds, costText);
    drawnCostOnTextCanvas = (drawnCostOnTextCanvas) ? false : true;
}

function drawPointsBudgetLabel(points) {
    const pointsText = points.toString();
    const bounds = constants.POINTS_BUDGET_LABEL_BOUNDS;
    let numeralDrawCoordinates = { // copy
        'x': constants.POINTS_BUDGET_LABEL_DRAWING_COORDINATES['x'],
        'y': constants.POINTS_BUDGET_LABEL_DRAWING_COORDINATES['y']
    };
    const drawCanvasContext = (drawnBudgetOnTextCanvas) ? uiCanvasContext : textCanvasContext;
    const clearCanvasContext = (drawnBudgetOnTextCanvas) ? textCanvasContext : uiCanvasContext;
    drawNumerals(drawCanvasContext, clearCanvasContext, numeralDrawCoordinates, bounds, pointsText);
    drawnBudgetOnTextCanvas = (drawnBudgetOnTextCanvas) ? false : true;
}

function drawNumerals(drawCanvasContext, clearCanvasContext, drawCoordinates, bounds, numeralText) {
    // overly complicated but I am switching between a UI and text canvas, so I can clear and draw the text at the same time
    // prevents flickering when updating text
    for(let i = 0; i < numeralText.length; i++) {
        const numberImage = sprites.numbers[parseInt(numeralText[i])]
        if(i === numeralText.length-1) {
            utils.drawImageOnCanvas(drawCanvasContext, numberImage, drawCoordinates['x'], drawCoordinates['y']).then(() => {
                utils.clearRectOnCanvas(clearCanvasContext, bounds['x1'], bounds['y1'], bounds['x2'], bounds['y2']);
            });
        }
        else utils.drawImageOnCanvas(drawCanvasContext, numberImage, drawCoordinates['x'], drawCoordinates['y']); 
        if(numeralText.charAt(i) === '1') drawCoordinates['x'] += 4;
        else drawCoordinates['x'] = drawCoordinates['x'] += 5;
    }
}

function drawSelectedSelectionModeButton(selectionMode) {
    const buttonDrawingCoordinates = constants.SELECTION_MODE_DRAWING_COORDINATES[selectionMode];
    const buttonImage = sprites.selectionModeButtonsSelected[selectionMode];
    utils.drawImageOnCanvas(uiCanvasContext, buttonImage, buttonDrawingCoordinates['x'], buttonDrawingCoordinates['y']);
}

function drawSelectedCard(plantID) {
    const cardDrawingCoordinates = constants.PLANT_CARD_DRAWING_COORDINATES[plantID];
    const selectedCardImage = sprites.plantCardsSelected[plantID];
    utils.drawImageOnCanvas(uiCanvasContext, selectedCardImage, cardDrawingCoordinates['x'], cardDrawingCoordinates['y']);
}

function drawHoveredCard(plantID) {
    const cardDrawingCoordinates = constants.PLANT_CARD_DRAWING_COORDINATES[plantID];
    const hoveredCardImage = sprites.plantCardsHover[data.getFocusedMonthTheme()][plantID];
    utils.drawImageOnCanvas(uiCanvasContext, hoveredCardImage, cardDrawingCoordinates['x'], cardDrawingCoordinates['y']);
}

function drawHoveredColorSelection(colorID) {
    const colorSelectionDrawingCoordinates = constants.COLOR_SELECTION_DRAWING_COORDINATES[colorID];
    const hoveredColorSelectionImage = sprites.hoverColorSelectionOutlines[colorID];
    utils.drawImageOnCanvas(uiCanvasContext, hoveredColorSelectionImage, colorSelectionDrawingCoordinates['x'], colorSelectionDrawingCoordinates['y']);
}

function drawThemeColorSelection(themeID) {
    const themeSelectionDrawingCoordinates = constants.THEME_SELECTION_DRAWING_COORDINATES[themeID];
    const hoveredThemeSelectionImage = sprites.hoveredThemeSelectionOutlines[themeID];
    utils.drawImageOnCanvas(uiCanvasContext, hoveredThemeSelectionImage, themeSelectionDrawingCoordinates['x'], themeSelectionDrawingCoordinates['y']);
}

function drawSelectedColorMarker(colorID) {
    const colorMarkerDrawingCoordinates = constants.SELECTED_COLOR_DRAWING_COORDINATE;
    const colorMarkerImage = sprites.selectedColorMarkers[colorID];
    utils.drawImageOnCanvas(uiCanvasContext, colorMarkerImage, colorMarkerDrawingCoordinates['x'], colorMarkerDrawingCoordinates['y']);
}

function drawSelectedThemeSelectionOutline(themeID) {
    const themeSelectionDrawingCoordinates = constants.THEME_SELECTION_DRAWING_COORDINATES[themeID];
    const selectedThemeSelectionOutline = sprites.selectedThemeSelectionOutline;
    utils.drawImageOnCanvas(uiCanvasContext, selectedThemeSelectionOutline, themeSelectionDrawingCoordinates['x'], themeSelectionDrawingCoordinates['y']);
}

function drawPlantOnCard(plantID, colorID) {
    const cardDrawingCoordinates = constants.PLANT_CARD_DRAWING_COORDINATES[plantID];
    const plantOffset = constants.PLANT_CARD_PLANT_OFFSETS[plantID];
    const plantImage = sprites.plants[colorID][plantID];
    const x = cardDrawingCoordinates['x'] + plantOffset['x'];
    const y = cardDrawingCoordinates['y'] + plantOffset['y'];
    utils.drawImageOnCanvas(uiCanvasContext, plantImage, x, y);
}

function resetArea(bounds) {
    utils.clearRectOnCanvas(uiCanvasContext, bounds['x1'], bounds['y1'], bounds['x2'], bounds['y2']);
}

function resetPlantCard(plantID) {
    const cardDrawingCoordinates = constants.PLANT_CARD_DRAWING_COORDINATES[plantID];
    const cardImage = sprites.plantCards[data.getFocusedMonthTheme()][plantID];
    utils.drawImageOnCanvas(uiCanvasContext, cardImage, cardDrawingCoordinates['x'], cardDrawingCoordinates['y']);
}

function drawInitialSprites() {
    const startImage = sprites.startingRightMenus[data.getFocusedMonthTheme()];
    utils.drawImageOnCanvas(bgCanvasContext, startImage, 0, 0);
    for(let plantID = 0; plantID < constants.NUM_PLANTS; plantID++) {
        if(plantID === data.getSelectedPlant()) continue;
        resetPlantCard(plantID);
    }
    if(data.getSelectedPlant() === data.EMPTY_ID) drawPlantCostLabel(0);
    drawPointsBudgetLabel(data.getPointsForFocusedMonth());
    if(data.getSelectionMode() === data.MOVE_SELECTION_MODE) drawSelectedSelectionModeButton(data.MOVE_SELECTION_MODE);
}

export function updatePointsLabel() {
    drawPointsBudgetLabel(data.getPointsForFocusedMonth());
}

export function clearContent() {
    uiCanvasContext.clearRect(0, 0, uiCanvas.width, uiCanvas.height);
    textCanvasContext.clearRect(0, 0, textCanvas.width, textCanvas.height);
    bgCanvasContext.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
}