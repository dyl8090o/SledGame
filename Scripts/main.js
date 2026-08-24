import { config } from "./config.js";
import { setUpPlayer, movePlayer, rockHit } from "./PlayerHandler.js";
import { moveObstacles } from "./ObstacleHandler.js";
import { heartUpdate } from "./UIHandler.js";
import { moveTrails } from "./trailHandler.js";
export { gameStateChange, distanceChange, coinsChange, obstacleHit }

let mainMenuDiv = document.getElementById("mainMenuDiv");
let gameDiv = document.getElementById("gameDiv");
let gameOverDiv = document.getElementById("gameOverDiv");
let shopDiv = document.getElementById("shopDiv");
let feedbackDiv = document.getElementById("feedbackDiv");

let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d")

let lastGameTimestamp = 0;
let lastMenuTimestamp = 0;

let distanceDisplay = document.getElementById("distanceDisplay");
let distanceDisplay2 = document.getElementById("gameOverdistanceDisplay");
let coinsDisplay = document.getElementById("coinsDisplay");
let coinsDisplay2 = document.getElementById("shopCoinsDisplay");
let timeDisplay = document.getElementById("gameOverTimeDisplay");



resizeScreen();
function resizeScreen() {
    const isMobile = (window.matchMedia("(pointer: coarse) and (hover: none)").matches && window.innerHeight > window.innerWidth);
    let scaleDiv = document.getElementById("scaleDiv");
    let scaleX = window.innerWidth / config.designWidth;
    let scaleY = window.innerHeight / config.designHeight;
    if (isMobile){
        scaleX = window.innerHeight / config.designWidth;
        scaleY = window.innerWidth / config.designHeight;
    }

    let scale = Math.min(scaleX, scaleY);
    console.log(`Mobile: ${isMobile} | Width: ${window.innerWidth} | Height: ${window.innerHeight} | scaleX: ${scaleX} | scaleY ${scaleY}`)

    if (isMobile){
        scaleDiv.style.transformOrigin = "center center";
        scaleDiv.style.transform = `translate(-50%, -50%) rotate(90deg) scale(${scale})`;
    } else{
        scaleDiv.style.transformOrigin = "top left";
        scaleDiv.style.transform = `scale(${scale})`;
    }

    if (isMobile){
        scaleDiv.style.left = "50%";
        scaleDiv.style.top = "50%";        
    } else{
        scaleDiv.style.left = `${(window.innerWidth - (config.designWidth * scale)) / 2}px`;
        scaleDiv.style.top = `${(window.innerHeight - (config.designHeight * scale)) / 2}px`;        
    }

}

function gameStateChange(newState){
    mainMenuDiv.style.display = "none";
    gameDiv.style.display = "none";
    gameOverDiv.style.display = "none";
    shopDiv.style.display = "none";
    feedbackDiv.style.display = "none";
    canvas.style.display = "none";

    let oldState = config.gameState;
    config.gameState = newState;
    if (newState === "mainMenu"){

        lastMenuTimestamp = 0;
        config.playerX = -1000000000;
        config.speed = -250;
        mainMenuDiv.style.display = "block";
        canvas.style.display = "block";
        requestAnimationFrame(menuAnimationFrame);

    } else if (newState === "shop"){

        shopDiv.style.display = "block";

    } else if (newState === "game"){

        lastGameTimestamp = 0;
        gameDiv.style.display = "block";
        canvas.style.display = "block";
        config.baseSpeed = -200;
        distanceChange(null, 0);
        setUpPlayer();
        heartUpdate(null, 2)
        gameAnimationFrame();
        config.startTime = Date.now()/1000;
        config.endTime = null
        
    } else if (newState === "gameOver"){
        gameOverDiv.style.display = "block";
    } else if (newState === "feedback"){
        feedbackDiv.style.display = "block";
    }
    
    console.log("Old game state: " + oldState + " | New game state: " + newState);
}

function gameAnimationFrame(timestamp){
    let deltaTime = (timestamp - lastGameTimestamp) / 1000;
    lastGameTimestamp = timestamp

    if(config.gameState === "game"){
        context.clearRect(0, 0, canvas.width, canvas.height);
        if(config.usedTrail != "none") moveTrails(deltaTime);
        if(deltaTime > 0) distanceChange((config.speed/-200)*deltaTime, null);
        movePlayer(deltaTime);
        moveObstacles(deltaTime);
        timeDisplay.textContent = `Time: ${Math.floor(config.endTime-config.startTime)} s`
        requestAnimationFrame(gameAnimationFrame);
    }else {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function menuAnimationFrame(timestamp){

    // console.log(`Base Speed: ${config.baseSpeed} | Speed: ${config.speed}`)
    if (lastMenuTimestamp === 0){ lastMenuTimestamp = timestamp }

    let deltaTime = (timestamp - lastMenuTimestamp) / 1000;
    lastMenuTimestamp = timestamp

    if(config.gameState === "mainMenu"){
        context.clearRect(0, 0, canvas.width, canvas.height);
        moveObstacles(deltaTime);
        requestAnimationFrame(menuAnimationFrame);
    }else {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function distanceChange(changeBy, newdistance){
    let olddistance = config.distance;
    if (newdistance != null){
        config.distance = newdistance
    } else {
        config.distance = config.distance + changeBy;
    }
    distanceDisplay.textContent = (`Distance: ${Math.round(config.distance*1)/1} m`);
    distanceDisplay2.textContent = (`Distance: ${Math.round(config.distance*1)/1} m`);
    // console.log("Old distance: " + olddistance + " | New distance: " + config.distance);
}

function coinsChange(changeBy, newCoins){
    let oldCoins = config.coins;
    if (newCoins != null){
        config.coins = newCoins
    } else {
        config.coins = config.coins + changeBy;
    }
    coinsDisplay.textContent = ("Coins: " + config.coins);
    coinsDisplay2.textContent = ("Coins: " + config.coins);
    // console.log("Old coins: " + oldCoins + " | New coins: " + config.coins);
}
coinsChange(null, 0)

function obstacleHit(type, angle) {
    
    if (type === "rock" || type === "cone" || type === "sled"){
        rockHit(angle);
        if (config.iFrames <= 0){
            heartUpdate(null, -1);
            config.iFrames = 1;
        }
    } else if (type === "collectible"){

    } else if (type === "powerUp"){

    }

}

document.addEventListener("DOMContentLoaded", function() {

    window.addEventListener("resize", function(){resizeScreen();})
    window.addEventListener("orientationchange", function(){setTimeout(resizeScreen, 100);})

    gameStateChange("mainMenu")

})