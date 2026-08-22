import { config } from "./config.js";
import { setUpPlayer, movePlayer, rockHit } from "./PlayerHandler.js";
import { moveObstacles } from "./ObstacleHandler.js";
import { heartUpdate } from "./UIHandler.js";
export { gameStateChange, scoreChange, coinsChange, obstacleHit }

let mainMenuDiv = document.getElementById("mainMenuDiv");
let gameDiv = document.getElementById("gameDiv");
let gameOverDiv = document.getElementById("gameOverDiv");
let shopDiv = document.getElementById("shopDiv");
gameStateChange("mainMenu");

let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d")

let lastTimestamp = 0;

let scoreDisplay = document.getElementById("scoreDisplay");
let scoreDisplay2 = document.getElementById("gameOverScoreDisplay");
let coinsDisplay = document.getElementById("coinsDisplay");
let coinsDisplay2 = document.getElementById("shopCoinsDisplay");

resizeScreen();
function resizeScreen() {
    let scaleDiv = document.getElementById("scaleDiv");
    let scaleX = window.innerWidth / config.designWidth;
    let scaleY = window.innerHeight / config.designHeight;
    let scale = Math.min(scaleX, scaleY);
    scaleDiv.style.transform = `scale(${scale})`;
    console.log(`Width: ${window.innerWidth} | Height: ${window.innerHeight} | scaleX: ${scaleX} | scaleY ${scaleY}`)
    scaleDiv.style.left = `${(window.innerWidth - (config.designWidth * scale)) / 2}px`;
    scaleDiv.style.top = `${(window.innerHeight - (config.designHeight * scale)) / 2}px`;
}

setInterval (() => {
        if (config.gameState === "game"){
            scoreChange(1, null);
        }
    }, 1000)

function gameStateChange(newState){
    mainMenuDiv.style.display = "none";
    gameDiv.style.display = "none";
    gameOverDiv.style.display = "none";
    shopDiv.style.display = "none";

    let oldState = config.gameState;
    config.gameState = newState;
    if (newState === "mainMenu"){
        mainMenuDiv.style.display = "block";
    } else if (newState === "shop"){
        shopDiv.style.display = "block";
    } else if (newState === "game"){
        lastTimestamp = 0;
        gameDiv.style.display = "block";
        config.baseSpeed = -200;
        scoreChange(null, 0);
        setUpPlayer();
        heartUpdate(null, 2)
        gameAnimationFrame();
    } else if (newState === "gameOver"){
        gameOverDiv.style.display = "block";
    }
    
    console.log("Old game state: " + oldState + " | New game state: " + newState);
}

function gameAnimationFrame(timestamp){
    let deltaTime = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp

    if(config.gameState === "game"){
        context.clearRect(0, 0, canvas.width, canvas.height);
        movePlayer(deltaTime);
        moveObstacles(deltaTime);
        requestAnimationFrame(gameAnimationFrame);
    }else {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function scoreChange(changeBy, newScore){
    let oldScore = config.score;
    if (newScore != null){
        config.score = newScore
    } else {
        config.score = config.score + changeBy;
    }
    scoreDisplay.textContent = ("Score: " + config.score);
    scoreDisplay2.textContent = ("Score: " + config.score);
    // console.log("Old score: " + oldScore + " | New score: " + config.score);
}

function coinsChange(changeBy, newCoins){
    let oldCoins = config.score;
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
    
    if (type === "rock" || type === "cone"){
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

    window.addEventListener("resize", function(){
        resizeScreen();
    })

})