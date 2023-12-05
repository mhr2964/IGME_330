import * as main from "./main.js";
import * as hamburger from "./hamburger.js";
window.onload = () => {
    console.log("window.onload called");
    // 1 - do preload here - load fonts, images, additional sounds, etc...
    main.loadXHR();
    // 2 - start up app
    //main.init();
    hamburger.init();
}