export function createElement(type, attributes, values, innerHTML) {
    const element = document.createElement(type);
    for(let i = 0; i < attributes.length; i++) {
        element.setAttribute(attributes[i], values[i]);
    }
    if(innerHTML !== null) element.innerHTML = innerHTML;
    return element;
}

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

export function getMonthString(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}`
}

export function getDateString(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export function padLeadingZeros(number, length) {
    const numberText = number.toString();
    let zeros = "";
    // pad with beginning zeros
    for(let i = 0; i < length - numberText.length; i++) {
        zeros += "0";
    };
    return zeros + numberText;
}

export function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}