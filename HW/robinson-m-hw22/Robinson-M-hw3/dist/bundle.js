/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/CircleSprite.js":
/*!*****************************!*\
  !*** ./src/CircleSprite.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ CircleSprite)\n/* harmony export */ });\nclass CircleSprite {\r\n    constructor(ctx, radius, x, y, fillColor, strokeColor, lineWidth) {\r\n        this.ctx = ctx;\r\n        this.radius = radius;\r\n        this.x = x;\r\n        this.y = y;\r\n        this.startx = x;\r\n        this.starty = y;\r\n        this.fillColor = fillColor;\r\n        this.strokeColor = strokeColor;\r\n        this.lineWidth = lineWidth;\r\n        this.data = [0];\r\n        this.targetIndex = 0;\r\n        Object.seal(this);\r\n    }\r\n\r\n    updateTargetIndex(index) {\r\n        this.targetIndex = index;\r\n    }\r\n\r\n    updateAudioData(data) {\r\n        this.data = data;\r\n    }\r\n\r\n    draw() {\r\n        this.ctx.save();\r\n        this.ctx.fillStyle = this.fillColor;\r\n        this.ctx.strokeStyle = this.strokeColor;\r\n        this.ctx.lineWidth = this.lineWidth;\r\n        this.ctx.beginPath();\r\n        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);\r\n        this.ctx.closePath();\r\n        this.ctx.fill();\r\n        this.ctx.stroke();\r\n        this.ctx.restore();\r\n    }\r\n\r\n    update(datatype) {\r\n        switch (datatype) {\r\n            case \"option-frequency\":\r\n                this.x = Math.cos(this.data[this.targetIndex]) * 100 + 400;\r\n                this.y = this.starty;\r\n                break;\r\n\r\n            case \"option-time-domain\":\r\n                this.y = Math.sin(this.data[this.targetIndex]) * 100 + 400;\r\n                this.x = this.startx;\r\n                break;\r\n        }\r\n    }\r\n\r\n}\n\n//# sourceURL=webpack://robinson-m-hw2/./src/CircleSprite.js?");

/***/ }),

/***/ "./src/audio.js":
/*!**********************!*\
  !*** ./src/audio.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   analyserNode: () => (/* binding */ analyserNode),\n/* harmony export */   audioCtx: () => (/* binding */ audioCtx),\n/* harmony export */   getHighShelf: () => (/* binding */ getHighShelf),\n/* harmony export */   getLowShelf: () => (/* binding */ getLowShelf),\n/* harmony export */   loadSoundFile: () => (/* binding */ loadSoundFile),\n/* harmony export */   pauseCurrentSound: () => (/* binding */ pauseCurrentSound),\n/* harmony export */   playCurrentSound: () => (/* binding */ playCurrentSound),\n/* harmony export */   setHighShelf: () => (/* binding */ setHighShelf),\n/* harmony export */   setLowShelf: () => (/* binding */ setLowShelf),\n/* harmony export */   setVolume: () => (/* binding */ setVolume),\n/* harmony export */   setupWebaudio: () => (/* binding */ setupWebaudio),\n/* harmony export */   toggleHighshelf: () => (/* binding */ toggleHighshelf),\n/* harmony export */   toggleLowshelf: () => (/* binding */ toggleLowshelf)\n/* harmony export */ });\n// 1 - our WebAudio context, **we will export and make this public at the bottom of the file**\r\nlet audioCtx;\r\n\r\n// **These are \"private\" properties - these will NOT be visible outside of this module (i.e. file)**\r\n// 2 - WebAudio nodes that are part of our WebAudio audio routing graph\r\nlet element, sourceNode, analyserNode, gainNode;\r\nlet highshelf = false;\r\nlet lowshelf = false;\r\nlet highShelfBiquadFilter;\r\n//biquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);\r\n// biquadFilter.gain.setValueAtTime(25, audioCtx.currentTime);\r\n\r\nlet lowShelfBiquadFilter;\r\n\r\n// 3 - here we are faking an enumeration\r\nconst DEFAULTS = Object.freeze({\r\n    gain: .5,\r\n    numSamples: 256\r\n});\r\n\r\n// 4 - create a new array of 8-bit integers (0-255)\r\n// this is a typed array to hold the audio frequency data\r\nlet audioData = new Uint8Array(DEFAULTS.numSamples / 2);\r\n\r\n// **Next are \"public\" methods - we are going to export all of these at the bottom of this file**\r\n\r\nconst setupWebaudio = (filePath) => {\r\n    // 1 - The || is because WebAudio has not been standardized across browsers yet\r\n    const AudioContext = window.AudioContext || window.webkitAudioContext;\r\n    audioCtx = new AudioContext();\r\n\r\n\r\n    // 2 - this creates an <audio> element\r\n    element = new Audio();\r\n\r\n    // 3 - have it point at a sound file\r\n    loadSoundFile(filePath);\r\n\r\n    // 4 - create an a source node that points at the <audio> element\r\n    sourceNode = audioCtx.createMediaElementSource(element);\r\n\r\n    highShelfBiquadFilter = audioCtx.createBiquadFilter();\r\n    highShelfBiquadFilter.type = \"highshelf\";\r\n    //biquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);\r\n    // biquadFilter.gain.setValueAtTime(25, audioCtx.currentTime);\r\n\r\n    lowShelfBiquadFilter = audioCtx.createBiquadFilter();\r\n    lowShelfBiquadFilter.type = \"lowshelf\";\r\n\r\n    // 5 - create an analyser node\r\n    analyserNode = audioCtx.createAnalyser(); // note the UK spelling of \"Analyser\"\r\n\r\n    /*\r\n    // 6\r\n    We will request DEFAULTS.numSamples number of samples or \"bins\" spaced equally \r\n    across the sound spectrum.\r\n\r\n    If DEFAULTS.numSamples (fftSize) is 256, then the first bin is 0 Hz, the second is 172 Hz, \r\n    the third is 344Hz, and so on. Each bin contains a number between 0-255 representing \r\n    the amplitude of that frequency.\r\n    */\r\n\r\n    // fft stands for Fast Fourier Transform\r\n    analyserNode.fftSize = DEFAULTS.numSamples;\r\n\r\n\r\n    // 7 - create a gain (volume) node\r\n    gainNode = audioCtx.createGain();\r\n    gainNode.gain.value = DEFAULTS.gain;\r\n\r\n    // 8 - connect the nodes - we now have an audio graph\r\n    sourceNode.connect(lowShelfBiquadFilter);\r\n    lowShelfBiquadFilter.connect(highShelfBiquadFilter);\r\n    highShelfBiquadFilter.connect(analyserNode);\r\n    analyserNode.connect(gainNode);\r\n    gainNode.connect(audioCtx.destination);\r\n}\r\n\r\nconst loadSoundFile = (filePath) => {\r\n    element.src = filePath;\r\n}\r\n\r\nconst playCurrentSound = () => {\r\n    element.play();\r\n}\r\n\r\nconst pauseCurrentSound = () => {\r\n    element.pause();\r\n}\r\n\r\nconst setVolume = (value) => {\r\n    value = Number(value); // make sure that it's a Number rather than a String\r\n    gainNode.gain.value = value;\r\n}\r\n\r\nconst toggleHighshelf = () => {\r\n    if (highshelf) {\r\n        highShelfBiquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime); // we created the `biquadFilter` (i.e. \"treble\") node last time\r\n        highShelfBiquadFilter.gain.setValueAtTime(25, audioCtx.currentTime);\r\n    } else {\r\n        highShelfBiquadFilter.gain.setValueAtTime(0, audioCtx.currentTime);\r\n    }\r\n}\r\n\r\nconst toggleLowshelf = () => {\r\n    if (lowshelf) {\r\n        lowShelfBiquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);\r\n        lowShelfBiquadFilter.gain.setValueAtTime(15, audioCtx.currentTime);\r\n    } else {\r\n        lowShelfBiquadFilter.gain.setValueAtTime(0, audioCtx.currentTime);\r\n    }\r\n}\r\n\r\nconst setHighShelf = (hs) => {\r\n    highshelf = hs;\r\n}\r\n\r\nconst setLowShelf = (ls) => {\r\n    lowshelf = ls;\r\n}\r\n\r\nconst getHighShelf = () => {\r\n    return highshelf;\r\n}\r\n\r\nconst getLowShelf = () => {\r\n    return lowshelf;\r\n}\r\n\n\n//# sourceURL=webpack://robinson-m-hw2/./src/audio.js?");

/***/ }),

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   draw: () => (/* binding */ draw),\n/* harmony export */   setAudioDataType: () => (/* binding */ setAudioDataType),\n/* harmony export */   setupCanvas: () => (/* binding */ setupCanvas)\n/* harmony export */ });\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\n/* harmony import */ var _CircleSprite_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CircleSprite.js */ \"./src/CircleSprite.js\");\n/*\r\n\tThe purpose of this file is to take in the analyser node and a <canvas> element: \r\n\t  - the module will create a drawing context that points at the <canvas> \r\n\t  - it will store the reference to the analyser node\r\n\t  - in draw(), it will loop through the data in the analyser node\r\n\t  - and then draw something representative on the canvas\r\n\t  - maybe a better name for this file/module would be *visualizer.js* ?\r\n*/\r\n\r\n\r\n\r\n\r\nlet ctx, canvasWidth, canvasHeight, gradient, analyserNode, audioData, audioDataType;\r\n\r\nlet spriteOne;\r\nlet spriteTwo;\r\n\r\n\r\nconst setupCanvas = (canvasElement, analyserNodeRef) => {\r\n    // create drawing context\r\n    ctx = canvasElement.getContext(\"2d\");\r\n    canvasWidth = canvasElement.width;\r\n    canvasHeight = canvasElement.height;\r\n    // create a gradient that runs top to bottom\r\n    gradient = _utils_js__WEBPACK_IMPORTED_MODULE_0__.getLinearGradient(ctx, 0, 0, 0, canvasHeight, [{ percent: 1, color: \"#98FFFC\" }, { percent: .1, color: \"#FF98F1\" }, { percent: 1, color: \"#DD98FF\" }]);\r\n    // keep a reference to the analyser node\r\n    analyserNode = analyserNodeRef;\r\n    // this is the array where the analyser data will be stored\r\n    audioData = new Uint8Array(analyserNode.fftSize / 2);\r\n    audioDataType = \"option-frequency\";\r\n\r\n    spriteOne = new _CircleSprite_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](ctx, 10, 200, 100, \"black\", \"white\", 3);\r\n    spriteOne.updateTargetIndex(10);\r\n\r\n    spriteTwo = new _CircleSprite_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](ctx, 10, 200, 200, \"white\", \"black\", 3);\r\n    spriteTwo.updateTargetIndex(40);\r\n\r\n}\r\n\r\nconst draw = (params = {}) => {\r\n    // 1 - populate the audioData array with the frequency data from the analyserNode\r\n    // notice these arrays are passed \"by reference\" \r\n    switch (audioDataType) {\r\n        case \"option-frequency\":\r\n            analyserNode.getByteFrequencyData(audioData);\r\n            break;\r\n\r\n        case \"option-time-domain\":\r\n            analyserNode.getByteTimeDomainData(audioData);\r\n            break;\r\n            //\r\n    }\r\n    // OR\r\n    //analyserNode.getByteTimeDomainData(audioData); // waveform data\r\n\r\n    // 2 - draw background\r\n    ctx.save();\r\n    ctx.fillStyles = \"black\";\r\n    ctx.globalAlpha = .1;\r\n    ctx.fillRect(0, 0, canvasWidth, canvasHeight);\r\n    ctx.restore();\r\n\r\n    // 3 - draw gradient\r\n    if (params.showGradient) {\r\n        ctx.save();\r\n        ctx.fillStyle = gradient;\r\n        ctx.globalAlpha = .3;\r\n        ctx.fillRect(0, 0, canvasWidth, canvasHeight);\r\n        ctx.restore();\r\n    }\r\n\r\n\r\n    // 4 - draw bars\r\n    if (params.showBars) {\r\n        let barSpacing = 1;\r\n        let margin = 1;\r\n        let screenWidthForBars = canvasWidth - (audioData.length * barSpacing) - margin * 2;\r\n        let barWidth = screenWidthForBars / audioData.length;\r\n        let barHeight = 200;\r\n        let topSpacing = 100;\r\n\r\n        ctx.save();\r\n        ctx.fillStyle = 'rgba(255,255,255,0.50)';\r\n        ctx.strokeStyle = 'rgba(0,0,0,0.50)';\r\n        //ctx.lineWidth = 0;\r\n        for (let i = 0; i < audioData.length; i++) {\r\n            ctx.fillStyle = `rgba(${128 - audioData[i] * 2  + 10},${audioData[i] + 10},${i / audioData.length * 255 + 10},1)`;\r\n            ctx.fillRect(margin + i * (barWidth + barSpacing), topSpacing + 256 - audioData[i] + 100, barWidth, barHeight + 100);\r\n            //ctx.strokeRect(margin + i * (barWidth + barSpacing), topSpacing + 256 - audioData[i], barWidth, barHeight);\r\n        }\r\n        ctx.restore();\r\n\r\n        ctx.save();\r\n        ctx.strokeStyle = \"white\";\r\n        ctx.lineWidth = 5;\r\n        let x = -1000;\r\n        let y = 450;\r\n        ctx.beginPath();\r\n        ctx.moveTo(x, y);\r\n        x = -(screenWidthForBars / audioData.length) + 10;\r\n        for (let b of audioData) {\r\n            ctx.lineTo(x, y - b);\r\n            x += (ctx.canvas.width / (audioData.length));\r\n        }\r\n        ctx.stroke();\r\n        ctx.closePath();\r\n        ctx.restore();\r\n    }\r\n\r\n\r\n\r\n    // 5 - draw circles\r\n    if (params.showCircles) {\r\n        let maxRadius = canvasHeight / 2;\r\n        ctx.save();\r\n        ctx.globalAlpha = 0.5;\r\n        for (let i = audioData.length / 4; i < audioData.length; i++) {\r\n            let percent = audioData[i] / 255;\r\n            let circleRadius = percent * maxRadius;\r\n            // blue-ish circles, bigger, more transparent \r\n            ctx.save();\r\n            ctx.beginPath();\r\n            ctx.fillStyle = _utils_js__WEBPACK_IMPORTED_MODULE_0__.makeColor(221, 152, 255, .1 - percent / 10.0);\r\n            ctx.arc(canvasWidth, 0, circleRadius * 1.50, 0, 2 * Math.PI, false);\r\n            ctx.fill();\r\n            ctx.closePath();\r\n            ctx.restore();\r\n            // red-ish circles\r\n            ctx.save();\r\n            ctx.beginPath();\r\n            ctx.fillStyle = _utils_js__WEBPACK_IMPORTED_MODULE_0__.makeColor(255, 152, 241, .34 - percent / 3.0);\r\n            ctx.arc(canvasWidth, 0, circleRadius, 0, 2 * Math.PI, false);\r\n            ctx.fill();\r\n            ctx.closePath();\r\n            ctx.restore();\r\n            // yellow-ish circles, smaller\r\n            ctx.save();\r\n            ctx.beginPath();\r\n            ctx.fillStyle = _utils_js__WEBPACK_IMPORTED_MODULE_0__.makeColor(255, 207, 248, .5 - percent / 5.0);\r\n            ctx.arc(canvasWidth, 0, circleRadius * .50, 0, 2 * Math.PI, false);\r\n            ctx.fill();\r\n            ctx.closePath();\r\n            ctx.restore();\r\n        }\r\n\r\n        for (let i = 0; i < audioData.length / 4; i++) {\r\n            let percent = audioData[i] / 255;\r\n            let circleRadius = percent * maxRadius;\r\n            // blue-ish circles, bigger, more transparent \r\n            ctx.save();\r\n            ctx.beginPath();\r\n            ctx.fillStyle = _utils_js__WEBPACK_IMPORTED_MODULE_0__.makeColor(221, 152, 255, .1 - percent / 10.0);\r\n            ctx.arc(0, 0, circleRadius * 1.50, 0, 2 * Math.PI, false);\r\n            ctx.fill();\r\n            ctx.closePath();\r\n            ctx.restore();\r\n            // red-ish circles\r\n            ctx.save();\r\n            ctx.beginPath();\r\n            ctx.fillStyle = _utils_js__WEBPACK_IMPORTED_MODULE_0__.makeColor(255, 152, 241, .34 - percent / 3.0);\r\n            ctx.arc(0, 0, circleRadius, 0, 2 * Math.PI, false);\r\n            ctx.fill();\r\n            ctx.closePath();\r\n            ctx.restore();\r\n            // yellow-ish circles, smaller\r\n            ctx.save();\r\n            ctx.beginPath();\r\n            ctx.fillStyle = _utils_js__WEBPACK_IMPORTED_MODULE_0__.makeColor(255, 207, 248, .5 - percent / 5.0);\r\n            ctx.arc(0, 0, circleRadius * .50, 0, 2 * Math.PI, false);\r\n            ctx.fill();\r\n            ctx.closePath();\r\n            ctx.restore();\r\n        }\r\n        ctx.restore();\r\n\r\n        spriteOne.updateAudioData(audioData);\r\n        spriteTwo.updateAudioData(audioData);\r\n        spriteOne.update(audioDataType);\r\n        spriteTwo.update(audioDataType);\r\n        spriteOne.draw();\r\n        spriteTwo.draw();\r\n    }\r\n    // 6 - bitmap manipulation\r\n    // TODO: right now. we are looping though every pixel of the canvas (320,000 of them!), \r\n    // regardless of whether or not we are applying a pixel effect\r\n    // At some point, refactor this code so that we are looping though the image data only if\r\n    // it is necessary\r\n\r\n    // A) grab all of the pixels on the canvas and put them in the `data` array\r\n    // `imageData.data` is a `Uint8ClampedArray()` typed array that has 1.28 million elements!\r\n    // the variable `data` below is a reference to that array \r\n\r\n    // B) Iterate through each pixel, stepping 4 elements at a time (which is the RGBA for 1 pixel)\r\n\r\n\r\n    let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);\r\n    let data = imageData.data;\r\n    let length = data.length;\r\n    let width = imageData.width;\r\n    for (let i = 0; i < length; i += 4) {\r\n        if (params.showNoise && Math.random() < .002) {\r\n            // data[i] is the red channel\r\n            // data[i+1] is the green channel\r\n            // data[i+2] is the blue channel\r\n            // data[i+3] is the alpha channel\r\n            data[i] = data[i + 1] = data[i + 2] = 255; // zero out the red and green and blue channels\r\n            //data[i + 2] = 255;\r\n            //\t} // end if\r\n            // } // end for\r\n\r\n            // D) copy image data back to canvas\r\n        }\r\n        if (params.showInvert) {\r\n            let red = data[i],\r\n                green = data[i + 1],\r\n                blue = data[i + 2];\r\n            data[i] = 255 - red;\r\n            data[i + 1] = 255 - green;\r\n            data[i + 2] = 255 - blue;\r\n        }\r\n    }\r\n\r\n    if (params.showEmboss) {\r\n        for (let i = 0; i < length; i++) {\r\n            if (i % 4 == 3) continue;\r\n            data[i] = 127 + 2 * data[i] - data[i + 4] - data[i + width * 4];\r\n        }\r\n    }\r\n\r\n    ctx.putImageData(imageData, 0, 0);\r\n}\r\n\r\nconst setAudioDataType = (type) => {\r\n    audioDataType = type;\r\n}\r\n\r\n\n\n//# sourceURL=webpack://robinson-m-hw2/./src/canvas.js?");

/***/ }),

/***/ "./src/hamburger.js":
/*!**************************!*\
  !*** ./src/hamburger.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   init: () => (/* binding */ init)\n/* harmony export */ });\n//mobile menu\r\nconst burgerIcon = document.querySelector(\"#burger\");\r\nconst navbarMenu = document.querySelector(\"#nav-links\");\r\n\r\nconst init = () => {\r\n    burgerIcon.addEventListener(\"click\", () => {\r\n        navbarMenu.classList.toggle(\"is-active\");\r\n    })\r\n};\r\n\r\n\n\n//# sourceURL=webpack://robinson-m-hw2/./src/hamburger.js?");

/***/ }),

/***/ "./src/loader.js":
/*!***********************!*\
  !*** ./src/loader.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.js */ \"./src/main.js\");\n/* harmony import */ var _hamburger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hamburger.js */ \"./src/hamburger.js\");\n\r\n\r\nwindow.onload = () => {\r\n    console.log(\"window.onload called\");\r\n    // 1 - do preload here - load fonts, images, additional sounds, etc...\r\n    _main_js__WEBPACK_IMPORTED_MODULE_0__.loadXHR();\r\n    // 2 - start up app\r\n    //main.init();\r\n    _hamburger_js__WEBPACK_IMPORTED_MODULE_1__.init();\r\n}\n\n//# sourceURL=webpack://robinson-m-hw2/./src/loader.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   init: () => (/* binding */ init),\n/* harmony export */   loadXHR: () => (/* binding */ loadXHR)\n/* harmony export */ });\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\n/* harmony import */ var _audio_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./audio.js */ \"./src/audio.js\");\n/* harmony import */ var _canvas_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./canvas.js */ \"./src/canvas.js\");\n/*\r\n\tmain.js is primarily responsible for hooking up the UI to the rest of the application \r\n\tand setting up the main event loop\r\n*/\r\n\r\n// We will write the functions in this file in the traditional ES5 way\r\n// In this instance, we feel the code is more readable if written this way\r\n// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!\r\n\r\n\r\n\r\n\r\n\r\nconst drawParams = {\r\n    showGradient: false,\r\n    showBars: false,\r\n    showCircles: false,\r\n    showNoise: false,\r\n    showInvert: false,\r\n    showEmboss: false\r\n};\r\n\r\nlet filenames;\r\n// 1 - here we are faking an enumeration\r\n// DEFAULTS = Object.freeze({\r\n//sound1: \"media/New Adventure Theme.mp3\"\r\n//});\r\n\r\nconst init = () => {\r\n    console.log(\"init called\");\r\n    console.log(`Testing utils.getRandomColor() import: ${_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomColor()}`);\r\n    _audio_js__WEBPACK_IMPORTED_MODULE_1__.setupWebaudio(filenames[0]);\r\n    let canvasElement = document.querySelector(\"canvas\"); // hookup <canvas> element\r\n    setupUI(canvasElement);\r\n    _canvas_js__WEBPACK_IMPORTED_MODULE_2__.setupCanvas(canvasElement, _audio_js__WEBPACK_IMPORTED_MODULE_1__.analyserNode);\r\n    loop();\r\n}\r\n\r\nconst setupUI = (canvasElement) => {\r\n    // A - hookup fullscreen button\r\n    const fsButton = document.querySelector(\"#btn-fs\");\r\n    const playButton = document.querySelector(\"#btn-play\");\r\n\r\n    // add .onclick event to button\r\n    fsButton.onclick = e => {\r\n        console.log(\"goFullscreen() called\");\r\n        _utils_js__WEBPACK_IMPORTED_MODULE_0__.goFullscreen(canvasElement);\r\n    };\r\n\r\n    playButton.onclick = e => {\r\n        console.log(`audioCtx.state before = ${_audio_js__WEBPACK_IMPORTED_MODULE_1__.audioCtx.state}`);\r\n\r\n        if (_audio_js__WEBPACK_IMPORTED_MODULE_1__.audioCtx.state == \"suspended\") {\r\n            _audio_js__WEBPACK_IMPORTED_MODULE_1__.audioCtx.resume();\r\n        }\r\n\r\n        console.log(`audioCtx.state after = ${_audio_js__WEBPACK_IMPORTED_MODULE_1__.audioCtx.state}`);\r\n        if (e.target.dataset.playing == \"no\") {\r\n            _audio_js__WEBPACK_IMPORTED_MODULE_1__.playCurrentSound();\r\n            e.target.dataset.playing = \"yes\";\r\n        } else {\r\n            _audio_js__WEBPACK_IMPORTED_MODULE_1__.pauseCurrentSound();\r\n            e.target.dataset.playing = \"no\";\r\n        }\r\n    }\r\n\r\n    let volumeSlider = document.querySelector(\"#slider-volume\");\r\n    let volumeLabel = document.querySelector(\"#label-volume\");\r\n\r\n    volumeSlider.oninput = e => {\r\n        _audio_js__WEBPACK_IMPORTED_MODULE_1__.setVolume(e.target.value);\r\n        volumeLabel.innerHTML = Math.round((e.target.value / 2 * 100));\r\n\r\n    }\r\n    volumeSlider.dispatchEvent(new Event(\"input\"));\r\n\r\n    let trackSelect = document.querySelector(\"#select-track\");\r\n\r\n    trackSelect.onchange = e => {\r\n        _audio_js__WEBPACK_IMPORTED_MODULE_1__.loadSoundFile(e.target.value);\r\n        if (playButton.dataset.playing == \"yes\") {\r\n            playButton.dispatchEvent(new MouseEvent(\"click\"));\r\n        }\r\n    }\r\n\r\n    let gradientCheck = document.querySelector(\"#cb-gradient\");\r\n    let barsCheck = document.querySelector(\"#cb-bar\");\r\n    let circlesCheck = document.querySelector(\"#cb-circles\");\r\n    let noiseCheck = document.querySelector(\"#cb-noise\");\r\n    let invertCheck = document.querySelector(\"#cb-invert\");\r\n    let embossCheck = document.querySelector(\"#cb-emboss\");\r\n\r\n    gradientCheck.checked = drawParams.showGradient;\r\n    barsCheck.checked = drawParams.showBars;\r\n    circlesCheck.checked = drawParams.showCircles;\r\n    noiseCheck.checked = drawParams.showNoise;\r\n    invertCheck.checked = drawParams.showInvert;\r\n    embossCheck.checked = drawParams.showEmboss;\r\n\r\n\r\n    gradientCheck.onchange = () => {\r\n        drawParams.showGradient = gradientCheck.checked;\r\n    }\r\n\r\n    barsCheck.onchange = () => {\r\n        drawParams.showBars = barsCheck.checked;\r\n    }\r\n\r\n    circlesCheck.onchange = () => {\r\n        drawParams.showCircles = circlesCheck.checked;\r\n    }\r\n\r\n    noiseCheck.onchange = () => {\r\n        drawParams.showNoise = noiseCheck.checked;\r\n    }\r\n\r\n    invertCheck.onchange = () => {\r\n        drawParams.showInvert = invertCheck.checked;\r\n    }\r\n\r\n    embossCheck.onchange = () => {\r\n        drawParams.showEmboss = embossCheck.checked;\r\n    }\r\n\r\n    // I. set the initial state of the high shelf checkbox\r\n    document.querySelector('#cb-highshelf').checked = _audio_js__WEBPACK_IMPORTED_MODULE_1__.getHighShelf(); // `highshelf` is a boolean we will declare in a second\r\n\r\n    // II. change the value of `highshelf` every time the high shelf checkbox changes state\r\n    document.querySelector('#cb-highshelf').onchange = e => {\r\n        _audio_js__WEBPACK_IMPORTED_MODULE_1__.setHighShelf(e.target.checked);\r\n        _audio_js__WEBPACK_IMPORTED_MODULE_1__.toggleHighshelf(); // turn on or turn off the filter, depending on the value of `highshelf`!\r\n    };\r\n\r\n    // III. \r\n    _audio_js__WEBPACK_IMPORTED_MODULE_1__.toggleHighshelf(); // when the app starts up, turn on or turn off the filter, depending on the value of `highshelf`!\r\n\r\n    document.querySelector('#cb-lowshelf').checked = _audio_js__WEBPACK_IMPORTED_MODULE_1__.getLowShelf();\r\n\r\n\r\n    document.querySelector('#cb-lowshelf').onchange = e => {\r\n        _audio_js__WEBPACK_IMPORTED_MODULE_1__.setLowShelf(e.target.checked);\r\n        _audio_js__WEBPACK_IMPORTED_MODULE_1__.toggleLowshelf();\r\n    };\r\n\r\n\r\n    _audio_js__WEBPACK_IMPORTED_MODULE_1__.toggleLowshelf();\r\n\r\n    document.querySelector(\"#data-type\").onchange = e => {\r\n        _canvas_js__WEBPACK_IMPORTED_MODULE_2__.setAudioDataType(e.target.value);\r\n\r\n    }\r\n}\r\n\r\nconst loop = () => {\r\n    /* NOTE: This is temporary testing code that we will delete in Part II */\r\n    setTimeout(loop, 1000 / 60);\r\n    _canvas_js__WEBPACK_IMPORTED_MODULE_2__.draw(drawParams);\r\n}\r\n\r\nconst loadXHR = () => {\r\n    const url = \"data/av-data.json\";\r\n    const xhr = new XMLHttpRequest();\r\n    xhr.onload = (e) => {\r\n        console.log(`In onload - HTTP Status Code = ${e.target.status}`);\r\n        const text = e.target.responseText;\r\n        let json;\r\n        try {\r\n            json = JSON.parse(text);\r\n        } catch {\r\n            document.querySelector(\"#output\").innerHTML = \"JSON.parse(text) failed!\";\r\n        }\r\n\r\n        let data = json.data;\r\n\r\n        document.querySelector(\"title\").textContent = data.title;\r\n\r\n        drawParams.showBars = data.initParams.showBars;\r\n        drawParams.showCircles = data.initParams.showCircles;\r\n        drawParams.showGradient = data.initParams.showGradient;\r\n        drawParams.showEmboss = data.initParams.showEmboss;\r\n        drawParams.showInvert = data.initParams.showInvert;\r\n        drawParams.showNoise = data.initParams.showNoise;\r\n\r\n        filenames = data.filenames;\r\n        let list = document.querySelector(\"#select-track\");\r\n        let html;\r\n        for (let i = 0; i < filenames.length; i++) {\r\n            //console.log(filenames[i]);\r\n            html += `<option value=\"${filenames[i]}\"`\r\n            if (i == 0) {\r\n                html += \" selected\";\r\n            }\r\n            html += `>${filenames[i].substring(6, filenames[i].length - 1 - 3)}</option>`;\r\n        }\r\n        list.innerHTML = html;\r\n        init();\r\n    }\r\n    xhr.onerror = (e) => console.log(`In onerror - HTTP Status Code = ${e.target.status}`);\r\n    xhr.open(\"GET\", url);\r\n    xhr.send();\r\n}\r\n\r\n\n\n//# sourceURL=webpack://robinson-m-hw2/./src/main.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getLinearGradient: () => (/* binding */ getLinearGradient),\n/* harmony export */   getRandomColor: () => (/* binding */ getRandomColor),\n/* harmony export */   goFullscreen: () => (/* binding */ goFullscreen),\n/* harmony export */   makeColor: () => (/* binding */ makeColor)\n/* harmony export */ });\nconst makeColor = (red, green, blue, alpha = 1) => {\r\n    return `rgba(${red},${green},${blue},${alpha})`;\r\n};\r\n\r\nconst getRandom = (min, max) => {\r\n    return Math.random() * (max - min) + min;\r\n};\r\n\r\nconst getRandomColor = () => {\r\n    const floor = 35; // so that colors are not too bright or too dark \r\n    const getByte = () => getRandom(floor, 255 - floor);\r\n    return `rgba(${getByte()},${getByte()},${getByte()},1)`;\r\n};\r\n\r\nconst getLinearGradient = (ctx, startX, startY, endX, endY, colorStops) => {\r\n    let lg = ctx.createLinearGradient(startX, startY, endX, endY);\r\n    for (let stop of colorStops) {\r\n        lg.addColorStop(stop.percent, stop.color);\r\n    }\r\n    return lg;\r\n};\r\n\r\n// https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API\r\nconst goFullscreen = (element) => {\r\n    if (element.requestFullscreen) {\r\n        element.requestFullscreen();\r\n    } else if (element.mozRequestFullscreen) {\r\n        element.mozRequestFullscreen();\r\n    } else if (element.mozRequestFullScreen) { // camel-cased 'S' was changed to 's' in spec\r\n        element.mozRequestFullScreen();\r\n    } else if (element.webkitRequestFullscreen) {\r\n        element.webkitRequestFullscreen();\r\n    }\r\n    // .. and do nothing if the method is not supported\r\n};\r\n\r\n\n\n//# sourceURL=webpack://robinson-m-hw2/./src/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/loader.js");
/******/ 	
/******/ })()
;