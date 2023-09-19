"use strict"
//Gets a random index from a given array
const getRandomIndex = (array) => {
    let random = Math.floor(Math.random() * (array.length));
    return array[random];
}

export { getRandomIndex };