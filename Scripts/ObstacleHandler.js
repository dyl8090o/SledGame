import { config } from "./config.js";
import { obstacleHit } from "./main.js"
export { moveObstacles }

let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d")

const rockImage = new Image();
rockImage.src = "Images/Rock.png";

let obstacles = []

setInterval (() => {
    if (config.gameState === "game"){
        spawnObstacle();
    }
}, (Math.floor(Math.random()) * (config.obstacleMaxSpawn - config.obstacleMinSpawn + 1)) + config.obstacleMinSpawn);

function spawnObstacle(){
    obstacles.push({ x: Math.floor(Math.random() * (655 - 44 + 1) + 44), y: -100, type: "rock"});
}

function moveObstacles(deltaTime){

    for(let i = 0; i < obstacles.length; i++){
        obstacles[i].y = obstacles[i].y - (config.speed * deltaTime);
        context.drawImage(rockImage, obstacles[i].x, obstacles[i].y, config.rockWidth, config.rockHeight);

        if(Math.sqrt((obstacles[i].x + config.rockWidth/2 - config.playerX)**2 + (obstacles[i].y + config.rockHeight/2 - config.playerY)**2) < config.rockWidth/2 + config.playerWidth/2){
            console.log("Hit a rock!")
            let angle = Math.atan2((config.playerY - obstacles[i].y), (config.playerX - obstacles[i].x));
            obstacleHit(obstacles[i].type, angle)
        }
        // console.log(obstacles[i].y)
    }
    obstacles = obstacles.filter(function(obstacle){return obstacle.y < canvas.height});
}