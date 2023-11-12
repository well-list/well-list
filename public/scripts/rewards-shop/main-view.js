import * as data from '../local-data.js';
import * as sprites from '../sprite-sources.js';
import * as utils from '../utils.js';
import * as constants from './main-view-constants.js';
import { handlePlantBoughtOrSold } from './main.js';

var IS_INITIALIZED = false;

var uiCanvas = null;
var uiCanvasContext = null;
var hoverCanvas = null;
var hoverCanvasContext = null;
var vpCanvas = null;
var vpCanvasContext = null;
var plantsCanvas = null;
var plantsCanvasContext = null;
var bgCanvas = null;
var bgCanvasContext = null;

var lastHoverPosition = null;
var replacedSellPlant = null;
var movePlantOrigin = null;
var movePlantDestination = null;

export function initializeMainView() {
    lastHoverPosition = null;

    if(!IS_INITIALIZED) {
        IS_INITIALIZED = true;
        uiCanvas = document.getElementById('rewards-main-view-ui');
        hoverCanvas = document.getElementById('rewards-main-view-hover');
        vpCanvas = document.getElementById('rewards-main-view-vined-pathos');
        plantsCanvas = document.getElementById('rewards-main-view-plants');
        bgCanvas = document.getElementById('rewards-main-view-background');
        [uiCanvas.width, uiCanvas.height]  = [270, 287];
        [hoverCanvas.width, hoverCanvas.height]  = [270, 287];
        [vpCanvas.width, vpCanvas.height]  = [270, 287];
        [plantsCanvas.width, plantsCanvas.height]  = [270, 287];
        [bgCanvas.width, bgCanvas.height]  = [270, 287];
        uiCanvasContext = uiCanvas.getContext("2d");
        hoverCanvasContext = hoverCanvas.getContext("2d");
        vpCanvasContext = vpCanvas.getContext("2d");
        plantsCanvasContext = plantsCanvas.getContext("2d");
        bgCanvasContext = bgCanvas.getContext("2d");
        attachEventHandlers();
    }
    drawInitialSprites();
}

function attachEventHandlers() {
    uiCanvas.addEventListener("mousemove", (event) => { handleCanvasHover(event) }, false);
    uiCanvas.addEventListener("mousedown", (event) => { handleCanvasMouseDown(event) }, false);
    uiCanvas.addEventListener("mouseup", (event) => { handleCanvasMouseUp(event) }, false);
    uiCanvas.addEventListener("mouseleave", () => { handleCanvasMouseLeave() }, false);
}

function handleCanvasHover(event) {
    const mousePos = utils.getMouseCanvasCoordinates(uiCanvas, event);
    const gridPosition = getShelfGridPositionFromMousePosition(mousePos);
    if(lastHoverPosition !== null && gridPosition !== null && (gridPosition['row'] === lastHoverPosition['row'] && gridPosition['column'] === lastHoverPosition['column'])) return;
    clearAnyHoverChanges();
    if(gridPosition === null) { lastHoverPosition = null; return; }

    lastHoverPosition = gridPosition;
    drawHoverSelectionOutline(gridPosition);
    if(data.getSelectionMode() === data.BUY_SELECTION_MODE && data.getSelectedPlant() !== data.EMPTY_ID) {
        if (data.isShelfPositionEmpty(gridPosition['row'], gridPosition['column']) && data.isPlantAffordable(data.getSelectedPlant(), data.getSelectedPlantColor())) {
            drawPlant(hoverCanvasContext, gridPosition, data.getSelectedPlantColor(), data.getSelectedPlant());
        }
    }

    if(data.getSelectionMode() === data.SELL_SELECTION_MODE && !data.isShelfPositionEmpty(gridPosition['row'], gridPosition['column'])) {
        replacePlantWithHoverPlant(gridPosition['row'], gridPosition['column']);
        replacedSellPlant = gridPosition;
    }

    if(data.getSelectionMode() === data.MOVE_SELECTION_MODE && movePlantOrigin !== null) {
        if(data.isShelfPositionEmpty(gridPosition['row'], gridPosition['column']) || (gridPosition['row'] === movePlantOrigin['row'] && gridPosition['column'] === movePlantOrigin['column'])) {
            const plantID = data.getFocusedMonthPlantType(movePlantOrigin['row'], movePlantOrigin['column']);
            const colorID = data.getFocusedMonthColorType(movePlantOrigin['row'], movePlantOrigin['column']);
            drawPlant(hoverCanvasContext, gridPosition, colorID, plantID);
            movePlantDestination = gridPosition;
        }
    }
}

function handleCanvasMouseDown(event) {
    const mousePos = utils.getMouseCanvasCoordinates(uiCanvas, event);
    const gridPosition = getShelfGridPositionFromMousePosition(mousePos);
    if(gridPosition === null) return;

    if(data.getSelectionMode() === data.BUY_SELECTION_MODE && data.getSelectedPlant() !== data.EMPTY_ID) {
        if(data.isShelfPositionEmpty(gridPosition['row'], gridPosition['column']) && data.isPlantAffordable(data.getSelectedPlant(), data.getSelectedPlantColor())) {
            const plantCanvasCtx = (data.getSelectedPlant() === data.VINE_PATHOS_ID) ? vpCanvasContext : plantsCanvasContext;
            drawPlant(plantCanvasCtx, gridPosition, data.getSelectedPlantColor(), data.getSelectedPlant());
            data.buyPlant(gridPosition['row'], gridPosition['column'], data.getSelectedPlant(), data.getSelectedPlantColor());
            handlePlantBoughtOrSold();
        }
    }

    if(data.getSelectionMode() === data.SELL_SELECTION_MODE && !data.isShelfPositionEmpty(gridPosition['row'], gridPosition['column'])) {
        replacedSellPlant = null;
        clearAnyHoverChanges();
        drawHoverSelectionOutline(gridPosition);
        clearPlant(gridPosition['row'], gridPosition['column']);
        data.sellPlant(gridPosition['row'], gridPosition['column']);
        handlePlantBoughtOrSold();
    }

    if(data.getSelectionMode() === data.MOVE_SELECTION_MODE && !data.isShelfPositionEmpty(gridPosition['row'], gridPosition['column'])) {
        replacePlantWithHoverPlant(gridPosition['row'], gridPosition['column']);
        movePlantOrigin = gridPosition;
        movePlantDestination = gridPosition;
    }
}

function handleCanvasMouseUp(event) {
    const mousePos = utils.getMouseCanvasCoordinates(uiCanvas, event);
    const gridPosition = getShelfGridPositionFromMousePosition(mousePos);

    if(data.getSelectionMode() === data.MOVE_SELECTION_MODE && movePlantOrigin !== null) {
        const plantID = data.getFocusedMonthPlantType(movePlantOrigin['row'], movePlantOrigin['column']);
        const colorID = data.getFocusedMonthColorType(movePlantOrigin['row'], movePlantOrigin['column']);
        const plantCanvasCtx = (plantID === data.VINE_PATHOS_ID) ? vpCanvasContext : plantsCanvasContext;
        if(gridPosition === null) drawPlant(plantCanvasCtx, movePlantOrigin, colorID, plantID);
        else if (data.isShelfPositionEmpty(gridPosition['row'], gridPosition['column'])) {
            drawPlant(plantCanvasCtx, gridPosition, colorID, plantID);
            data.movePlant(movePlantOrigin, movePlantDestination);
        }
        else drawPlant(plantCanvasCtx, movePlantOrigin, colorID, plantID);
        movePlantOrigin = null;
        movePlantDestination = null;
        clearAnyHoverChanges();
    }
}

function handleCanvasMouseLeave() {
    clearAnyHoverChanges();

    if(data.getSelectionMode() === data.MOVE_SELECTION_MODE && movePlantOrigin !== null) {
        const plantID = data.getFocusedMonthPlantType(movePlantOrigin['row'], movePlantOrigin['column']);
        const colorID = data.getFocusedMonthColorType(movePlantOrigin['row'], movePlantOrigin['column']);
        const plantCanvasCtx = (plantID === data.VINE_PATHOS_ID) ? vpCanvasContext : plantsCanvasContext;
        drawPlant(plantCanvasCtx, movePlantOrigin, colorID, plantID);
        movePlantOrigin = null;
        movePlantDestination = null;
        clearAnyHoverChanges();
    }
}

function clearAnyHoverChanges() {
    if(replacedSellPlant !== null) {
        replaceHoverPlantWithPlant(replacedSellPlant['row'], replacedSellPlant['column']);
        replacedSellPlant = null;
    }
    // clear entire layers
    uiCanvasContext.clearRect(0, 0, uiCanvas.width, uiCanvas.height);
    hoverCanvasContext.clearRect(0, 0, hoverCanvas.width, hoverCanvas.height);
}

function drawPlant(canvasContext, gridPosition, colorID, plantID) {
    const drawingOrigin = getDrawingOriginFromGridPosition(gridPosition);
    const plantOffset = constants.PLANT_CARD_PLANT_OFFSETS[plantID];
    const plantImage = sprites.plants[colorID][plantID];
    const x = drawingOrigin['x'] + plantOffset['x'];
    const y = drawingOrigin['y'] + plantOffset['y'];
    return utils.drawImageOnCanvas(canvasContext, plantImage, x, y);
}

function drawHoverSelectionOutline(gridPosition) {
    const drawingOrigin = getDrawingOriginFromGridPosition(gridPosition);
    const selectionOutline = sprites.gridShelfSelectionOutline[data.getFocusedMonthTheme()];
    const x = drawingOrigin['x'] - 3;
    const y = drawingOrigin['y'] - 2;
    utils.drawImageOnCanvas(uiCanvasContext, selectionOutline, x, y);
}

function replacePlantWithHoverPlant(row, column) {
    const gridPosition = {'row': row, 'column': column};
    const plantID = data.getFocusedMonthPlantType(row, column);
    const colorID = data.getFocusedMonthColorType(row, column);

    drawPlant(hoverCanvasContext, gridPosition, colorID, plantID).then(() => {
       clearPlant(row, column);
    });
}

function replaceHoverPlantWithPlant(row, column) {
    const gridPosition = {'row': row, 'column': column};
    const plantID = data.getFocusedMonthPlantType(row, column);
    const colorID = data.getFocusedMonthColorType(row, column);
    const plantCanvasCtx = (plantID === data.VINE_PATHOS_ID) ? vpCanvasContext : plantsCanvasContext;
    drawPlant(plantCanvasCtx, gridPosition, colorID, plantID);
}

function clearPlant(row, column) {
    const gridPosition = {'row': row, 'column': column};
    const plantID = data.getFocusedMonthPlantType(row, column);
    const plantOrigin = getDrawingOriginFromGridPosition(gridPosition);
    const plantCanvasCtx = (plantID === data.VINE_PATHOS_ID) ? vpCanvasContext : plantsCanvasContext;
    const yOffset = (plantID === data.VINE_PATHOS_ID) ? 28 : 0;
    plantCanvasCtx.clearRect(plantOrigin['x'], plantOrigin['y'] + yOffset, constants.GRID_POSITION_WIDTH, constants.GRID_POSITION_HEIGHT);
}

function getShelfGridPositionFromMousePosition(mousePos) {
    let y1 = constants.SHELF_GRID_OFFSET['y'] + constants.GRID_POSITION_SPACING['vertical'] - 2;
    for(let r = 0; r < data.SHELF_ROWS; r++) {
        let x1 = constants.SHELF_GRID_OFFSET['x'] + constants.GRID_POSITION_SPACING['horizontal'] - 1;
        const y2 = y1 + constants.GRID_POSITION_HEIGHT;
        for(let c = 0; c < data.SHELF_COLUMNS; c++) {
            const x2 = x1 + constants.GRID_POSITION_WIDTH - 1;
            const bounds = {'x1': x1, 'y1': y1, 'x2': x2, 'y2': y2};
            if(utils.isMousePosWithinBounds(mousePos, bounds)) return {'row': r, 'column': c}
            x1 += constants.GRID_POSITION_WIDTH + constants.GRID_POSITION_SPACING['horizontal'];
        }
        y1 += constants.GRID_POSITION_HEIGHT + constants.GRID_POSITION_SPACING['vertical'];
    }
    return null;
}

// get top left coordinate for grid position
function getDrawingOriginFromGridPosition(gridPosition) {
    const x = constants.SHELF_GRID_OFFSET['x'] +
        gridPosition['column'] * (
            constants.GRID_POSITION_WIDTH +
            constants.GRID_POSITION_SPACING['horizontal']
        )
    const y = constants.SHELF_GRID_OFFSET['y'] +
        gridPosition['row'] * (
            constants.GRID_POSITION_HEIGHT +
            constants.GRID_POSITION_SPACING['vertical']
        )
    return {'x': x, 'y': y};
}

function drawInitialSprites() {
    const startImage = sprites.startingMainViews[data.getFocusedMonthTheme()];
    utils.drawImageOnCanvas(bgCanvasContext, startImage, 0, 0);
    for(let r = 0; r < data.SHELF_ROWS; r++) {
        for(let c = 0; c < data.SHELF_COLUMNS; c++) {
            if(!data.isShelfPositionEmpty(r, c)) {
                const plantID = data.getFocusedMonthPlantType(r, c);
                const colorID = data.getFocusedMonthColorType(r, c);
                const plantCanvasCtx = (plantID === data.VINE_PATHOS_ID) ? vpCanvasContext : plantsCanvasContext;
                drawPlant(plantCanvasCtx, {'row': r, 'column': c}, colorID, plantID);
            }
        }
    }
}

export function clearContent() {
    uiCanvasContext.clearRect(0, 0, uiCanvas.width, uiCanvas.height);
    hoverCanvasContext.clearRect(0, 0, hoverCanvas.width, hoverCanvas.height);
    vpCanvasContext.clearRect(0, 0, vpCanvas.width, vpCanvas.height);
    plantsCanvasContext.clearRect(0, 0, plantsCanvas.width, plantsCanvas.height);
    bgCanvasContext.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
}