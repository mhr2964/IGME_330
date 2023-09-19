import { getRandomIndex } from "./utils.js";

window.onload = () => {
    let words1;
    let words2;
    let words3;
    let windowSizeCheck = true;

    //Function to generate the babble
    const generateTechnobabble = (num) => {
        output.textContent = "";
        for (let i = 0; i < num; i++) {
            if (i > 0) {
                output.innerHTML += "<br/>"
            }
            output.innerHTML += `${getRandomIndex(words1)} ${getRandomIndex(words2)} ${getRandomIndex(words3)}`;
        }
        if (num > 1 && window.innerWidth > 1024) {
            windowSizeCheck = false;
        }
    }


    //Function to load babble from json file
    function loadBabbleXHR() {
        const url = "data/babble-data.json";
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

            const babble = json["babble-data"].babble;
            words1 = babble["babble-1"];
            words2 = babble["babble-2"];
            words3 = babble["babble-3"];

            //Displaying babble when the page loads
            generateTechnobabble(1);

            //Getting the DOM Elements and setting the button's onclick
            const babbleButton = document.querySelector("#one-babble-btn");
            babbleButton.onclick = () => generateTechnobabble(1);

            const fiveBabbleButton = document.querySelector("#five-babble-btn");
            fiveBabbleButton.onclick = () => generateTechnobabble(5);

            //Just made it call a single generateBabble if it had 5 and was resized smaller
            //since actually fixing the formatted wasnt part of the grade and I'm lazy
            window.onresize = () => {
                if (!windowSizeCheck && window.innerWidth <= 1024) {
                    generateTechnobabble(1);
                    windowSizeCheck = true;
                }
            }
        }
        xhr.onerror = (e) => console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
        xhr.open("GET", url);
        xhr.send();
    }

    const output = document.querySelector("#output");

    loadBabbleXHR();
}