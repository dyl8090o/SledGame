import { config } from "./config.js";
import { obstacleHit, coinsChange } from "./main.js"
export { moveObstacles }

let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d")

const rockImage = new Image();
rockImage.src = "Images/Rock.png";
const coinImage = new Image();
coinImage.src = "Images/Coin.png";

let obstacles = []

setInterval (() => {
    if (config.gameState === "game"){
        spawnObstacle();
    }
}, (Math.floor(Math.random()) * ((config.obstacleMaxSpawn+config.baseSpeed+200) - (config.obstacleMinSpawn+config.baseSpeed+200) + 1)) + (config.obstacleMinSpawn+config.baseSpeed+200));

function spawnObstacle(){
    let randomNumber = Math.floor(Math.random() * (16 - 1 + 1)) + 1;
    console.log("Random Obstacle: " + randomNumber);

    if (1 <= randomNumber && randomNumber <= 14) obstacles.push({ x: Math.floor(Math.random() * (655 - 44 + 1) + 44), y: -100, clear: false, type: "rock"});
    if (15 <= randomNumber && randomNumber <= 16) obstacles.push({ x: Math.floor(Math.random() * (655 - 44 + 1) + 44), y: -100, clear: false, type: "coin" });

    let randomNumber2 = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    if (randomNumber2 === 1)[
        setTimeout(() =>{
            spawnObstacle();
        }, (Math.floor(Math.random()) * ((750+config.baseSpeed+200) - (250+config.baseSpeed+200) + 1)) + (250+config.baseSpeed+200)
    )]
}

function moveObstacles(deltaTime){

    for(let i = 0; i < obstacles.length; i++){
        obstacles[i].y = obstacles[i].y - (config.speed * deltaTime);
        if(obstacles[i].type === "rock") context.drawImage(rockImage, obstacles[i].x, obstacles[i].y, config.rockWidth, config.rockHeight);
        if(obstacles[i].type === "coin") context.drawImage(coinImage, obstacles[i].x, obstacles[i].y, config.coinWidth, config.coinHeight);

        if(obstacles[i].type === "rock" && Math.sqrt((obstacles[i].x + config.rockWidth/2 - config.playerX)**2 + (obstacles[i].y + config.rockHeight/2 - config.playerY)**2) < config.rockWidth/2 + config.playerWidth/2){
            console.log("Hit a rock!")
            let angle = Math.atan2((config.playerY - obstacles[i].y), (config.playerX - obstacles[i].x));
            obstacleHit(obstacles[i].type, angle)
        }
        // console.log(obstacles[i].y + " | " + config.speed + " | " + obstacles.length)

        if(obstacles[i].type === "coin" && Math.sqrt((obstacles[i].x + config.coinWidth/2 - config.playerX)**2 + (obstacles[i].y + config.coinHeight/2 - config.playerY)**2) < config.coinWidth/2 + config.playerWidth/2){
            console.log("Hit a coin!");
            coinsChange(1, null);
            obstacles[i].clear = true;
        }
    }
    obstacles = obstacles.filter(function(obstacle){return obstacle.y < canvas.height});
    obstacles = obstacles.filter(function(obstacle){return obstacle.clear === false});
}