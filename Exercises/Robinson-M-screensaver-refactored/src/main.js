import { getRandomColor, getRandomInt } from "./utils.js"
import { drawRectangle, drawArc, drawLine } from "./canvas-utils.js";

// #1 call the `init` function after the pages loads
let ctx;
let canvas;
let paused = false;
let createRectangles = true;
let createArcs = true;
let createLines = true;

let init = () => {
    console.log("page loaded!");
    // #2 Now that the page has loaded, start drawing!

    // A - `canvas` variable points at <canvas> tag
    canvas = document.querySelector("canvas");

    // B - the `ctx` variable points at a "2D drawing context"
    ctx = canvas.getContext("2d");

    // C - all fill operations are now in red
    ctx.fillStyle = "red";

    // D - fill a rectangle with the current fill color
    ctx.fillRect(20, 20, 600, 440);

    //My Code:
    drawRectangle(ctx, 120, 120, 400, 300, "yellow", 10, "magenta");
    drawLine(ctx, 20, 20, 620, 460, 5, "magenta");
    drawLine(ctx, 620, 20, 20, 460, 5, "magenta");
    drawArc(ctx, 320, 240, 50, "green", 5, "purple", 0, Math.PI * 2);
    drawArc(ctx, 320, 240, 20, "grey", 5, "yellow", 0, Math.PI);
    drawArc(ctx, 300, 215, 10, "white", 5, "black", 0, Math.PI * 2);
    drawArc(ctx, 340, 215, 10, "white", 5, "black", 0, Math.PI * 2);
    drawLine(ctx, 20, 350, 620, 350, 20, "black");

    setupUI();

    update();
}

//I think this implementation makes it go slower but whatever
let drawRandom = (ctx) => {
    switch (getRandomInt(1, 3)) {
        case 1:
            if (createRectangles) drawRandomRect(ctx);
            break;
        case 2:
            if (createLines) drawRandomLine(ctx);
            break;
        case 3:
            if (createArcs) drawRandomArc(ctx);
            break;
        default:
            break;
    }
}

let drawRandomRect = (ctx) => {
    drawRectangle(ctx, getRandomInt(0, 640), getRandomInt(0, 480), getRandomInt(10, 90), getRandomInt(10, 90), getRandomColor(), getRandomInt(2, 12), getRandomColor());
}

let drawRandomArc = (ctx) => {
    drawArc(ctx, getRandomInt(0, 640), getRandomInt(0, 480), getRandomInt(5, 40), getRandomColor(), getRandomInt(2, 12), getRandomColor(), 0, Math.PI * getRandomInt(1, 2));
}

let drawRandomLine = (ctx) => {
    drawLine(ctx, getRandomInt(0, 640), getRandomInt(0, 480), getRandomInt(0, 640), getRandomInt(0, 480), getRandomInt(2, 12), getRandomColor());
}


let update = () => {
    if (paused) return;
    requestAnimationFrame(update);
    drawRandom(ctx);
}

let canvasClicked = (e) => {
    let rect = e.target.getBoundingClientRect();
    let mouseX = e.clientX - rect.x;
    let mouseY = e.clientY - rect.y;
    console.log(mouseX, mouseY);
    for (let i = 0; i < 10; i++) {
        let x = getRandomInt(-100, 100) + mouseX;
        let y = getRandomInt(-100, 100) + mouseY;
        let radius = getRandomInt(20, 50);
        let color = getRandomColor();
        drawArc(ctx, x, y, radius, color);
    }
}

let setupUI = () => {
    document.querySelector("#btn-pause").onclick = function() {
        paused = true;
    };
    document.querySelector("#btn-play").onclick = function() {
        if (paused) {
            paused = false;
            update();
        }

    };
    canvas.onclick = canvasClicked;
    document.querySelector("#cb-rectangles").onclick = function(e) {
        createRectangles = e.target.checked;
    }
    document.querySelector("#cb-arcs").onclick = function(e) {
        createArcs = e.target.checked;
    }
    document.querySelector("#cb-lines").onclick = function(e) {
        createLines = e.target.checked;
    }

    document.querySelector("#clear").onclick = function() {
        drawRectangle(ctx, 0, 0, 640, 480, "white", 0, "white");
    }
}

init();