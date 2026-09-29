import { config } from "./config.js";
import { obstacleHit, coinsChange, updateQuests } from "./main.js"
import { updateNodes } from "./UpgradeHandler.js";
export { moveObstacles }

let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d")

const animatedImages = [
    {element: document.createElement("video"), name: "rock"},
    {element: document.createElement("video"), name: "campFire"},
    {element: document.createElement("video"), name: "windCone"},
    {element: document.createElement("video"), name: "snowMan"},
    {element: document.createElement("video"), name: "darkRock"},
    {element: document.createElement("video"), name: "iceRock"},
    {element: document.createElement("video"), name: "redObstacleSled"},
    {element: document.createElement("video"), name: "evilDuck"},
    {element: document.createElement("video"), name: "evilPenguin"},
    {element: document.createElement("video"), name: "smileyRock"},
]

const rock = animatedImages[0].element;
const campfire = animatedImages[1].element;
const windCone = animatedImages[2].element;
const snowMan = animatedImages[3].element;
const darkRock = animatedImages[4].element;
const iceRock = animatedImages[5].element;
const redObstacleSled = animatedImages[6].element;
const evilDuck = animatedImages[7].element;
const evilPenguin = animatedImages[8].element;
const smileyRock = animatedImages[9].element;

animatedImages.forEach(image => {
    let video = image.element
    video.src = `Images/${image.name}.webm`;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.preload = "auto";
    video.play()
})

let rockImages = [
    rock,
    rock,
    rock,
    rock,
    rock,
    darkRock,
    darkRock,
    darkRock,
    iceRock,
    iceRock,
    snowMan,
    snowMan,
    campfire,
    smileyRock,
]

const coinImage = document.createElement("video");
coinImage.src = "Images/coin.webm";
coinImage.loop = true;
coinImage.muted = true;
coinImage.playsInline = true;
coinImage.autoplay = true;
coinImage.preload = "auto";
coinImage.play()


const coneStickImage = new Image();
coneStickImage.src = "Images/windConeStick.png";
const sledDot = new Image();
sledDot.src = "Images/redCircle.png";

let sledImages = [
    redObstacleSled,
    evilDuck,
    evilPenguin
]

let obstacles = []
let obstacleTimeout;

scheduleNextSpawn();
function scheduleNextSpawn() {
    let delay = .75;
    if (config.speed < 0){
        delay = Math.floor(Math.random() * (config.obstacleMaxSpawn - config.obstacleMinSpawn + 1) + config.obstacleMinSpawn) / (config.speed / -200);
    } else {
        delay = 0.75;
    }
    
    obstacleTimeout = setTimeout(() => {
        if (config.gameState === "game" || config.gameState === "mainMenu") {
            spawnObstacle();
        }
        scheduleNextSpawn();
    }, delay);
}

function spawnObstacle(){
    config.obstacleMode = "normal"
    if (config.quest1.id === 104 && config.quest1.active === true || config.quest2.id === 104 && config.quest2.active === true) { config.obstacleMode = "rocksOnly" }
    if (config.quest1.id === 105 && config.quest1.active === true || config.quest2.id === 105 && config.quest2.active === true) { config.obstacleMode = "windConesOnly" }
    if (config.quest1.id === 106 && config.quest1.active === true || config.quest2.id === 106 && config.quest2.active === true) { config.obstacleMode = "sledsOnly" }

    let randomNumber = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    // console.log("Random Obstacle: " + randomNumber);

    let rockImage;
    let randomRock = rockImages[Math.floor(Math.random() * rockImages.length)];
    if (typeof randomRock === "string") { rockImage = new Image(); rockImage.src = randomRock }
    else { rockImage = randomRock; }
    let sledImage;
    let randomSled = sledImages[Math.floor(Math.random() * sledImages.length)];
    if (typeof randomSled === "string") { sledImage = new Image(); sledImage.src = randomSled }
    else { sledImage = randomSled; }

    if (config.obstacleMode === "normal"){
    if (randomNumber <= config.rockChance) obstacles.push({ x: Math.floor(Math.random() * (655 - 24 + 1) + 24), y: -100, angle: 0, rock: rockImage, clear: false, type: "rock"});
    else if (randomNumber <= config.rockChance + config.coinChance) obstacles.push({ x: Math.floor(Math.random() * (655 - 24 + 1) + 24), y: -100, angle: 0, clear: false, type: "coin" });
    else if (randomNumber <= config.rockChance + config.coinChance + config.coneChance) obstacles.push({ x: Math.floor(Math.random() * (655 - 24 + 1) + 24), y: -100, rotateSpeed: Math.floor(Math.random() * (120 - 45 + 1) + 45), angle: Math.floor(Math.random() * (360 - 0 + 1) + 0), clear: false, type: "cone" });
    else if (randomNumber <= config.rockChance + config.coinChance + config.coneChance + config.sledChance) obstacles.push({ x: Math.floor(Math.random() * (655 - 24 + 1) + 24), y: -100, angle: Math.floor(Math.random() * (60 - (-60) + 1) + (-60)), targetAngle: Math.floor(Math.random() * (60 - (-60) + 1) + (-60)), sled: sledImage, clear: false, type: "sled" });
    } else if (config.obstacleMode === "rocksOnly" ){ obstacles.push({ x: Math.floor(Math.random() * (655 - 24 + 1) + 24), y: -100, angle: 0, rock: rockImage, clear: false, type: "rock"});
    } else if (config.obstacleMode === "windConesOnly" ) { obstacles.push({ x: Math.floor(Math.random() * (655 - 24 + 1) + 24), y: -100, rotateSpeed: Math.floor(Math.random() * (120 - 45 + 1) + 45), angle: Math.floor(Math.random() * (360 - 0 + 1) + 0), clear: false, type: "cone" }); 
    } else if (config.obstacleMode === "sledsOnly"){ obstacles.push({ x: Math.floor(Math.random() * (655 - 24 + 1) + 24), y: -100, angle: Math.floor(Math.random() * (60 - (-60) + 1) + (-60)), targetAngle: Math.floor(Math.random() * (60 - (-60) + 1) + (-60)), sled: sledImage, clear: false, type: "sled" }); }

    let randomNumber2 = Math.floor(Math.random() * (200 - 1 + 1)) + 1;
    if (1 <= randomNumber2 && randomNumber2 <= 16){
        setTimeout(() =>{
            spawnObstacle();
        }, (Math.floor(Math.random() * ((750) - (250) + 1) + (250))/(config.speed/-200))
    )}
    if (20 <= randomNumber2 && randomNumber2 <= 22){
        setTimeout(() =>{
            spawnObstacle();
        }, (Math.floor(Math.random() * ((500) - (100) + 1) + (100))/(config.speed/-200))
    )}
    if (22 <= randomNumber2 && randomNumber2 <= 24){
            spawnObstacle();
    }
}

function moveObstacles(deltaTime){

    for(let i = 0; i < obstacles.length; i++){
        obstacles[i].y = obstacles[i].y - (config.speed * deltaTime);


        if(obstacles[i].type === "rock") context.drawImage(obstacles[i].rock, obstacles[i].x, obstacles[i].y, config.rockWidth, config.rockHeight);
        if(obstacles[i].type === "coin") context.drawImage(coinImage, obstacles[i].x, obstacles[i].y, config.coinWidth, config.coinHeight);
        if(obstacles[i].type === "cone"){ context.drawImage(coneStickImage, obstacles[i].x, obstacles[i].y, config.coneStickWidth, config.coneStickHeight);
            context.save();
            context.translate(obstacles[i].x+5, obstacles[i].y+6);
            context.rotate(obstacles[i].angle * (Math.PI / 180));
            context.drawImage(windCone, 0, -config.coneHeight/2, config.coneWidth, config.coneHeight)
            context.restore();
            obstacles[i].angle = obstacles[i].angle + (obstacles[i].rotateSpeed * deltaTime)
            if(obstacles[i].angle > 360) obstacles[i].angle = 0;
            // console.log("Angle: " + obstacles[i].angle);
        }
        if(obstacles[i].type === "sled"){
            let sledImage = obstacles[i].sled;

            context.save();
            context.translate(obstacles[i].x, obstacles[i].y);
            context.rotate(obstacles[i].angle * (Math.PI / 180));
            context.drawImage(sledImage, -config.obstacleSledWidth/2, -config.obstacleSledHeight/2, config.obstacleSledWidth, config.obstacleSledHeight)
            context.restore();

            if(Math.abs(obstacles[i].angle - obstacles[i].targetAngle) <= 2){
            obstacles[i].targetAngle = Math.floor(Math.random() * (60 - (-60) + 1) + (-60));
            } else {
                if(obstacles[i].angle > obstacles[i].targetAngle) obstacles[i].angle -= (35 * deltaTime);
                else if(obstacles[i].angle < obstacles[i].targetAngle) obstacles[i].angle += (35 * deltaTime); 
            }

            if (obstacles[i].x > -50 && obstacles[i].angle < 0 || obstacles[i].x < 745 && obstacles[i].angle > 0){
            obstacles[i].x += ((150 * Math.sin(obstacles[i].angle * (Math.PI/180))*1.25) * deltaTime)
            }

            if (config.mindReader === true) { 
            context.save();
            context.translate(obstacles[i].x, obstacles[i].y);
            context.rotate(obstacles[i].targetAngle * (Math.PI / 180));
            context.drawImage(sledDot, 0, -config.obstacleSledHeight/1.25, 10, 10)
            context.restore();
            }
            
            // console.log(`Target Angle: ${obstacles[i].targetAngle} | Angle ${obstacles[i].angle}`);
        }



        // Collsion Checks
        if (checkCollision(obstacles[i], "player") && config.spikeyCardboardActive > 0){ obstacles[i].clear = true; }
        if (checkCollision(obstacles[i], "snowball")){ obstacles[i].clear = true; config.snowballHits++; }
        
        else if(obstacles[i].type === "rock" && checkCollision(obstacles[i], "player")){
            console.log("Hit a rock!")
            let angle = Math.atan2((config.playerY - obstacles[i].y), (config.playerX - obstacles[i].x));
            obstacleHit(obstacles[i].type, angle)
        }
        // console.log(obstacles[i].y + " | " + config.speed + " | " + obstacles.length)

        else if(obstacles[i].type === "coin" && checkCollision(obstacles[i], "player")){
            console.log("Hit a coin!");
            let randomCoins = Math.random();
            console.log(randomCoins + " | " + config.coinDouble)
            if (randomCoins <= config.coinDouble) {
                coinsChange(2, null);
                if (config.quest1.id === 1 || config.quest1.id === 2){ updateQuests(1, 2) }
                if (config.quest2.id === 1 || config.quest2.id === 2){ updateQuests(2, 2) }
                config.coinsCollected += 2;
                config.totalCoins += 2;
            } else {
                coinsChange(1, null);
                if (config.quest1.id === 1 || config.quest1.id === 2){ updateQuests(1, 1) }
                if (config.quest2.id === 1 || config.quest2.id === 2){ updateQuests(2, 1) }
                config.coinsCollected += 1;
                config.totalCoins += 1;
            }
            
            obstacles[i].clear = true;
        }

        else if(obstacles[i].type === "cone" && checkCollision(obstacles[i], "player") != false){
            console.log("Hit a cone!")
            obstacleHit(obstacles[i].type, checkCollision(obstacles[i], "player"))
        }

        else if(obstacles[i].type === "sled" && checkCollision(obstacles[i], "player") != false){
            console.log("Hit a sled!")
            let angle = Math.atan2((config.playerY - obstacles[i].y), (config.playerX - obstacles[i].x));
            obstacleHit(obstacles[i].type, angle)
        }

        

    }
    obstacles = obstacles.filter(function(obstacle){return obstacle.y < canvas.height + 200});
    obstacles = obstacles.filter(function(obstacle){return obstacle.clear === false});
}

function checkCollision(obstacle, object){
        let conedx = config.playerX - (obstacle.x+10);
        let conedy = config.playerY - (obstacle.y+2);
        let conelocalX = conedx * Math.cos(-obstacle.angle*(Math.PI/180)) - conedy * Math.sin(-obstacle.angle*(Math.PI/180));
        let conelocalY = conedx * Math.sin(-obstacle.angle*(Math.PI/180)) + conedy * Math.cos(-obstacle.angle*(Math.PI/180));
        let coneclosestX = Math.max(0, Math.min(conelocalX, config.coneWidth));
        let coneclosestY = Math.max(-config.coneHeight/2, Math.min(conelocalY, config.coneHeight/2));
        let conelocalAngle = Math.atan2(conelocalY - coneclosestY, conelocalX - coneclosestX);
        let coneworldAngle = conelocalAngle + (obstacle.angle * (Math.PI / 180));

        let sledrectLeft = obstacle.x - config.obstacleSledWidth/2;
        let sledrectRight = obstacle.x + config.obstacleSledWidth/2;
        let sledrectTop = obstacle.y - config.obstacleSledHeight/2;
        let sledrectBottom = obstacle.y + config.obstacleSledHeight/2;
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
            context.arc(obstacle.x + config.coinWidth/2, obstacle.y + config.coinHeight/2, config.coinRadius/2, 0, Math.PI * 2)
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
    if (object === "player"){
    if (obstacle.type === "rock" && Math.sqrt((obstacle.x + config.rockWidth/2 - config.playerX)**2 + (obstacle.y + config.rockHeight/2 - config.playerY)**2) < config.rockWidth/2 + config.playerWidth/2){
        return true;
    } else if (obstacle.type === "coin" && Math.sqrt((obstacle.x + config.coinWidth/2 - config.playerX)**2 + (obstacle.y + config.coinHeight/2 - config.playerY)**2) < config.coinRadius/2 + config.playerWidth/2){
        return true;
    } else if (obstacle.type === "cone" && Math.sqrt((conelocalX - coneclosestX)**2 + (conelocalY - coneclosestY)**2) < config.playerWidth/2) {
        return coneworldAngle;
    } else if (obstacle.type === "sled" && Math.sqrt((sledclosestX - config.playerX)**2 + (sledclosestY - config.playerY)**2) < config.playerWidth/2) {
        return true;
    }  else {
        return false;
    }
    } else if (object === "snowball"){
        let conedx = config.snowball.x - (obstacle.x+10);
        let conedy = config.snowball.y - (obstacle.y+2);
        let conelocalX = conedx * Math.cos(-obstacle.angle*(Math.PI/180)) - conedy * Math.sin(-obstacle.angle*(Math.PI/180));
        let conelocalY = conedx * Math.sin(-obstacle.angle*(Math.PI/180)) + conedy * Math.cos(-obstacle.angle*(Math.PI/180));
        let coneclosestX = Math.max(0, Math.min(conelocalX, config.coneWidth));
        let coneclosestY = Math.max(-config.coneHeight/2, Math.min(conelocalY, config.coneHeight/2));

        let sledrectLeft = obstacle.x - config.obstacleSledWidth/2;
        let sledrectRight = obstacle.x + config.obstacleSledWidth/2;
        let sledrectTop = obstacle.y - config.obstacleSledHeight/2;
        let sledrectBottom = obstacle.y + config.obstacleSledHeight/2;
        let sledclosestX = Math.max(sledrectLeft, Math.min(config.snowball.x, sledrectRight))
        let sledclosestY = Math.max(sledrectTop, Math.min(config.snowball.y, sledrectBottom))

        if (obstacle.type === "rock" && Math.sqrt((obstacle.x + config.rockWidth/2 - config.snowball.x)**2 + (obstacle.y + config.rockHeight/2 - config.snowball.y)**2) < config.rockWidth/2 + config.snowballWidth/2){
        return true;
    } else if (obstacle.type === "coin" && Math.sqrt((obstacle.x + config.coinWidth/2 - config.snowball.x)**2 + (obstacle.y + config.coinHeight/2 - config.snowball.y)**2) < config.coinRadius/2 + config.snowballWidth/2){
        return true;
    } else if (obstacle.type === "cone" && Math.sqrt((conelocalX - coneclosestX)**2 + (conelocalY - coneclosestY)**2) < config.snowballWidth/2) {
        return true;
    } else if (obstacle.type === "sled" && Math.sqrt((sledclosestX - config.snowball.x)**2 + (sledclosestY - config.snowball.y)**2) < config.snowballWidth/2) {
        return true;
    }  else {
        return false;
    }
    }


}