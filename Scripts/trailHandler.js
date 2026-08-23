import { config } from "./config.js";
export { moveTrails }

let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d")
let trailNodes = [];

const trailImage = new Image();


// Line Trails
setInterval (() => {
    if (config.gameState === "game" && [`Images/redCircle.png`, `Images/greenCircle.png`, `Images/blueCircle.png`, `Images/orangeCircle.png`, `Images/purpleCircle.png`].includes(config.usedTrail)){
       trailNodes.push({ x: config.playerX, y: config.playerY, rotation: 0, transparency: 1 }) 
    }
}, 10)

// Star & Heart Trails
setInterval (() => {
    if (config.gameState === "game" && [`Images/heart.png`, `Images/star.png`, `Images/duckSled.png`].includes(config.usedTrail)){
       trailNodes.push({ x: config.playerX, y: config.playerY, rotation: config.playerRotate, transparency: 2 }) 
    }
}, 500)

function moveTrails(deltaTime) {
    trailImage.src = config.usedTrail;
for(let i = 0; i < trailNodes.length; i++){
    trailNodes[i].transparency -= (deltaTime/1);

    

    // Draw Trail
    context.save();
    context.globalAlpha = trailNodes[i].transparency**3;
    context.translate(trailNodes[i].x, trailNodes[i].y);
    context.rotate(trailNodes[i].rotation)
    context.drawImage(trailImage, -config.trailWidth/2, -config.trailHeight/2, config.trailWidth, config.trailHeight)
    context.restore();
}

trailNodes = trailNodes.filter(function(trail){return trail.transparency > .1});
}









