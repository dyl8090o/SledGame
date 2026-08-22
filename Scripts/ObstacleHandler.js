import { config } from "./config.js";
import { obstacleHit, coinsChange } from "./main.js"
export { moveObstacles }

let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d")

const rockImage = new Image();
rockImage.src = "Images/Rock.png";
const coinImage = new Image();
coinImage.src = "Images/Coin.png";
const coneStickImage = new Image();
coneStickImage.src = "Images/windConeStick.png";
const coneImage = new Image();
coneImage.src = "Images/windCone.png";

let obstacles = []

setInterval (() => {
    if (config.gameState === "game"){
        spawnObstacle();
    }
}, (Math.floor(Math.random()) * ((config.obstacleMaxSpawn+config.baseSpeed+200) - (config.obstacleMinSpawn+config.baseSpeed+200) + 1)) + (config.obstacleMinSpawn+config.baseSpeed+200));

function spawnObstacle(){
    let randomNumber = Math.floor(Math.random() * (16 - 1 + 1)) + 1;
    console.log("Random Obstacle: " + randomNumber);

    if (1 <= randomNumber && randomNumber <= 12) obstacles.push({ x: Math.floor(Math.random() * (655 - 44 + 1) + 44), y: -100, clear: false, type: "rock"});
    if (16 <= randomNumber && randomNumber <= 16) obstacles.push({ x: Math.floor(Math.random() * (655 - 44 + 1) + 44), y: -100, clear: false, type: "coin" });
    if (13 <= randomNumber && randomNumber <= 15) obstacles.push({ x: Math.floor(Math.random() * (655 - 44 + 1) + 44), y: -100, rotateSpeed: Math.floor(Math.random() * (120 - 45 + 1) + 45), angle: Math.floor(Math.random() * (360 - 0 + 1) + 0), clear: false, type: "cone" });

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
        if(obstacles[i].type === "cone"){ context.drawImage(coneStickImage, obstacles[i].x, obstacles[i].y, config.coneStickWidth, config.coneStickHeight);
            context.save();
            context.translate(obstacles[i].x+10, obstacles[i].y+2);
            context.rotate(obstacles[i].angle * (Math.PI / 180));
            context.drawImage(coneImage, 0, -config.coneHeight/2, config.coneWidth, config.coneHeight)
            context.restore();
            obstacles[i].angle = obstacles[i].angle + (obstacles[i].rotateSpeed * deltaTime)
            // console.log("Angle: " + obstacles[i].angle);
        }

        if(obstacles[i].type === "rock" && checkCollision(obstacles[i])){
            console.log("Hit a rock!")
            let angle = Math.atan2((config.playerY - obstacles[i].y), (config.playerX - obstacles[i].x));
            obstacleHit(obstacles[i].type, angle)
        }
        // console.log(obstacles[i].y + " | " + config.speed + " | " + obstacles.length)

        if(obstacles[i].type === "coin" && checkCollision(obstacles[i])){
            console.log("Hit a coin!");
            coinsChange(1, null);
            obstacles[i].clear = true;
        }

        if(obstacles[i].type === "cone" && checkCollision(obstacles[i]) != false){
            console.log("Hit a cone!")
            obstacleHit(obstacles[i].type, checkCollision(obstacles[i]))
        }

    }
    obstacles = obstacles.filter(function(obstacle){return obstacle.y < canvas.height + 200});
    obstacles = obstacles.filter(function(obstacle){return obstacle.clear === false});
}

function checkCollision(obstacle){
    let dx = config.playerX - (obstacle.x+10);
    let dy = config.playerY - (obstacle.y+2);
    let localX = dx * Math.cos(-obstacle.angle*(Math.PI/180)) - dy * Math.sin(-obstacle.angle*(Math.PI/180));
    let localY = dx * Math.sin(-obstacle.angle*(Math.PI/180)) + dy * Math.cos(-obstacle.angle*(Math.PI/180));
    let closestX = Math.max(0, Math.min(localX, config.coneWidth));
    let closestY = Math.max(-config.coneHeight/2, Math.min(localY, config.coneHeight/2));
    let localAngle = Math.atan2(localY - closestY, localX - closestX);
    let worldAngle = localAngle + (obstacle.angle * (Math.PI / 180));

    // Draw Hitboxes
        if (config.showHitboxes === true && obstacle.type === "rock"){
           context.beginPath();
            context.arc(obstacle.x + config.rockWidth/2, obstacle.y + config.rockHeight/2, config.rockWidth/2, 0, Math.PI * 2)
            context.strokeStyle = "red";
            context.lineWidth = 2;
            context.stroke();
        } else if (config.showHitboxes === true && obstacle.type === "coin"){
           context.beginPath();
            context.arc(obstacle.x + config.coinWidth/2, obstacle.y + config.coinHeight/2, config.coinWidth/2, 0, Math.PI * 2)
            context.strokeStyle = "lime";
            context.lineWidth = 2;
            context.stroke();
        } else if (config.showHitboxes === true && obstacle.type === "cone"){
            context.save();
            context.translate(obstacle.x+10, obstacle.y+2);
            context.rotate(obstacle.angle * (Math.PI / 180));
            context.strokeStyle = "red";
            context.lineWidth = 2;
            context.strokeRect(0, -config.coneHeight/2, config.coneWidth, config.coneHeight);
            context.restore();
        }

    if (obstacle.type === "rock" && Math.sqrt((obstacle.x + config.rockWidth/2 - config.playerX)**2 + (obstacle.y + config.rockHeight/2 - config.playerY)**2) < config.rockWidth/2 + config.playerWidth/2){
        return true;
    } else if (obstacle.type === "coin" && Math.sqrt((obstacle.x + config.coinWidth/2 - config.playerX)**2 + (obstacle.y + config.coinHeight/2 - config.playerY)**2) < config.coinWidth/2 + config.playerWidth/2){
        return true;
    } else if (obstacle.type === "cone" && Math.sqrt((localX - closestX)**2 + (localY - closestY)**2) < config.playerWidth/2) {
        return worldAngle;
    } else {
        return false;
    }

}