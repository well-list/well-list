export function drawImageOnCanvas(canvasCtx, imageSrc, x, y) {
    return new Promise(function(resolve, reject) {
        var img = new Image();
        img.onload = function(){
            canvasCtx.drawImage(img,x,y);
            resolve();
        };
        img.src = imageSrc;
    });
}

export function drawLineOnCanvas(canvasContext, color, x1, y1, x2, y2) {
    canvasContext.strokeStyle = color;
    canvasContext.lineWidth = 1;
    // very rough hack to get more solid lines
    for(let i = 0; i < 5; i++) {
        canvasContext.beginPath();
        canvasContext.moveTo(x1, y1);
        canvasContext.lineTo(x2, y2);
        canvasContext.stroke();
    }
}

export function clearRectOnCanvas(canvasContext, x1, y1, x2, y2) {
    const width = (x2 - x1) + 1;
    const height = (y2 - y1) + 1;
    canvasContext.clearRect(x1, y1, width, height);
}

// gets mouse x and y on canvas
export function getMouseCanvasCoordinates(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var scaleY = rect.height / canvas.height;
    var scaleX = rect.width / canvas.width;
    return {
        x: Math.floor((event.clientX - rect.left) / scaleX),
        y: Math.floor((event.clientY - rect.top) / scaleY)
    };
}

export function isMousePosWithinBounds(mousePos, bounds) {
    return mousePos.x >= bounds['x1']
        && mousePos.y >= bounds['y1']
        && mousePos.x <= bounds['x2']
        && mousePos.y <= bounds['y2'];
}

export function getCurrentMonth() {
    const current_date = new Date();
    return `${current_date.getMonth() + 1}-${current_date.getFullYear()}`
}