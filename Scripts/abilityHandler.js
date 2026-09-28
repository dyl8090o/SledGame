import { config } from "./config.js"
export { setUpAbilities, abilityUpdate }

let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d")

const snowballImage = new Image();
snowballImage.src = "Images/snowBall.png"

let disposableBrakeUsed;
let cardboardShieldUsed;
let shrinkRayUsed;
let coinGoblinUsed;
let snowballCannonUsed;
let bigStickCooldown;
let oldPlayerWidth;
let oldPlayerHeight;
let shrinkRayActive;
let coinGoblinDuration;
let oldRockChance;
let oldCoinChance;
let oldConeChance;
let oldSledChance;
function setUpAbilities() {
    disposableBrakeUsed = 0
    cardboardShieldUsed = 0;
    shrinkRayUsed = 0;
    coinGoblinUsed = 0;
    snowballCannonUsed = 0;
    bigStickCooldown = 0;
    shrinkRayActive = 0;
    config.spikeyCardboardActive = 0;
    config.snowball = {};
    oldRockChance = 0;
    oldCoinChance = 0;
    oldConeChance = 0;
    oldSledChance = 0;
    coinGoblinDuration = 0;
}

function abilityUpdate(deltaTime){
    if (bigStickCooldown > 0){ bigStickCooldown -= deltaTime }
    if (config.spikeyCardboardActive > 0){ config.spikeyCardboardActive -= deltaTime }
    if (shrinkRayActive > 0){
        shrinkRayActive -= deltaTime
        if (shrinkRayActive <= 0){ config.playerWidth = oldPlayerWidth; config.playerHeight = oldPlayerHeight; }
    }

    if (config.snowballHits >= config.snowballcannonPierce || config.snowball.x > 750 || config.snowball.x < -50 || config.snowball.y < -50 ){ config.snowball = {}; config.snowballHits = 0; }
    if (config.snowball != {}){
        if (config.snowball.XSpeed > 0){config.snowball.x += config.snowball.XFactor*(config.snowball.XSpeed+150)*deltaTime}
        if (config.snowball.XSpeed < 0){config.snowball.x -= config.snowball.XFactor*(config.snowball.XSpeed-150)*deltaTime}
        config.snowball.y += config.snowball.YFactor*(config.snowball.YSpeed+150)*deltaTime

        context.drawImage(snowballImage, config.snowball.x, config.snowball.y, config.snowballWidth, config.snowballHeight)
        if (config.showHitboxes === true){
            context.beginPath();
            context.arc(config.snowball.x + config.snowballWidth/2, config.snowball.y + config.snowballHeight/2, config.snowballWidth/2, 0, Math.PI * 2)
            context.strokeStyle = "yellow";
            context.lineWidth = 2;
            context.stroke();
        }
    }

    if (coinGoblinDuration > 0){
        coinGoblinDuration -= deltaTime
        if (coinGoblinDuration <= 0){
            console.log("ENDED")
            config.rockChance += (oldCoinChance * (1+config.coinGoblinEffect))/4;
            config.coinChance -= (oldCoinChance * (1+config.coinGoblinEffect));
            config.coneChance += (oldCoinChance * (1+config.coinGoblinEffect))/4
            config.sledChance += (oldCoinChance * (1+config.coinGoblinEffect))/4
        }
    }

}

function disposableBrakes() {
    if (disposableBrakeUsed < config.disposableBrakeUses){
        disposableBrakeUsed++;
        config.baseSpeed *= config.disposableBrakePower;
        config.disposableBrakesActivated++;
    }
}

function bigStick() {
    if (bigStickCooldown <= 0){
        bigStickCooldown = config.bigStickCooldown;
        config.dash = 1;
        config.bigStickActivated++;
    }
}

function cardboardShield() {
    if (cardboardShieldUsed < config.cardboardShieldUses){
        cardboardShieldUsed++;
        config.iFrames = config.cardboardShieldDuration;
        if (config.spikeyCardboard){ config.spikeyCardboardActive = config.cardboardShieldDuration; }
        config.cardboardShieldActivated++;
    }
}

function shrinkRay() {
    if (shrinkRayUsed < config.shrinkRayUses && shrinkRayActive <= 0){
        shrinkRayUsed++;
        oldPlayerWidth = config.playerWidth;
        oldPlayerHeight = config.playerHeight;

        console.log(config.shrinkRayEffect)

        shrinkRayActive = config.shrinkRayDuration
        config.playerWidth *= config.shrinkRayEffect
        config.playerHeight *= config.shrinkRayEffect
        config.shrinkRayActivated++;
    }
}

function snowballCannon() {
    if (snowballCannonUsed < config.snowballcannonUses && !config.snowball.x){
        snowballCannonUsed++;
        config.snowballHits = 0;
        config.snowball = {
            x: config.playerX-config.snowballWidth/2,
            y: config.playerY-config.snowballHeight/2,
            XFactor: Math.sin(config.playerRotate),
            YFactor: -Math.cos(config.playerRotate),
            XSpeed: ((config.horizontalSpeed * Math.sin(config.playerRotate)*1.25)),
            YSpeed: ((config.verticalSpeed * config.verticalModifier)),
            hits: 0,
        }
        console.log(config.snowball)
        config.snowballCannonActivated++;
    }
}

function coinGoblin() {
    if (coinGoblinUsed < config.coinGoblinUses && coinGoblinDuration <= 0){
        coinGoblinUsed++;
        coinGoblinDuration = config.coinGoblinDuration;

        oldRockChance = config.rockChance;
        oldCoinChance = config.coinChance;
        oldConeChance = config.coneChance;
        oldSledChance = config.sledChance;

        config.rockChance -= (oldCoinChance * (1+config.coinGoblinEffect))/4;
        config.coinChance += (oldCoinChance * (1+config.coinGoblinEffect));
        config.coneChance -= (oldCoinChance * (1+config.coinGoblinEffect))/4
        config.sledChance -= (oldCoinChance * (1+config.coinGoblinEffect))/4

        console.log(`Rock: ${oldRockChance} | Coin: ${oldCoinChance} | Cone: ${oldConeChance} | Sled: ${oldSledChance} ||| Rock: ${config.rockChance} | Coin: ${config.coinChance} | Cone: ${config.coneChance} | Sled: ${config.sledChance} | `)
        config.coinGoblinActivated++;
    }
}



document.addEventListener("DOMContentLoaded", () =>{

    window.addEventListener("keydown", (event) =>{
        if (event.key.toLowerCase() === "q"){ 
            if (config.abilityQ === "disposableBrakes"){ disposableBrakes(); }
            if (config.abilityQ === "bigStick"){ bigStick(); }
            if (config.abilityQ === "cardboardShield"){ cardboardShield(); }
            if (config.abilityQ === "shrinkRay"){ shrinkRay(); }
            if (config.abilityQ === "snowballCannon"){ snowballCannon(); }
            if (config.abilityQ === "coinGoblin"){ coinGoblin(); }
        }

        if (event.key.toLowerCase() === "e"){ 
            if (config.abilityE === "disposableBrakes"){ disposableBrakes(); }
            if (config.abilityE === "bigStick"){ bigStick(); }
            if (config.abilityE === "cardboardShield"){ cardboardShield(); }
            if (config.abilityE === "shrinkRay"){ shrinkRay(); }
            if (config.abilityE === "snowballCannon"){ snowballCannon(); }
            if (config.abilityE === "coinGoblin"){ coinGoblin(); }
        }
    })

} )