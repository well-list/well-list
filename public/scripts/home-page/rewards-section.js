import * as sprites from '../sprite-sources.js';
import * as data from "../data-access/data-access.js";
import * as constants from "../constants.js";
import * as utils from "../utils.js";
import * as mvConstants from "../rewards-shop/main-view-constants.js";

export function updateRewardsSection() {
    const month = data.getFocusedDate().toLocaleString('default', { month: 'long' });
    document.getElementById('reward-section-header').innerHTML = `${month} Rewards`;
    drawRewardsSprites(data.getRewardsTheme());
    updatePointsEarnedLabel();
    document.getElementById('points-spent-label').innerHTML = utils.padLeadingZeros(getPointsSpent(), 5);
}

export function updatePointsEarnedLabel() {
    document.getElementById('points-earned-label').innerHTML = utils.padLeadingZeros(data.getRewardsPoints(), 5);
}

function drawRewardsSprites(themeID) {
    let canvas = document.getElementById('plant-summary-canvas');
    canvas.width = 573;
    canvas.height = 309;
    const ctx = canvas.getContext("2d");
    let img = new Image();
    img.onload = function(){
        ctx.drawImage(img,0,0);
        drawRewardsSectionPlants(ctx);
    };
    img.src = sprites.rewardsSectionBackground[themeID];
}

function getPointsSpent() {
    let pointsSpent = 0;
    for(let r = 0; r < constants.SHELF_ROWS; r++) {
        for(let c = 0; c < constants.SHELF_COLUMNS; c++) {
            if(!data.isRewardsPositionEmpty(r, c)) {
                const plantID = data.getRewardsPlantID(r, c);
                const colorID = data.getRewardsColorID(r, c);
                pointsSpent += constants.PLANT_COSTS[plantID][colorID];
            }
        }
    }
    return pointsSpent;
}

function drawRewardsSectionPlants(canvasCtx) {
    for(let r = 0; r < constants.SHELF_ROWS; r++) {
        for(let c = 0; c < constants.SHELF_COLUMNS; c++) {
            if(!data.isRewardsPositionEmpty(r, c)) {
                const plantID = data.getRewardsPlantID(r, c);
                const colorID = data.getRewardsColorID(r, c);
                drawPlant(canvasCtx, {'row': r, 'column': c}, colorID, plantID);
            }
        }
    }
}

function drawPlant(canvasContext, gridPosition, colorID, plantID) {
    const drawingOrigin = getDrawingOriginFromGridPosition(gridPosition);
    const plantOffset = mvConstants.PLANT_CARD_PLANT_OFFSETS[plantID];
    const plantImage = sprites.plants[colorID][plantID];
    const x = drawingOrigin['x'] + plantOffset['x'];
    const y = drawingOrigin['y'] + plantOffset['y'];
    return utils.drawImageOnCanvas(canvasContext, plantImage, x, y);
}

// get top left coordinate for grid position
function getDrawingOriginFromGridPosition(gridPosition) {
    const x = mvConstants.REWARDS_SECTION_SHELF_GRID_OFFSET['x'] +
        gridPosition['column'] * (
            mvConstants.GRID_POSITION_WIDTH +
            mvConstants.GRID_POSITION_SPACING['horizontal']
        )
    const y = mvConstants.REWARDS_SECTION_SHELF_GRID_OFFSET['y'] +
        gridPosition['row'] * (
            mvConstants.GRID_POSITION_HEIGHT +
            mvConstants.GRID_POSITION_SPACING['vertical']
        )
    return {'x': x, 'y': y};
}