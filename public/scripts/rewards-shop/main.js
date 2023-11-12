import * as data from '../local-data.js';
import * as leftMenu from './left-menu.js';
import * as mainView from './main-view.js';
import * as rightMenu from './right-menu.js';

document.getElementById("shop-button").addEventListener('click', () => {
    handleStart();
});

function handleStart() {
    data.initializeDefaultRewardsData();
    leftMenu.initializeLeftMenu();
    mainView.initializeMainView();
    rightMenu.initializeRightMenu();
    document.getElementById('rewards-view-container').style.display = 'block';
}

function resetViews() {
    data.clearSelectedSettings();
    leftMenu.clearContent();
    mainView.clearContent();
    rightMenu.clearContent();
}

export function handleRewardsScreenExit() {
    document.getElementById('rewards-view-container').style.display = 'none';
    resetViews();
}

export function handleMonthChange(isNext) {
    const ANIMATION_DURATION_MS = 375;
    const rewardsCanvasContainer = document.getElementById('rewards-canvas-container');
    if(isNext) rewardsCanvasContainer.style.animation = `rewards-view-slide-out-left ${ANIMATION_DURATION_MS}ms ease-out 0s 1 forwards`;
    else rewardsCanvasContainer.style.animation = `rewards-view-slide-out-right ${ANIMATION_DURATION_MS}ms ease-out 0s 1 forwards`;
    // wait until canvases have left the screen to update their content
    setTimeout(() => {
        resetViews();
        leftMenu.initializeLeftMenu();
        mainView.initializeMainView();
        rightMenu.initializeRightMenu();
        // wait a bit for updates to draw then display again
        setTimeout(() => {
            rewardsCanvasContainer.style.animation = '';
            if(isNext) rewardsCanvasContainer.style.animation = `rewards-view-slide-in-right ${ANIMATION_DURATION_MS}ms ease-in-out 0s 1 forwards`;
            else rewardsCanvasContainer.style.animation = `rewards-view-slide-in-left ${ANIMATION_DURATION_MS}ms ease-in-out 0s 1 forwards`;
            setTimeout(() => { rewardsCanvasContainer.style.animation = ''; }, ANIMATION_DURATION_MS); // clear animation
        }, ANIMATION_DURATION_MS / 2);
    }, ANIMATION_DURATION_MS);
}

export function handleThemeChange() {
    leftMenu.initializeLeftMenu();
    mainView.initializeMainView();
    rightMenu.initializeRightMenu();
}

export function handlePlantBoughtOrSold() {
    rightMenu.updatePointsLabel();
}