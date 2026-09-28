import { config } from "./config.js";
import { setUpPlayer, movePlayer, rockHit } from "./PlayerHandler.js";
import { moveObstacles } from "./ObstacleHandler.js";
import { heartUpdate } from "./UIHandler.js";
import { moveTrails } from "./trailHandler.js";
import { saveData, loadData } from "./accountHandler.js";
import { updateNodes } from "./upgradeHandler.js"; 
import { abilityUpdate, setUpAbilities } from "./abilityHandler.js";
import { rerollQuests } from "./QuestHandler.js";
export { gameStateChange, distanceChange, coinsChange, UPChange, obstacleHit, updateQuests }

let mainMenuDiv = document.getElementById("mainMenuDiv");
let questsDiv = document.getElementById("questsDiv");
let questButtons = document.querySelectorAll(".questButton");
let quest1 = document.getElementById("quest1");
let quest2 = document.getElementById("quest2");
let gameDiv = document.getElementById("gameDiv");
let gameOverDiv = document.getElementById("gameOverDiv");
let shopDiv = document.getElementById("shopDiv");
let feedbackDiv = document.getElementById("feedbackDiv");
let upgradesDiv = document.getElementById("upgradesDiv");
let upgradesBody = document.getElementById("upgradesBody");
let logsDiv = document.getElementById("logsDiv");
let gameDisabled = document.getElementById("gameDisabled");

let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d")

let lastGameTimestamp = 0;
let lastMenuTimestamp = 0;

let distanceDisplay = document.getElementById("distanceDisplay");
let distanceDisplay2 = document.getElementById("gameOverdistanceDisplay");
let coinsDisplay = document.getElementById("coinsDisplay");
let coinsDisplay2 = document.getElementById("shopCoinsDisplay");
let timeDisplay = document.getElementById("gameOverTimeDisplay");
let upgradesUPDisplay = document.getElementById("upgradesUPDisplay");
let pureDisplay = document.getElementById("gameOverPureDisplay");

let topHalfRed = document.getElementById("topHalfRed");
let bottomHalfRed = document.getElementById("bottomHalfRed");
let topThirdRed = document.getElementById("topThirdRed");
let bottomThirdRed = document.getElementById("bottomThirdRed");

let tipDisplay = document.getElementById("tipDisplay");

let tips = [
    "Press Shift + H to turn on hitboxes!",
    "Data is saved with an account.",
    "All feedback is read, if you want something changed, tell me!",
    "Coins have a 3% base chance of spawning.",
    "Be careful, wind cone hitboxes are rectangular, but the sprite isn't!",
    "The good art was made by TBHAndrew.",
    "You get one second of invulnerability after being hit.",
    "Struggling to get past a certain point? Make sure to buy upgrades!",
]



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

config.sessionCounted = false;
async function gameStateChange(newState){
    mainMenuDiv.style.display = "none";
    questsDiv.style.display = "none"
    quest1.style.display = "none"
    quest2.style.display = "none"
    gameDiv.style.display = "none";
    gameOverDiv.style.display = "none";
    shopDiv.style.display = "none";
    feedbackDiv.style.display = "none";
    upgradesDiv.style.display = "none";
    upgradesBody.style.display = "none";
    logsDiv.style.display = "none";
    pureDisplay.style.display = "none";

    canvas.style.display = "none";
    gameDisabled.style.display = "none";
    questButtons.forEach(button => { button.style.display = "block" })

    topHalfRed.style.display = "none"
    bottomHalfRed.style.display = "none"
    topThirdRed.style.display = "none"
    bottomThirdRed.style.display = "none"

    let oldState = config.gameState;
    config.gameState = newState;
    if (newState === "mainMenu"){

        tipDisplay.textContent = `Tip: ${tips[Math.floor(Math.random() * tips.length)]}`
        hitboxesThisRound = false;
        lastMenuTimestamp = 0;
        config.playerX = -1000000000;
        config.speed = -250;
        mainMenuDiv.style.display = "block";
        questsDiv.style.display = "flex"
        quest1.style.display = "block"
        quest2.style.display = "block"
        canvas.style.display = "block";
        requestAnimationFrame(menuAnimationFrame);

    } else if (newState === "shop"){

        shopDiv.style.display = "block";

    } else if (newState === "game"){
        await loadData();
        if (config.accountName === "loggedOut" && config.sessionCounted === false){
            config.sessionCounted = true;
            config.totalSession += 1;
        }
        config.roundAngleRotated = 0;
        config.roundHorizontalMovement = 0;
        config.roundVerticalMovement = 0;

        lastGameTimestamp = 0;
        gameDiv.style.display = "block";
        canvas.style.display = "block";
        questsDiv.style.display = "flex"
        console.log(config.activeUpgrades)
        if (config.quest1.active === true){ quest1.style.display = "block" }
        if (config.quest2.active === true){ quest2.style.display = "block" }
        questButtons.forEach(button => { button.style.display = "none" })
        config.equippedUpgrades.forEach(upgrade =>{ config[upgrade+"Used"]++; })

        if (config.quest1.id === 101 && config.quest1.active === true || config.quest2.id === 101 && config.quest2.active === true){ topHalfRed.style.display = "block" }
        if (config.quest1.id === 102 && config.quest1.active === true || config.quest2.id === 102 && config.quest2.active === true){ bottomHalfRed.style.display = "block" }
        if (config.quest1.id === 103 && config.quest1.active === true || config.quest2.id === 103 && config.quest2.active === true){ topThirdRed.style.display = "block"; bottomThirdRed.style.display = "block"; }

        config.baseSpeed = -200;
        config.roundTime = 0;
        distanceChange(null, 0);
        setUpPlayer();
        setUpAbilities();
        heartUpdate(config.hearts, 0)
        gameAnimationFrame();
        
    } else if (newState === "gameOver"){
        gameOverDiv.style.display = "block";
        if (config.activeUpgrades === 0){ pureDisplay.style.display = "block" }
        
        if (config.quest1.active === false && config.accountName === "loggedOut"){ config[`quest${config.quest1.id}Skipped`] += 1 }
        if (config.quest2.active === false && config.accountName === "loggedOut"){ config[`quest${config.quest2.id}Skipped`] += 1 }
        rerollQuests();
        if (hitboxesThisRound === true){ config.roundsWithHitboxes += 1; hitboxesThisRound = false}
        timeDisplay.textContent = `Time: ${Math.round(config.roundTime)} s`
        config[`roundsWith${config.usedSledString}`] += 1;
        config[`roundsWith${config.usedTrailString}`] += 1;
        console.log(config[`roundsWith${config.usedSledString}`])

        if (config.bestDistance < config.distance) { config.bestDistance = config.distance }
        if (config.bestSpeed > config.speed) { config.bestSpeed = config.speed }
        if (config.bestTime < config.roundTime) { config.bestTime = config.roundTime }
        config.totalDistance += config.distance;
        config.totalSpeed += config.speed;
        config.totalTime += config.roundTime;
        config.totalAngleRotated += config.roundAngleRotated;
        config.totalHorizontalMovement += config.roundHorizontalMovement;
        config.totalVerticalMovement += config.roundVerticalMovement;
        config.roundsPlayed += 1;

        if (config.activeUpgrades === 0){
            if (config.bestPureDistance < config.distance) { config.bestPureDistance = config.distance }
            if (config.bestPureSpeed > config.speed) { config.bestPureSpeed = config.speed }
            if (config.bestPureTime < config.roundTime) { config.bestPureTime = config.roundTime }
            config.totalPureDistance += config.distance;
            config.totalPureSpeed += config.speed;
            config.totalPureTime += config.roundTime;
            config.totalPureAngleRotated += config.roundAngleRotated;
            config.totalPureHorizontalMovement += config.roundHorizontalMovement;
            config.totalPureVerticalMovement += config.roundVerticalMovement;
            config.pureRoundsPlayed += 1;
        }

        saveData();
    } else if (newState === "feedback"){
        feedbackDiv.style.display = "block";
    } else if (newState === "logs"){
        logsDiv.style.display = "block";
    } else if (newState === "upgrades"){
        upgradesDiv.style.display = "block";
        upgradesBody.style.display = "block";
    } else if (newState === "disabled"){
        gameDisabled.style.display = "block";
    }
    
    console.log("Old game state: " + oldState + " | New game state: " + newState);
}

let hitboxesThisRound = false
function gameAnimationFrame(timestamp){
    let deltaTime = (timestamp - lastGameTimestamp) / 1000;
    lastGameTimestamp = timestamp
    config.deltaTime = deltaTime;

    if(config.gameState === "game"){
        context.clearRect(0, 0, canvas.width, canvas.height);
        if(config.usedTrail != "none") moveTrails(deltaTime);
        if(deltaTime > 0) distanceChange((config.speed/-200)*deltaTime, null);
        movePlayer(deltaTime);
        moveObstacles(deltaTime);
        abilityUpdate(deltaTime);
        if (config.quest1.id === 6 && config.lives === 1 && !Number.isNaN(deltaTime)){ updateQuests(1, deltaTime ) }
        if (config.quest2.id === 6 && config.lives === 1 && !Number.isNaN(deltaTime)){ updateQuests(2, deltaTime ) }

        if (hitboxesThisRound === false && config.showHitboxes === true){ hitboxesThisRound = true }
        if (deltaTime > 0){ config.roundTime += deltaTime}

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
        if (config.quest1.id === 3 || config.quest1.id === 4 || config.quest1.id === 5){ updateQuests(1, changeBy) }
        if (config.quest2.id === 3 || config.quest2.id === 4 || config.quest2.id === 5){ updateQuests(2, changeBy) }
        if (config.quest1.id === 101 && config.playerY > 490){ updateQuests(1, changeBy); } else if (config.quest1.id === 101){updateQuests(1, -config.quest1.progress) }
        if (config.quest2.id === 101 && config.playerY > 490){ updateQuests(2, changeBy); } else if (config.quest2.id === 101){updateQuests(2, -config.quest2.progress) }
        if (config.quest1.id === 102 && config.playerY < 410){ updateQuests(1, changeBy); } else if (config.quest1.id === 102){updateQuests(1, -config.quest1.progress) }
        if (config.quest2.id === 102 && config.playerY < 410){ updateQuests(2, changeBy); } else if (config.quest2.id === 102){updateQuests(2, -config.quest2.progress) }
        if (config.quest1.id === 103 && config.playerY < 560 && config.playerY > 340){ updateQuests(1, changeBy); } else if (config.quest1.id === 103){updateQuests(1, -config.quest1.progress) }
        if (config.quest2.id === 103 && config.playerY < 560 && config.playerY > 340){ updateQuests(2, changeBy); } else if (config.quest2.id === 103){updateQuests(2, -config.quest2.progress) }
        if (config.quest1.id === 104 || config.quest1.id === 105 || config.quest1.id === 106) { updateQuests(1, changeBy); }
        if (config.quest2.id === 104 || config.quest2.id === 105 || config.quest2.id === 106) { updateQuests(2, changeBy); }
    }
    if (distanceDisplay.textContent != `Distance: ${Math.round(config.distance*1)/1} m`){
        distanceDisplay.textContent = (`Distance: ${Math.round(config.distance*1)/1} m`);
        distanceDisplay2.textContent = (`Distance: ${Math.round(config.distance*1)/1} m`);
    }
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

function UPChange(changeBy, newUP){
    let oldUP = config.UP;
    if (newUP != null){
        config.UP = newUP
    } else {
        config.UP = config.UP + changeBy;
    }
    updateNodes();
    upgradesUPDisplay.textContent = ("UP: " + config.UP);
    console.log("Old UP: " + oldUP + " | New UP: " + config.UP);
}

function obstacleHit(type, angle) {
    
    if (type === "rock" || type === "cone" || type === "sled"){
        rockHit(angle);
        if (config.iFrames <= 0){
            heartUpdate(null, -1);
            if (type === "rock") { config.livesLostToRocks += 1 }
            if (type === "cone") { config.livesLostToWindCones += 1 }
            if (type === "sled") { config.livesLostToSleds += 1 }
            config.livesLost += 1;
            config.iFrames = 1;
            if (config.quest1.id === 5){ updateQuests(1, -config.quest1.progress) }
            if (config.quest2.id === 5){ updateQuests(2, -config.quest2.progress) }
        }
    } else if (type === "collectible"){

    } else if (type === "powerUp"){

    }

}

let quest1ProgText = document.getElementById("quest1ProgText")
let quest2ProgText = document.getElementById("quest2ProgText")
let quest1ProgFill = document.getElementById("quest1ProgFill")
let quest2ProgFill = document.getElementById("quest2ProgFill")
function updateQuests(number, amount){
    
    if (number === 1 && config.quest1.active === true){
        config.quest1.progress += amount;
        if (config.quest1.progress > config.quest1.x){config.quest1.progress = config.quest1.x}
        quest1ProgText.textContent = `${Math.floor(config.quest1.progress)}/${config.quest1.x}`
        quest1ProgFill.style.width = (config.quest1.progress/config.quest1.x)*100 + "%";
    }
    if (number === 2 && config.quest2.active === true){
        config.quest2.progress += amount;
        if (config.quest2.progress > config.quest2.x){config.quest2.progress = config.quest2.x}
        quest2ProgText.textContent = `${Math.floor(config.quest2.progress)}/${config.quest2.x}`
        quest2ProgFill.style.width = (config.quest2.progress/config.quest2.x)*100 + "%";
    }
}

document.addEventListener("DOMContentLoaded", function() {

    window.addEventListener("resize", function(){resizeScreen();})
    window.addEventListener("orientationchange", function(){setTimeout(resizeScreen, 100);})

    gameStateChange("mainMenu")
    UPChange(null, 0)

})

