/*
	main.js is primarily responsible for hooking up the UI to the rest of the application 
	and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!

import * as utils from './utils.js';
import * as audio from './audio.js';
import * as canvas from './canvas.js';

const drawParams = {
    showGradient: false,
    showBars: false,
    showCircles: false,
    showNoise: false,
    showInvert: false,
    showEmboss: false
};

let filenames;
// 1 - here we are faking an enumeration
// DEFAULTS = Object.freeze({
//sound1: "media/New Adventure Theme.mp3"
//});

const init = () => {
    console.log("init called");
    console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
    audio.setupWebaudio(filenames[0]);
    let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
    setupUI(canvasElement);
    canvas.setupCanvas(canvasElement, audio.analyserNode);
    loop();
}

const setupUI = (canvasElement) => {
    // A - hookup fullscreen button
    const fsButton = document.querySelector("#btn-fs");
    const playButton = document.querySelector("#btn-play");

    // add .onclick event to button
    fsButton.onclick = e => {
        console.log("goFullscreen() called");
        utils.goFullscreen(canvasElement);
    };

    playButton.onclick = e => {
        console.log(`audioCtx.state before = ${audio.audioCtx.state}`);

        if (audio.audioCtx.state == "suspended") {
            audio.audioCtx.resume();
        }

        console.log(`audioCtx.state after = ${audio.audioCtx.state}`);
        if (e.target.dataset.playing == "no") {
            audio.playCurrentSound();
            e.target.dataset.playing = "yes";
        } else {
            audio.pauseCurrentSound();
            e.target.dataset.playing = "no";
        }
    }

    let volumeSlider = document.querySelector("#slider-volume");
    let volumeLabel = document.querySelector("#label-volume");

    volumeSlider.oninput = e => {
        audio.setVolume(e.target.value);
        volumeLabel.innerHTML = Math.round((e.target.value / 2 * 100));

    }
    volumeSlider.dispatchEvent(new Event("input"));

    let trackSelect = document.querySelector("#select-track");

    trackSelect.onchange = e => {
        audio.loadSoundFile(e.target.value);
        if (playButton.dataset.playing == "yes") {
            playButton.dispatchEvent(new MouseEvent("click"));
        }
    }

    let gradientCheck = document.querySelector("#cb-gradient");
    let barsCheck = document.querySelector("#cb-bar");
    let circlesCheck = document.querySelector("#cb-circles");
    let noiseCheck = document.querySelector("#cb-noise");
    let invertCheck = document.querySelector("#cb-invert");
    let embossCheck = document.querySelector("#cb-emboss");

    gradientCheck.checked = drawParams.showGradient;
    barsCheck.checked = drawParams.showBars;
    circlesCheck.checked = drawParams.showCircles;
    noiseCheck.checked = drawParams.showNoise;
    invertCheck.checked = drawParams.showInvert;
    embossCheck.checked = drawParams.showEmboss;


    gradientCheck.onchange = () => {
        drawParams.showGradient = gradientCheck.checked;
    }

    barsCheck.onchange = () => {
        drawParams.showBars = barsCheck.checked;
    }

    circlesCheck.onchange = () => {
        drawParams.showCircles = circlesCheck.checked;
    }

    noiseCheck.onchange = () => {
        drawParams.showNoise = noiseCheck.checked;
    }

    invertCheck.onchange = () => {
        drawParams.showInvert = invertCheck.checked;
    }

    embossCheck.onchange = () => {
        drawParams.showEmboss = embossCheck.checked;
    }

    // I. set the initial state of the high shelf checkbox
    document.querySelector('#cb-highshelf').checked = audio.getHighShelf(); // `highshelf` is a boolean we will declare in a second

    // II. change the value of `highshelf` every time the high shelf checkbox changes state
    document.querySelector('#cb-highshelf').onchange = e => {
        audio.setHighShelf(e.target.checked);
        audio.toggleHighshelf(); // turn on or turn off the filter, depending on the value of `highshelf`!
    };

    // III. 
    audio.toggleHighshelf(); // when the app starts up, turn on or turn off the filter, depending on the value of `highshelf`!

    document.querySelector('#cb-lowshelf').checked = audio.getLowShelf();


    document.querySelector('#cb-lowshelf').onchange = e => {
        audio.setLowShelf(e.target.checked);
        audio.toggleLowshelf();
    };


    audio.toggleLowshelf();

    document.querySelector("#data-type").onchange = e => {
        canvas.setAudioDataType(e.target.value);

    }
}

const loop = () => {
    /* NOTE: This is temporary testing code that we will delete in Part II */
    setTimeout(loop, 1000 / 60);
    canvas.draw(drawParams);
}

const loadXHR = () => {
    const url = "data/av-data.json";
    const xhr = new XMLHttpRequest();
    xhr.onload = (e) => {
        console.log(`In onload - HTTP Status Code = ${e.target.status}`);
        const text = e.target.responseText;
        let json;
        try {
            json = JSON.parse(text);
        } catch {
            document.querySelector("#output").innerHTML = "JSON.parse(text) failed!";
        }

        let data = json.data;

        document.querySelector("title").textContent = data.title;

        drawParams.showBars = data.initParams.showBars;
        drawParams.showCircles = data.initParams.showCircles;
        drawParams.showGradient = data.initParams.showGradient;
        drawParams.showEmboss = data.initParams.showEmboss;
        drawParams.showInvert = data.initParams.showInvert;
        drawParams.showNoise = data.initParams.showNoise;

        filenames = data.filenames;
        let list = document.querySelector("#select-track");
        let html;
        for (let i = 0; i < filenames.length; i++) {
            //console.log(filenames[i]);
            html += `<option value="${filenames[i]}"`
            if (i == 0) {
                html += " selected";
            }
            html += `>${filenames[i].substring(6, filenames[i].length - 1 - 3)}</option>`;
        }
        list.innerHTML = html;
        init();
    }
    xhr.onerror = (e) => console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
    xhr.open("GET", url);
    xhr.send();
}

export { init, loadXHR };