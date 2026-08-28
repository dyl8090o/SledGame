import { saveData } from "./accountHandler.js";
import { config } from "./config.js";
import { gameStateChange } from "./main.js";
export { setUpPlayer, movePlayer, rockHit }

let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d")
const keys = { left: false, right: false, up: false, down: false, shift: false, h: false};
let verticalModifier = 0;
let rockHitModifier = 0;
let rockHitXModifier = 0;
let rockHitYModifier = 0;


const subwaySurfersSledVideo = document.createElement("video");
subwaySurfersSledVideo.src = "Images/subwaySurfersSled.webm";
subwaySurfersSledVideo.loop = true;
subwaySurfersSledVideo.muted = true;
subwaySurfersSledVideo.playsInline = true;

const sledImage = new Image();
sledImage.src = "Images/redArrow.png";

function setUpPlayer(){

    if (config.gameState === "game"){
        sledImage.src = config.usedSled;
        subwaySurfersSledVideo.play();

        config.speed = config.baseSpeed;
        config.iFrames = 0;
        rockHitXModifier = 0;
        rockHitYModifier = 0;

        config.playerX = 310;
        config.playerY = 760;
        config.playerRotate = 0;
        context.drawImage(sledImage, config.playerX, config.playerY, config.playerWidth, config.playerHeight)
    }
}

function movePlayer(deltaTime) {

    // Decay iFrames
    if (config.iFrames > 0) config.iFrames = config.iFrames - deltaTime;

    // Rotate Sled
    if (keys.left === true && config.playerRotate > (-60 * (Math.PI / 180)) && config.playerX > 42) {config.playerRotate = config.playerRotate - ((100 * (Math.PI / 180)) * deltaTime); config.totalAngleRotated += Math.abs((100) * deltaTime);}
    if (keys.right === true && config.playerRotate < (60 * (Math.PI / 180)) && config.playerX < 657) {config.playerRotate = config.playerRotate + ((100 * (Math.PI / 180)) * deltaTime); config.totalAngleRotated += Math.abs((100) * deltaTime);}
    // Rotate Sled If Offscreen
    if (config.playerRotate > (-60 * (Math.PI / 180)) && config.playerX > 657) {config.playerRotate = config.playerRotate - ((100 * (Math.PI / 180)) * deltaTime); config.totalAngleRotated += Math.abs((100) * deltaTime);}
    if (config.playerRotate < (60 * (Math.PI / 180)) && config.playerX < 42) {config.playerRotate = config.playerRotate + ((100 * (Math.PI / 180)) * deltaTime); config.totalAngleRotated += Math.abs((100) * deltaTime);}
    // Move Sled Based On Rotation
    if (config.playerX > 44 && config.playerRotate < 0 || config.playerX < 655 && config.playerRotate > 0){config.playerX = config.playerX + ((125 * Math.sin(config.playerRotate)*1.25) * deltaTime); config.totalHorizontalMovement += Math.abs((125 * Math.sin(config.playerRotate)*1.25) * deltaTime);}

    // W/S Changing verticalModifier
    if (keys.up === true && config.playerY > 50 && verticalModifier < 1) verticalModifier = verticalModifier + ((125 * .02) * deltaTime);
    if (keys.down === true && config.playerY < 850 && verticalModifier > -1) verticalModifier = verticalModifier - ((125 * .02) * deltaTime);
    // Change verticalModifier If Offscreen
    if (config.playerY < 50 && verticalModifier < 1) verticalModifier = verticalModifier - ((125 * .02) * deltaTime);
    if (config.playerY > 850 && verticalModifier > -1) verticalModifier = verticalModifier + ((125 * .02) * deltaTime);
    // Move Sled Up & Down
    if (verticalModifier > 0 && config.playerY > 50) {config.playerY = config.playerY - ((150 * verticalModifier) * deltaTime); config.totalVerticalMovement += Math.abs((150 * verticalModifier) * deltaTime);}
    if (verticalModifier < 0 && config.playerY < 850) {config.playerY = config.playerY - ((150 * verticalModifier) * deltaTime); config.totalVerticalMovement += Math.abs((150 * verticalModifier) * deltaTime);}
    // verticalModifier Decay
    if (verticalModifier > 0) verticalModifier = verticalModifier - ((125 * .008) * deltaTime);
    if (verticalModifier < 0) verticalModifier = verticalModifier + ((125 * .008) * deltaTime);

    // RockHit Modifiers
    if (rockHitXModifier > 0 && config.playerX > 44 || rockHitXModifier < 0 && config.playerX < 655) {config.playerX = config.playerX + ((150 * rockHitXModifier * rockHitModifier) * deltaTime); config.totalHorizontalMovement += Math.abs((150 * rockHitXModifier * rockHitModifier) * deltaTime);}
    if (rockHitYModifier > 0 && config.playerY > 50 || rockHitYModifier < 0 && config.playerY < 850) {config.playerY = config.playerY + ((150 * rockHitYModifier * rockHitModifier) * deltaTime); config.totalVerticalMovement += Math.abs((150 * rockHitYModifier * rockHitModifier) * deltaTime);}
    // RockHit Modifier Decay
    if (rockHitModifier > 0) rockHitModifier = rockHitModifier - ((125 * .008) * deltaTime);

    // Draw Sled
    context.save();
    context.translate(config.playerX, config.playerY);
    context.rotate(config.playerRotate)
    if (config.usedSled === "Images/subwaySurfersSled.webm"){
        context.beginPath();
        context.arc(0, 0, config.playerWidth/2, 0, Math.PI*2)
        context.clip();
        context.drawImage(subwaySurfersSledVideo, -config.playerWidth/2, -config.playerHeight/2, config.playerWidth, config.playerHeight)
    } 
    else {context.drawImage(sledImage, -config.playerWidth/2, -config.playerHeight/2, config.playerWidth, config.playerHeight)}
    context.restore();

    let speedDisplay = document.getElementById("speedDisplay");
    let speedDisplay2 = document.getElementById("gameOverspeedDisplay");
    if (!Number.isNaN(deltaTime)) config.baseSpeed -= (deltaTime);
    config.speed = config.baseSpeed - (Math.cos(config.playerRotate*1.25) * 31.25);
    speedDisplay.textContent = `Speed: ${Math.abs(((config.baseSpeed/200)*100)/100).toFixed(2)} m/s`;
    speedDisplay2.textContent = `Speed: ${Math.abs(((config.baseSpeed/200)*100)/100).toFixed(2)} m/s`;

    // Draw Hitboxes
    if (config.showHitboxes === true){
        context.beginPath();
        context.arc(config.playerX, config.playerY, config.playerWidth/2, 0, Math.PI * 2)
        context.strokeStyle = "lime";
        context.lineWidth = 2;
        context.stroke();
    }

    // console.log("Speed: " + config.baseSpeed);
    // console.log("X: " + Math.round(config.playerX, 5) + " Y: " + Math.round(config.playerY) + " Rotate: " + (Math.round(config.playerRotate * 100)/100) + " Vertical Modifier: " + (Math.round(config.verticalModifier * 10000)/10000));
    // console.log(config.iFrames);
}

function rockHit(angle){

    rockHitModifier = 2;
    rockHitXModifier = Math.cos(angle);
    rockHitYModifier = Math.sin(angle);
    verticalModifier = 0;

}


let W = document.getElementById("W");
let S = document.getElementById("S");
let A = document.getElementById("A");
let D = document.getElementById("D");
document.addEventListener("DOMContentLoaded", function() {

    window.addEventListener("keydown", function(event){
    if (event.key.toLowerCase() === "a" || event.key === "ArrowLeft"){ keys.left = true; A.classList.add("pressed");}
    if (event.key.toLowerCase() === "d" || event.key === "ArrowRight") {keys.right = true; D.classList.add("pressed");}
    if (event.key.toLowerCase() === "w" || event.key === "ArrowUp") {keys.up = true; W.classList.add("pressed");}
    if (event.key.toLowerCase() === "s" || event.key === "ArrowDown") {keys.down = true; S.classList.add("pressed");}

    if (event.key.toLowerCase() === "h") { keys.h = true;
        if (config.showHitboxes === false && keys.shift === true) config.showHitboxes = true;
        else if (keys.shift === true) config.showHitboxes = false;
    }

    if (event.key === "Shift") { keys.shift = true;
        if (config.showHitboxes === false && keys.h === true) config.showHitboxes = true;
        else if (keys.h === true) config.showHitboxes = false;
    }

    })
    window.addEventListener("keyup", function(event){
    if (event.key.toLowerCase() === "a" || event.key === "ArrowLeft") {keys.left = false; A.classList.remove("pressed");}
    if (event.key.toLowerCase() === "d" || event.key === "ArrowRight") {keys.right = false; D.classList.remove("pressed");}
    if (event.key.toLowerCase() === "w" || event.key === "ArrowUp") {keys.up = false; W.classList.remove("pressed");}
    if (event.key.toLowerCase() === "s" || event.key === "ArrowDown") {keys.down = false; S.classList.remove("pressed");}
    if (event.key.toLowerCase() === "u") { config.timesUPressed += 1; saveData(); }
    if (event.key.toLowerCase() === "h") { keys.h = false; }
    if (event.key === "Shift") { keys.shift = false; }
    })

    W.addEventListener("touchstart", function() {keys.up = true; W.classList.add("pressed");})
    S.addEventListener("touchstart", function() {keys.down = true; S.classList.add("pressed");})
    A.addEventListener("touchstart", function() {keys.left = true; A.classList.add("pressed");})
    D.addEventListener("touchstart", function() {keys.right = true; D.classList.add("pressed");})

    W.addEventListener("touchend", function() {keys.up = false; W.classList.remove("pressed");})
    S.addEventListener("touchend", function() {keys.down = false; S.classList.remove("pressed");})
    A.addEventListener("touchend", function() {keys.left = false; A.classList.remove("pressed");})
    D.addEventListener("touchend", function() {keys.right = false; D.classList.remove("pressed");})

    W.addEventListener("mousedown", function() {keys.up = true; W.classList.add("pressed");})
    S.addEventListener("mousedown", function() {keys.down = true; S.classList.add("pressed");})
    A.addEventListener("mousedown", function() {keys.left = true; A.classList.add("pressed");})
    D.addEventListener("mousedown", function() {keys.right = true; D.classList.add("pressed");})

    W.addEventListener("mouseup", function() {keys.up = false; W.classList.remove("pressed");})
    S.addEventListener("mouseup", function() {keys.down = false; S.classList.remove("pressed");})
    A.addEventListener("mouseup", function() {keys.left = false; A.classList.remove("pressed");})
    D.addEventListener("mouseup", function() {keys.right = false; D.classList.remove("pressed");})

})