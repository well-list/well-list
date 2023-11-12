import * as sprites from '../sprite-sources.js';

export function loadRewardsSection(date) {
    const month = date.toLocaleString('default', { month: 'long' });
    document.getElementById('reward-section-header').innerHTML = `${month} Rewards`

    drawRewardsSectionBackground(1);
}

function drawRewardsSectionBackground(themeID) {
    let canvas = document.getElementById('plant-summary-canvas');
    canvas.width = 573;
    canvas.height = 309;
    const ctx = canvas.getContext("2d");
    let img = new Image();
        img.onload = function(){
        ctx.drawImage(img,0,0);
    };
    // temporary to get idea down
    img.src = sprites.rewardsSectionBackground[themeID];
}

function drawRewardsSectionsPlants(plantIDs, colorIDs) {
    
}