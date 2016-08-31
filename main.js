"use strict";

var points = 0;
var autoclickers = 0;
var autoclickersCost = 10;

function getClicked(count) {
    points = points + count;
    
    document.getElementById("pointTracker").innerHTML = points;
}

function buyAutoclicker(count) {
    while (count > 0) {
        count = count - 1;
        if (points > autoclickersCost) {
            autoclickers = autoclickers + 1;
            points = points - autoclickersCost;
        } else {
            break;
        }
    }
    
    document.getElementById("autoclickersTracker").innerHTML = autoclickers;
    document.getElementById("pointTracker").innerHTML = points;
}

window.setInterval(
    function () {
        getClicked(autoclickers + 1);
    },
    250
);