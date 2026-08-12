import { config } from "./config.js";
import { gameStateChange } from "./main.js";
export { setUpPlayer, movePlayer, rockHit }

let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d")
const keys = { left: false, right: false, up: false, down: false};
let verticalModifier = 0;
let rockHitModifier = 0;
let rockHitXModifier = 0;
let rockHitYModifier = 0;


const sledImage = new Image();
sledImage.src = "Images/Sled.png";

function setUpPlayer(){

    if (config.gameState === "game"){
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
    if (keys.left === true && config.playerRotate > (-60 * (Math.PI / 180))) config.playerRotate = config.playerRotate - ((100 * (Math.PI / 180)) * deltaTime);
    if (keys.right === true && config.playerRotate < (60 * (Math.PI / 180))) config.playerRotate = config.playerRotate + ((100 * (Math.PI / 180)) * deltaTime);

    // Move Sled Based On Rotation
    if (config.playerX > 44 && config.playerRotate < 0 || config.playerX < 655 && config.playerRotate > 0){
        config.playerX = config.playerX + ((125 * Math.sin(config.playerRotate)*1.25) * deltaTime)

        config.speed = config.baseSpeed - (Math.cos(config.playerRotate) * 0.4);
    }

    // W/S Changing verticalModifier
    if (keys.up === true && config.playerY > 50 && verticalModifier < 1) verticalModifier = verticalModifier + ((125 * .02) * deltaTime);
    if (keys.down === true && config.playerY < 850 && verticalModifier > -1) verticalModifier = verticalModifier - ((125 * .02) * deltaTime);
    // Move Sled Up & Down
    if (verticalModifier > 0 && config.playerY > 50) config.playerY = config.playerY - ((150 * verticalModifier) * deltaTime);
    if (verticalModifier < 0 && config.playerY < 850) config.playerY = config.playerY - ((150 * verticalModifier) * deltaTime);
    // verticalModifier Decay
    if (verticalModifier > 0) verticalModifier = verticalModifier - ((125 * .008) * deltaTime);
    if (verticalModifier < 0) verticalModifier = verticalModifier + ((125 * .008) * deltaTime);

    // RockHit Modifiers
    if (rockHitXModifier > 0 && config.playerX > 44 || rockHitXModifier < 0 && config.playerX < 655) config.playerX = config.playerX + ((150 * rockHitXModifier * rockHitModifier) * deltaTime);
    if (rockHitYModifier > 0 && config.playerY > 50 || rockHitYModifier < 0 && config.playerY < 850) config.playerY = config.playerY + ((150 * rockHitYModifier * rockHitModifier) * deltaTime);
    // RockHit Modifier Decay
    if (rockHitModifier > 0) rockHitModifier = rockHitModifier - ((125 * .008) * deltaTime);

    // Draw Sled
    context.save();
    context.translate(config.playerX, config.playerY);
    context.rotate(config.playerRotate)
    context.drawImage(sledImage, -config.playerWidth/2, -config.playerHeight/2, config.playerWidth, config.playerHeight)
    context.restore();

    // console.log("X: " + Math.round(config.playerX, 5) + " Y: " + Math.round(config.playerY) + " Rotate: " + (Math.round(config.playerRotate * 100)/100) + " Vertical Modifier: " + (Math.round(config.verticalModifier * 10000)/10000));
    // console.log(config.iFrames);
}

function rockHit(angle){

    config.iFrames = 1;

    rockHitModifier = 2;
    rockHitXModifier = Math.cos(angle);
    rockHitYModifier = Math.sin(angle);
    verticalModifier = 0;

}

document.addEventListener("DOMContentLoaded", function() {

    window.addEventListener("keydown", function(event){
    if (event.key.toLowerCase() === "a") keys.left = true;
    if (event.key.toLowerCase() === "d") keys.right = true;
    if (event.key.toLowerCase() === "w") keys.up = true;
    if (event.key.toLowerCase() === "s") keys.down = true;
    })
    window.addEventListener("keyup", function(event){
    if (event.key.toLowerCase() === "a") keys.left = false;
    if (event.key.toLowerCase() === "d") keys.right = false;
    if (event.key.toLowerCase() === "w") keys.up = false;
    if (event.key.toLowerCase() === "s") keys.down = false;
    })

})