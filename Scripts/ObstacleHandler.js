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
    if (config.gameState === "game" || config.gameState === "mainMenu"){
        spawnObstacle();
    }
}, (Math.floor(Math.random()) * ((config.obstacleMaxSpawn+config.baseSpeed+200) - (config.obstacleMinSpawn+config.baseSpeed+200) + 1)) + (config.obstacleMinSpawn+config.baseSpeed+200));

function spawnObstacle(){
    let randomNumber = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    console.log("Random Obstacle: " + randomNumber);

    let sledImage = new Image();
            let randomSled = Math.floor(Math.random(1 - 1 + 1) + 1);
            if(randomSled === 1){
                sledImage.src = "Images/redObstacleSled.png";
            }

    if (1 <= randomNumber && randomNumber <= 69) obstacles.push({ x: Math.floor(Math.random() * (655 - 44 + 1) + 44), y: -100, clear: false, type: "rock"});
    if (79 <= randomNumber && randomNumber <= 84) obstacles.push({ x: Math.floor(Math.random() * (655 - 44 + 1) + 44), y: -100, clear: false, type: "coin" });
    if (85 <= randomNumber && randomNumber <= 100) obstacles.push({ x: Math.floor(Math.random() * (655 - 44 + 1) + 44), y: -100, rotateSpeed: Math.floor(Math.random() * (120 - 45 + 1) + 45), angle: Math.floor(Math.random() * (360 - 0 + 1) + 0), clear: false, type: "cone" });
    if (70 <= randomNumber && randomNumber <= 78) obstacles.push({ x: Math.floor(Math.random() * (655 - 44 + 1) + 44), y: -100, angle: Math.floor(Math.random() * (60 - (-60) + 1) + (-60)), targetAngle: Math.floor(Math.random() * (60 - (-60) + 1) + (-60)), sled: sledImage, clear: false, type: "sled" });

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
        if(obstacles[i].type === "sled"){
            let sledImage = obstacles[i].sled;

            context.save();
            context.translate(obstacles[i].x, obstacles[i].y);
            context.rotate(obstacles[i].angle * (Math.PI / 180));
            context.drawImage(sledImage, -config.playerWidth/2, -config.playerHeight/2, config.playerWidth, config.playerHeight)
            context.restore();

            if(Math.abs(obstacles[i].angle - obstacles[i].targetAngle) <= 2){
            obstacles[i].targetAngle = Math.floor(Math.random() * (60 - (-60) + 1) + (-60));
            } else {
                if(obstacles[i].angle > obstacles[i].targetAngle) obstacles[i].angle -= (35 * deltaTime);
                else if(obstacles[i].angle < obstacles[i].targetAngle) obstacles[i].angle += (35 * deltaTime); 
            }

            if (obstacles[i].x > -44 && obstacles[i].angle < 0 || obstacles[i].x < 745 && obstacles[i].angle > 0){
            obstacles[i].x += ((150 * Math.sin(obstacles[i].angle * (Math.PI/180))*1.25) * deltaTime)
    }
            
            // console.log(`Target Angle: ${obstacles[i].targetAngle} | Angle ${obstacles[i].angle}`);
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

        if(obstacles[i].type === "sled" && checkCollision(obstacles[i]) != false){
            console.log("Hit a sled!")
            let angle = Math.atan2((config.playerY - obstacles[i].y), (config.playerX - obstacles[i].x));
            obstacleHit(obstacles[i].type, angle)
        }

    }
    obstacles = obstacles.filter(function(obstacle){return obstacle.y < canvas.height + 200});
    obstacles = obstacles.filter(function(obstacle){return obstacle.clear === false});
}

function checkCollision(obstacle){
        let conedx = config.playerX - (obstacle.x+10);
        let conedy = config.playerY - (obstacle.y+2);
        let conelocalX = conedx * Math.cos(-obstacle.angle*(Math.PI/180)) - conedy * Math.sin(-obstacle.angle*(Math.PI/180));
        let conelocalY = conedx * Math.sin(-obstacle.angle*(Math.PI/180)) + conedy * Math.cos(-obstacle.angle*(Math.PI/180));
        let coneclosestX = Math.max(0, Math.min(conelocalX, config.coneWidth));
        let coneclosestY = Math.max(-config.coneHeight/2, Math.min(conelocalY, config.coneHeight/2));
        let conelocalAngle = Math.atan2(conelocalY - coneclosestY, conelocalX - coneclosestX);
        let coneworldAngle = conelocalAngle + (obstacle.angle * (Math.PI / 180));

        let sledrectLeft = obstacle.x - config.playerWidth/2;
        let sledrectRight = obstacle.x + config.playerWidth/2;
        let sledrectTop = obstacle.y - config.playerHeight/2;
        let sledrectBottom = obstacle.y + config.playerHeight/2;
        let sledclosestX = Math.max(sledrectLeft, Math.min(config.playerX, sledrectRight))
        let sledclosestY = Math.max(sledrectTop, Math.min(config.playerY, sledrectBottom))


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
        } else if (config.showHitboxes === true && obstacle.type === "sled"){
            context.strokeStyle = "red";
            context.lineWidth = 2;
            context.strokeRect(sledrectLeft, sledrectTop, sledrectRight-sledrectLeft, sledrectBottom-sledrectTop);
        }

    if (obstacle.type === "rock" && Math.sqrt((obstacle.x + config.rockWidth/2 - config.playerX)**2 + (obstacle.y + config.rockHeight/2 - config.playerY)**2) < config.rockWidth/2 + config.playerWidth/2){
        return true;
    } else if (obstacle.type === "coin" && Math.sqrt((obstacle.x + config.coinWidth/2 - config.playerX)**2 + (obstacle.y + config.coinHeight/2 - config.playerY)**2) < config.coinWidth/2 + config.playerWidth/2){
        return true;
    } else if (obstacle.type === "cone" && Math.sqrt((conelocalX - coneclosestX)**2 + (conelocalY - coneclosestY)**2) < config.playerWidth/2) {
        return coneworldAngle;
    } else if (obstacle.type === "sled" && Math.sqrt((sledclosestX - config.playerX)**2 + (sledclosestY - config.playerY)**2) < config.playerWidth/2) {
        return true;
    }  else {
        return false;
    }

}