/*
	The purpose of this file is to take in the analyser node and a <canvas> element: 
	  - the module will create a drawing context that points at the <canvas> 
	  - it will store the reference to the analyser node
	  - in draw(), it will loop through the data in the analyser node
	  - and then draw something representative on the canvas
	  - maybe a better name for this file/module would be *visualizer.js* ?
*/

import * as utils from './utils.js';
import CircleSprite from './CircleSprite.js';

let ctx, canvasWidth, canvasHeight, gradient, analyserNode, audioData, audioDataType;

let spriteOne;
let spriteTwo;


const setupCanvas = (canvasElement, analyserNodeRef) => {
    // create drawing context
    ctx = canvasElement.getContext("2d");
    canvasWidth = canvasElement.width;
    canvasHeight = canvasElement.height;
    // create a gradient that runs top to bottom
    gradient = utils.getLinearGradient(ctx, 0, 0, 0, canvasHeight, [{ percent: 1, color: "#98FFFC" }, { percent: .1, color: "#FF98F1" }, { percent: 1, color: "#DD98FF" }]);
    // keep a reference to the analyser node
    analyserNode = analyserNodeRef;
    // this is the array where the analyser data will be stored
    audioData = new Uint8Array(analyserNode.fftSize / 2);
    audioDataType = "option-frequency";

    spriteOne = new CircleSprite(ctx, 10, 200, 100, "black", "white", 3);
    spriteOne.updateTargetIndex(10);

    spriteTwo = new CircleSprite(ctx, 10, 200, 200, "white", "black", 3);
    spriteTwo.updateTargetIndex(40);

}

const draw = (params = {}) => {
    // 1 - populate the audioData array with the frequency data from the analyserNode
    // notice these arrays are passed "by reference" 
    switch (audioDataType) {
        case "option-frequency":
            analyserNode.getByteFrequencyData(audioData);
            break;

        case "option-time-domain":
            analyserNode.getByteTimeDomainData(audioData);
            break;
            //
    }
    // OR
    //analyserNode.getByteTimeDomainData(audioData); // waveform data

    // 2 - draw background
    ctx.save();
    ctx.fillStyles = "black";
    ctx.globalAlpha = .1;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.restore();

    // 3 - draw gradient
    if (params.showGradient) {
        ctx.save();
        ctx.fillStyle = gradient;
        ctx.globalAlpha = .3;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.restore();
    }


    // 4 - draw bars
    if (params.showBars) {
        let barSpacing = 1;
        let margin = 1;
        let screenWidthForBars = canvasWidth - (audioData.length * barSpacing) - margin * 2;
        let barWidth = screenWidthForBars / audioData.length;
        let barHeight = 200;
        let topSpacing = 100;

        ctx.save();
        ctx.fillStyle = 'rgba(255,255,255,0.50)';
        ctx.strokeStyle = 'rgba(0,0,0,0.50)';
        //ctx.lineWidth = 0;
        for (let i = 0; i < audioData.length; i++) {
            ctx.fillStyle = `rgba(${128 - audioData[i] * 2  + 10},${audioData[i] + 10},${i / audioData.length * 255 + 10},1)`;
            ctx.fillRect(margin + i * (barWidth + barSpacing), topSpacing + 256 - audioData[i] + 100, barWidth, barHeight + 100);
            //ctx.strokeRect(margin + i * (barWidth + barSpacing), topSpacing + 256 - audioData[i], barWidth, barHeight);
        }
        ctx.restore();

        ctx.save();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        let x = -1000;
        let y = 450;
        ctx.beginPath();
        ctx.moveTo(x, y);
        x = -(screenWidthForBars / audioData.length) + 10;
        for (let b of audioData) {
            ctx.lineTo(x, y - b);
            x += (ctx.canvas.width / (audioData.length));
        }
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }



    // 5 - draw circles
    if (params.showCircles) {
        let maxRadius = canvasHeight / 2;
        ctx.save();
        ctx.globalAlpha = 0.5;
        for (let i = audioData.length / 4; i < audioData.length; i++) {
            let percent = audioData[i] / 255;
            let circleRadius = percent * maxRadius;
            // blue-ish circles, bigger, more transparent 
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(221, 152, 255, .1 - percent / 10.0);
            ctx.arc(canvasWidth, 0, circleRadius * 1.50, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();
            ctx.restore();
            // red-ish circles
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(255, 152, 241, .34 - percent / 3.0);
            ctx.arc(canvasWidth, 0, circleRadius, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();
            ctx.restore();
            // yellow-ish circles, smaller
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(255, 207, 248, .5 - percent / 5.0);
            ctx.arc(canvasWidth, 0, circleRadius * .50, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }

        for (let i = 0; i < audioData.length / 4; i++) {
            let percent = audioData[i] / 255;
            let circleRadius = percent * maxRadius;
            // blue-ish circles, bigger, more transparent 
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(221, 152, 255, .1 - percent / 10.0);
            ctx.arc(0, 0, circleRadius * 1.50, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();
            ctx.restore();
            // red-ish circles
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(255, 152, 241, .34 - percent / 3.0);
            ctx.arc(0, 0, circleRadius, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();
            ctx.restore();
            // yellow-ish circles, smaller
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(255, 207, 248, .5 - percent / 5.0);
            ctx.arc(0, 0, circleRadius * .50, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }
        ctx.restore();

        spriteOne.updateAudioData(audioData);
        spriteTwo.updateAudioData(audioData);
        spriteOne.update(audioDataType);
        spriteTwo.update(audioDataType);
        spriteOne.draw();
        spriteTwo.draw();
    }
    // 6 - bitmap manipulation
    // TODO: right now. we are looping though every pixel of the canvas (320,000 of them!), 
    // regardless of whether or not we are applying a pixel effect
    // At some point, refactor this code so that we are looping though the image data only if
    // it is necessary

    // A) grab all of the pixels on the canvas and put them in the `data` array
    // `imageData.data` is a `Uint8ClampedArray()` typed array that has 1.28 million elements!
    // the variable `data` below is a reference to that array 

    // B) Iterate through each pixel, stepping 4 elements at a time (which is the RGBA for 1 pixel)


    let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    let data = imageData.data;
    let length = data.length;
    let width = imageData.width;
    for (let i = 0; i < length; i += 4) {
        if (params.showNoise && Math.random() < .002) {
            // data[i] is the red channel
            // data[i+1] is the green channel
            // data[i+2] is the blue channel
            // data[i+3] is the alpha channel
            data[i] = data[i + 1] = data[i + 2] = 255; // zero out the red and green and blue channels
            //data[i + 2] = 255;
            //	} // end if
            // } // end for

            // D) copy image data back to canvas
        }
        if (params.showInvert) {
            let red = data[i],
                green = data[i + 1],
                blue = data[i + 2];
            data[i] = 255 - red;
            data[i + 1] = 255 - green;
            data[i + 2] = 255 - blue;
        }
    }

    if (params.showEmboss) {
        for (let i = 0; i < length; i++) {
            if (i % 4 == 3) continue;
            data[i] = 127 + 2 * data[i] - data[i + 4] - data[i + width * 4];
        }
    }

    ctx.putImageData(imageData, 0, 0);
}

const setAudioDataType = (type) => {
    audioDataType = type;
}

export { setupCanvas, draw, setAudioDataType };