import { config } from "./config.js";
import { UPChange, } from "./main.js";
import { saveData } from "./accountHandler.js";
export { updateNodes, upgrades, loadUpgrades }

const animatedImages = [
    {element: document.createElement("video"), name: "betterTurning"},
    {element: document.createElement("video"), name: "brakeControl"},
    {element: document.createElement("video"), name: "cardboardShield"},
    {element: document.createElement("video"), name: "coinGoblin"},
    {element: document.createElement("video"), name: "dash"},
    {element: document.createElement("video"), name: "extraHeart"},
    {element: document.createElement("video"), name: "goldenTouch"},
    {element: document.createElement("video"), name: "heart"},
    {element: document.createElement("video"), name: "lock"},
    {element: document.createElement("video"), name: "magneticSled"},
    {element: document.createElement("video"), name: "moreCoins"},
    {element: document.createElement("video"), name: "recoverySpeed"},
    {element: document.createElement("video"), name: "slipperySides"},
    {element: document.createElement("video"), name: "snowBall"},
    {element: document.createElement("video"), name: "stick"},
    {element: document.createElement("video"), name: "stickDash"},
]

animatedImages.forEach(image => {
    let video = image.element
    video.src = `Images/Upgrades/${image.name}.webm`;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.preload = "auto";
    video.pause()
})

let upgrades = [

    {id: "extraHeartI",
        type: "root",
        name: "Extra Heart I",
        desc: "Start the game with 2 hearts.",
        cost: 4,
        preReqs: [],
        status: "unlocked",
        equipped: false,
        image: "heart",
        x: 0, y: 0},

        {id: "mindReader",
        type: "upgrade",
        name: "Mind Reader",
        desc: "See where sled obstacles intent to turn.",
        cost: 4,
        preReqs: ["extraHeartI"],
        status: "locked",
        equipped: false,
        image: "mindReader",
        x: 0, y: 150},

        {id: "brakeControlI",
        type: "upgrade",
        name: "Brake Control I",
        desc: "Increases vertical movement speed by 5%.",
        cost: 6,
        preReqs: ["extraHeartI"],
        status: "locked",
        equipped: false,
        image: "brakeControl",
        x: 125, y: 100},

        {id: "brakeControlII",
        type: "upgrade",
        name: "Brake Control II",
        desc: "Increases vertical movement speed by another 5%.",
        cost: 9,
        preReqs: ["brakeControlI"],
        status: "locked",
        equipped: false,
        image: "brakeControl",
        x: 125, y: 225},

        {id: "slipperySidesI",
        type: "upgrade",
        name: "Slippery Sides I",
        desc: "Increases horizontal movement speed by 5%.",
        cost: 6,
        preReqs: ["extraHeartI"],
        status: "locked",
        equipped: false,
        image: "slipperySides",
        x: -125, y: 100},

        {id: "slipperySidesII",
        type: "upgrade",
        name: "Slippery Sides II",
        desc: "Increases horizontal movement speed by another 5%.",
        cost: 9,
        preReqs: ["slipperySidesI"],
        status: "locked",
        equipped: false,
        image: "slipperySides",
        x: -125, y: 225},

        {id: "extraHeartII",
        type: "upgrade",
        name: "Extra Heart II",
        desc: "Start the game with 3 hearts.",
        cost: 15,
        preReqs: ["mindReader", "brakeControlII", "slipperySidesII"],
        status: "locked",
        equipped: false,
        image: "heart",
        x: 0, y: 325},

        {id: "recoverySpeedI",
        type: "upgrade",
        name: "Recovery Speed I",
        desc: "Decrease knockback from obstacles by 15%.",
        cost: 5,
        preReqs: ["extraHeartI"],
        status: "locked",
        equipped: false,
        image: "recoverySpeed",
        x: 125, y: 0},

        {id: "recoverySpeedII",
        type: "upgrade",
        name: "Recovery Speed II",
        desc: "Decrease knockback from obstacles by another 15%.",
        cost: 8,
        preReqs: ["recoverySpeedI"],
        status: "locked",
        equipped: false,
        image: "recoverySpeed",
        x: 250, y: 50},

        {id: "magneticSledI",
        type: "upgrade",
        name: "Magnetic Sled I",
        desc: "Increase coin collection radius by 40%.",
        cost: 6,
        preReqs: ["extraHeartI"],
        status: "locked",
        equipped: false,
        image: "magneticSled",
        x: 75, y: -100},

        {id: "magneticSledII",
        type: "upgrade",
        name: "Magnetic Sled II",
        desc: "Increase coin collection radius by another 40%.",
        cost: 8,
        preReqs: ["magneticSledI"],
        status: "locked",
        equipped: false,
        image: "magneticSled",
        x: 200, y: -125},

        {id: "goldenTouchI",
        type: "upgrade",
        name: "Golden Touch I",
        desc: "Adds a 15% chance of gaining 2 coins instead of 1.",
        cost: 7,
        preReqs: ["extraHeartI"],
        status: "locked",
        equipped: false,
        image: "goldenTouch",
        x: -25, y: -125},

        {id: "goldenTouchII",
        type: "upgrade",
        name: "Golden Touch II",
        desc: "Gain an extra 15% chance of gaining 2 coins.",
        cost: 11,
        preReqs: ["goldenTouchI"],
        status: "locked",
        equipped: false,
        image: "goldenTouch",
        x: -50, y: -225},

        {id: "moreCoins",
        type: "upgrade",
        name: "More Coins",
        desc: "Coins spawn +33% more often.",
        cost: 12,
        preReqs: ["goldenTouchII"],
        status: "locked",
        equipped: false,
        image: "moreCoins",
        x: 25, y: -325},

        {id: "betterTurningI",
        type: "upgrade",
        name: "Better Turning I",
        desc: "Increases turn speed by 5%.",
        cost: 6,
        preReqs: ["extraHeartI"],
        status: "locked",
        equipped: false,
        image: "betterTurning",
        x: -125, y: -25},

        {id: "betterTurningII",
        type: "upgrade",
        name: "Better Turning II",
        desc: "Increases turn speed by another 5%.",
        cost: 10,
        preReqs: ["betterTurningI"],
        status: "locked",
        equipped: false,
        image: "betterTurning",
        x: -250, y: -50},

        {id: "disposableBrakes",
        type: "ability",
        name: "Disposable Brakes",
        desc: "Decrease speed by 5%, 1 use per round.",
        cost: 12,
        preReqs: ["brakeControlII"],
        status: "locked",
        equipped: false,
        image: "brakes",
        x: 175, y: 325},

        {id: "cardboardShield",
        type: "ability",
        name: "Cardboard Shield",
        desc: "Gain 1.5s of invulnerability, 1 use per round.",
        cost: 14,
        preReqs: ["recoverySpeedII"],
        status: "locked",
        equipped: false,
        image: "cardboardShield",
        x: 380, y: 90},

        {id: "snowballCannon",
        type: "ability",
        name: "Snowball Cannon",
        desc: "Shoot a snowball in the direction you face, destroying whatever it hits. 1 use per round.",
        cost: 15,
        preReqs: ["betterTurningII"],
        status: "locked",
        equipped: false,
        image: "snowBall",
        x: -375, y: -60},

        {id: "bigStick",
        type: "ability",
        name: "Big Stick",
        desc: "Quickly dash in the direction you are facing, 20s cooldown.",
        cost: 11,
        preReqs: ["slipperySidesII"],
        status: "locked",
        equipped: false,
        image: "stickDash",
        x: -175, y: 325},

        {id: "shrinkRay",
        type: "ability",
        name: "Shrink Ray",
        desc: "Decrease sled size by 50% for 5s, 1 use per round.",
        cost: 14,
        preReqs: ["magneticSledII"],
        status: "locked",
        equipped: false,
        image: "shrinkRay",
        x: 325, y: -130},

        {id: "coinGoblin",
        type: "ability",
        name: "Coin Goblin",
        desc: "Coins are +100% more likely to spawn for 20s, 1 use per round.",
        cost: 18,
        preReqs: ["goldenTouchII"],
        status: "locked",
        equipped: false,
        image: "coinGoblin",
        x: -150, y: -325},

        {id: "strongerBrakes",
        type: "abilityUpgrade",
        name: "Stronger Brakes",
        desc: "Disposable Breaks now decrease speed by 10%.",
        cost: 8,
        preReqs: ["disposableBrakes"],
        status: "locked",
        equipped: false,
        image: "strongerBrakes",
        x: 225, y: 415},

        {id: "moreBrakes",
        type: "abilityUpgrade",
        name: "More Brakes",
        desc: "Disposable Breaks gain an extra use per round.",
        cost: 10,
        preReqs: ["disposableBrakes"],
        status: "locked",
        equipped: false,
        image: "moreBrakes",
        x: 270, y: 330},

        {id: "thickerCardboard",
        type: "abilityUpgrade",
        name: "Thicker Cardboard",
        desc: "Cardboard Shield now lasts for 3s.",
        cost: 10,
        preReqs: ["cardboardShield"],
        status: "locked",
        equipped: false,
        image: "thickerCardboard",
        x: 470, y: 150},

        {id: "moreCardboard",
        type: "abilityUpgrade",
        name: "More Cardboard",
        desc: "Cardboard Shield gains an extra use per round.",
        cost: 12,
        preReqs: ["cardboardShield"],
        status: "locked",
        equipped: false,
        image: "moreCardboard",
        x: 470, y: 50},

        {id: "spikeyCardboard",
        type: "abilityUpgrade",
        name: "Spikey Cardboard",
        desc: "Hitting an obstacle with your shield active destroys it.",
        cost: 10,
        preReqs: ["thickerCardboard", "moreCardboard"],
        status: "locked",
        equipped: false,
        image: "spikeyCardboard",
        x: 550, y: 100},

        {id: "moreSnow",
        type: "abilityUpgrade",
        name: "More Snow",
        desc: "Snowball Cannon gains an extra use per round.",
        cost: 12,
        preReqs: ["snowballCannon"],
        status: "locked",
        equipped: false,
        image: "moreSnow",
        x: -425, y: 25},

        {id: "compactSnowball",
        type: "abilityUpgrade",
        name: "Compact Snowball",
        desc: "Your snowballs destroy 2 obstacles instead of 1.",
        cost: 9,
        preReqs: ["snowballCannon"],
        status: "locked",
        equipped: false,
        image: "compactSnowball",
        x: -475, y: -80},

        {id: "lighterStick",
        type: "abilityUpgrade",
        name: "Lighter Stick",
        desc: "Reduce Big Stick cooldown by 10s.",
        cost: 8,
        preReqs: ["bigStick"],
        status: "locked",
        equipped: false,
        image: "lighterStick",
        x: -225, y: 415},

        {id: "protectiveStick",
        type: "abilityUpgrade",
        name: "Protective Stick",
        desc: "Obstacles hit during the dash have no effect.",
        cost: 15,
        preReqs: ["bigStick"],
        status: "locked",
        equipped: false,
        image: "protectiveStick",
        x: -270, y: 330},

        {id: "coinHog",
        type: "abilityUpgrade",
        name: "Coin Hog",
        desc: "Coin Goblin effect is now +150% instead of +100%.",
        cost: 14,
        preReqs: ["coinGoblin"],
        status: "locked",
        equipped: false,
        image: "coinHog",
        x: -100, y: -415},

        {id: "longCoins",
        type: "abilityUpgrade",
        name: "Long Coins",
        desc: "Coin Goblin lasts for 30s.",
        cost: 14,
        preReqs: ["coinGoblin"],
        status: "locked",
        equipped: false,
        image: "longCoins",
        x: -200, y: -415},

        {id: "strongerBeam",
        type: "abilityUpgrade",
        name: "Stronger Beam",
        desc: "Shrink Ray decreases size by 80% instead of 50%.",
        cost: 10,
        preReqs: ["shrinkRay"],
        status: "locked",
        equipped: false,
        image: "strongerBeam",
        x: 425, y: -170},

        {id: "moreEnergy",
        type: "abilityUpgrade",
        name: "More Energy",
        desc: "Shrink Ray lasts 10s instead of 5s",
        cost: 12,
        preReqs: ["shrinkRay"],
        status: "locked",
        equipped: false,
        image: "moreEnergy",
        x: 325, y: -225},

        {id: "batteryPack",
        type: "abilityUpgrade",
        name: "Battery Pack",
        desc: "Shrink ray gains 1 use per round.",
        cost: 12,
        preReqs: ["strongerBeam", "moreEnergy"],
        status: "locked",
        equipped: false,
        image: "batteryPack",
        x: 415, y: -270},

]

let equippedAbilities = [];
let abilityENum = 0;
let abilityQNum = 0;

let EKeyButton = document.getElementById("EKey");
let QKeyButton = document.getElementById("QKey");
let EKeyImg = document.getElementById("EKeyImg");
let QKeyImg = document.getElementById("QKeyImg");
let EKeyName = document.getElementById("EKeyName");
let QKeyName = document.getElementById("QKeyName");

EKeyImg.style.display = "none";
QKeyImg.style.display = "none";

function updateNodes() {

    config.activeUpgrades = 0;
    config.hearts = 1;
    config.horizontalSpeed = 125;
    config.verticalSpeed = 150;
    config.turnSpeed = 100;
    config.knockback = 150;
    config.coinRadius = 40;
    config.coinDouble = 0;
    config.mindReader = false;

    config.disposableBrakes = false;
    config.disposableBrakeUses = 1;
    config.disposableBrakePower = .95;
    config.bigStick = false;
    config.protectiveStick = false;
    config.bigStickCooldown = 20;
    config.cardboardShield = false;
    config.cardboardShieldDuration = 1.5;
    config.cardboardShieldUses = 1;
    config.spikeyCardboard = false;
    config.snowballcannon = false;
    config.snowballcannonUses = 1;
    config.snowballcannonPierce = 1;
    config.shrinkRay = false;
    config.shrinkRayDuration = 5;
    config.shrinkRayEffect = .75;
    config.shrinkRayUses = 1;
    config.coinGoblin = false;
    config.coinGoblinEffect = 2;
    config.coinGoblinDuration = 20;
    config.coinGoblinUses = 1;

    config.rockChance = 73
    config.coinChance = 3
    config.coneChance = 15
    config.sledChance = 9

    equippedAbilities = [];
    config.equippedUpgrades = [];
    config.boughtUpgrades = [];

    upgrades.forEach(upgrade => {
        let upgradeImage = document.getElementById(upgrade.id+"UpgradeImage")
        let upgradeButton = document.getElementById(upgrade.id)
        let allPreReqsActive = upgrade.preReqs.every(preReqId => {
                let preReqUpgrade = upgrades.find(preReqU => preReqU.id === preReqId );
                return preReqUpgrade.equipped === true;
            })
        if (!allPreReqsActive){ upgrade.equipped = false; }
        if (upgrade.type === "ability" && upgrade.status === "bought" && upgrade.equipped === false){equippedAbilities = equippedAbilities.filter(id => id !== upgrade.id) }

        if (upgrade.status === "bought" && upgrade.equipped === true){ 
            config.equippedUpgrades.push(upgrade.id)
            config.boughtUpgrades.push(upgrade.id)

            if (upgrade.id === "brakeControlI" || upgrade.id === "brakeControlII"){ config.verticalSpeed += 7.5 }
            if (upgrade.id === "slipperySidesI" || upgrade.id === "slipperySidesII"){ config.horizontalSpeed += 6.25 }
            if (upgrade.id === "recoverySpeedI" || upgrade.id === "recoverySpeedII"){ config.knockback -= 22.5 }
            if (upgrade.id === "betterTurningI" || upgrade.id === "betterTurningII"){ config.turnSpeed +=5 }
            if (upgrade.id === "magneticSledI" || upgrade.id === "magneticSledII"){ config.coinRadius += 16 }
            if (upgrade.id === "goldenTouchI" || upgrade.id === "goldenTouchII"){ config.coinDouble += .15 }
            if (upgrade.id === "extraHeartI" || upgrade.id === "extraHeartII"){ config.hearts += 1 }
            if (upgrade.id === "moreCoins"){ config.coinChance += 1; config.rockChance -=1 }
            if (upgrade.id === "mindReader"){ config.mindReader = true }

            if (upgrade.id === "disposableBrakes"){ config.disposableBrakes = true; }
            if (upgrade.id === "moreBrakes"){ config.disposableBrakeUses += 1; }
            if (upgrade.id === "strongerBrakes"){ config.disposableBrakePower -= .05; }
            if (upgrade.id === "bigStick"){ config.bigStick = true }
            if (upgrade.id === "protectiveStick"){ config.protectiveStick = true }
            if (upgrade.id === "lighterStick"){ config.bigStickCooldown -= 10 }
            if (upgrade.id === "cardboardShield") { config.cardboardShield = true}
            if (upgrade.id === "thickerCardboard"){ config.cardboardShieldDuration += 1.5 }
            if (upgrade.id === "moreCardboard"){ config.cardboardShieldUses += 1}
            if (upgrade.id === "spikeyCardboard"){ config.spikeyCardboard = true }
            if (upgrade.id === "snowballCannon"){ config.snowballcannon = true }
            if (upgrade.id === "moreSnow"){ config. snowballcannonUses += 1 }
            if (upgrade.id === "compactSnowball"){ config.snowballcannonPierce += 1 }
            if (upgrade.id === "shrinkRay"){ config.shrinkRay = true }
            if (upgrade.id === "moreEnergy"){ config.shrinkRayDuration += 5 }
            if (upgrade.id === "strongerBeam"){ config.shrinkRayEffect -= .125 }
            if (upgrade.id === "batteryPack"){ config.shrinkRayUses += 1 }
            if (upgrade.id === "coinGoblin"){ config.coinGoblin = true }
            if (upgrade.id === "coinHog"){ config.coinGoblinEffect += .5 }
            if (upgrade.id === "longCoins"){ config.coinGoblinDuration += 10 }

            if (upgrade.type === "ability") { equippedAbilities.push(upgrade.id) }
            config.activeUpgrades++;

        } else if (upgrade.status === "bought" && upgrade.equipped === false){ 
            config.boughtUpgrades.push(upgrade.id)

            if (upgrade.type === "ability" && !equippedAbilities.includes(upgrade.id)){
                if (config.abilityE === upgrade.id){
                    config.abilityE = "none";
                    EKeyName.textContent = "None"
                    abilityENum = 0;
                }
                if (config.abilityQ === upgrade.id && !equippedAbilities.includes(upgrade.id)){
                    config.abilityQ = "none";
                    QKeyName.textContent = "None"
                    abilityQNum = 0;
                }
            }
        }

        if (upgrade.status === "locked"){
            let allPreReqsMet = upgrade.preReqs.every(preReqId => {
                let preReqUpgrade = upgrades.find(preReqU => preReqU.id === preReqId );
                return preReqUpgrade.status === "bought";
            })

            if (allPreReqsMet){
                upgrade.status = "unlocked";
                
                if (upgrade.image != null){
                    upgradeImage.src = `Images/Upgrades/${upgrade.image}.webm`;
                    upgradeImage.poster = `Images/Upgrades/${upgrade.image}.png`;
                } else {
                    if (upgradeImage){ upgradeImage.style.display = "none"; }
                    upgradeButton.textContent = upgrade.name;
                }
                
            }
        }
        
        if (upgrade.status === "unlocked"){
            if (config.UP >= upgrade.cost){ upgradeButton.style.borderColor = `rgb(45, 133, 92)` }
            else { upgradeButton.style.borderColor = `rgb(182, 19, 19)` }
        }


        if (upgrade.status === "bought"){ upgradeButton.style.borderColor = `rgb(103, 19, 182)` }
        if (upgrade.status != "bought"){ upgradeButton.style.filter = `grayscale(50%)`; }
        if (upgrade.equipped === false && upgrade.status === "bought"){ upgradeButton.style.filter = `grayscale(25%)`; if(upgradeImage){ upgradeImage.style.filter = `grayscale(50%)`; }; }
        if (upgrade.equipped === true){ upgradeButton.style.filter = `grayscale(0%) drop-shadow(0 0 15px rgb(138, 75, 255))`;  if(upgradeImage){ upgradeImage.style.filter = `grayscale(0%)`; }; }
    })

    let activeUpgradesText = document.getElementById("maxActiveUpgrades");
    activeUpgradesText.textContent = `${config.activeUpgrades}/16 Active Upgrades`
    console.log(config.equippedUpgrades)
    saveData();
}

function cycleAbility(key){
    let ability;
    if (Number.isNaN(abilityENum)){abilityENum = 1};
    if (Number.isNaN(abilityQNum)){abilityQNum = 1};
    console.log(equippedAbilities)
    console.log(abilityENum)

    if (key === "E"){
        abilityENum = (abilityENum+1) % equippedAbilities.length;

        ability = upgrades.find(abilityCheck => abilityCheck.id === equippedAbilities[abilityENum])
        config.abilityE = equippedAbilities[abilityENum]

        if (ability.image != null){ EKeyImg.style.display = "block"; EKeyImg.src = `Images/Upgrades/${ability.image}.png`; EKeyName.textContent = ""; }
        else { EKeyImg.style.display = "none"; EKeyName.textContent = ability.name }
    }

    if (key === "Q"){
        abilityQNum = (abilityQNum+1) % equippedAbilities.length;

        ability = upgrades.find(abilityCheck => abilityCheck.id === equippedAbilities[abilityQNum])
        config.abilityQ = equippedAbilities[abilityQNum]

        if (ability.image != null){ QKeyImg.style.display = "block"; QKeyImg.src = `Images/Upgrades/${ability.image}.png`; QKeyName.textContent = ""; }
        else { QKeyImg.style.display = "none"; QKeyName.textContent = ability.name }
    }
}


document.addEventListener("DOMContentLoaded", function() {

let upgradesDiv = document.getElementById("upgradesDiv");
let svg = document.getElementById("upgradesSvg");
let hoverDiv = document.getElementById("upgradeHoverBack");
hoverDiv.style.display = "none";
upgrades.forEach(upgrade => {

    // Create Node
    let upgradeNode = document.createElement("button");
    upgradeNode.id = (upgrade.id);
    upgradeNode.classList.add("upgradeNode");
    upgradeNode.style.filter = `grayscale(50%)`;
    if (upgrade.id != "extraHeartI") { upgrade.status = "locked"; }
    else { upgrade.status = "unlocked"; }

    // Set Node Position
    let x = upgrade.x + config.designWidth/2;
    let y = -upgrade.y + config.designHeight/2;
    upgradeNode.style.left = x + "px";
    upgradeNode.style.top = y + "px";

    // Set node Img
    let upgradeImage = document.createElement("video");
    upgradeImage.id = (upgrade.id+"UpgradeImage");
    upgradeNode.appendChild(upgradeImage);
    
    if (upgrade.id === "extraHeartI"){ 
        upgradeImage.src = `Images/Upgrades/${upgrade.image}.webm`;
        upgradeImage.poster = `Images/Upgrades/${upgrade.image}.png`;
    } else { upgradeImage.src = `Images/Upgrades/lock.webm`;  upgradeImage.poster = `Images/Upgrades/lock.png`; }


    // Create Lines
    upgrade.preReqs.forEach(preReq => {
        let preReqUpgrade = upgrades.find(upgrade => upgrade.id === preReq);
        let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", preReqUpgrade.x + config.designWidth/2);
        line.setAttribute("y1", -preReqUpgrade.y + config.designHeight/2);
        line.setAttribute("x2", upgrade.x + config.designWidth/2);
        line.setAttribute("y2", -upgrade.y + config.designHeight/2);
        line.classList.add("preReqLine");
        svg.appendChild(line);
    })

    // Detect Hover & Set Details
    let hoverTitle = document.getElementById("upgradeTitle");
    let hoverDesc = document.getElementById("upgradeDesc");
    let hoverCost = document.getElementById("upgradeCost");

    upgradeNode.addEventListener("mouseenter", function() {if(upgrade.status != "locked"){
        hoverDiv.style.display = "block"; hoverTitle.textContent = upgrade.name;
        hoverDesc.textContent = upgrade.desc;
        hoverCost.textContent = `Cost: ${upgrade.cost} UP`
    }
        if (upgradeImage){
           upgradeImage.play();
           upgradeImage.loop = true;
           upgradeImage.playsInline = true;
    }})

    upgradeNode.addEventListener("mousemove", function(event) {
        let scaleDivRect = document.getElementById("scaleDiv").getBoundingClientRect();
        let scale = scaleDivRect.width/config.designWidth
        let localX = (event.clientX - scaleDivRect.left)/scale;
        let localY = (event.clientY - scaleDivRect.top)/scale;
        if (localY + hoverDiv.clientHeight + 8 > config.designHeight){ localY = config.designHeight - hoverDiv.clientHeight - 8; }

        hoverDiv.style.left = localX + "px";
        hoverDiv.style.top = localY + "px";
    })

    upgradeNode.addEventListener("mouseleave", function() {
        hoverDiv.style.display = "none"
        if (upgradeImage){
            upgradeImage.pause();
            upgradeImage.currentTime = 0;
        }
    })


    // Append Node
    upgradesDiv.appendChild(upgradeNode);
});

let upgradeNodes = document.querySelectorAll(".upgradeNode")

upgradeNodes.forEach(button => {
    button.addEventListener("click", function() {
        let upgrade = upgrades.find(upgrade => upgrade.id === button.id);

        if (upgrade.status === "unlocked" && config.UP >= upgrade.cost){
            upgrade.status = "bought";
            if (config.activeUpgrades < 16){ upgrade.equipped = true; }
            button.style.filter = `grayscale(0%)`;
            UPChange(-upgrade.cost, null);
            updateNodes();
        } else if (upgrade.status === "bought" && upgrade.equipped === true){
            upgrade.equipped = false;
            updateNodes();
        } else if (upgrade.status === "bought" && upgrade.equipped === false && config.activeUpgrades < 16){
            upgrade.equipped = true;
            updateNodes();
        }
    })
})

updateNodes();

EKeyButton.addEventListener("click", () => { cycleAbility("E") })
QKeyButton.addEventListener("click", () => { cycleAbility("Q") })


})


function loadUpgrades() {

    upgrades.forEach(upgrade => {
        let upgradeImage = document.getElementById(upgrade.id+"UpgradeImage")
        let upgradeButton = document.getElementById(upgrade.id)

        if (upgrade.equipped === true){
            config.activeUpgrades++;
            upgradeButton.style.filter = `grayscale(0%) drop-shadow(0 0 15px rgb(138, 75, 255))`;
            if (upgrade.image != null){
                upgradeImage.src = `Images/Upgrades/${upgrade.image}.webm`;
                upgradeImage.poster = `Images/Upgrades/${upgrade.image}.png`;
            } else {
                if (upgradeImage){ upgradeImage.style.display = "none"; }
                upgradeButton.textContent = upgrade.name;
            }

        } else if (upgrade.status === "bought"){
            upgradeButton.style.filter = `grayscale(25%)`;
            if (upgrade.image != null){
                upgradeImage.src = `Images/Upgrades/${upgrade.image}.webm`;
                upgradeImage.poster = `Images/Upgrades/${upgrade.image}.png`;
            } else {
                if (upgradeImage){ upgradeImage.style.display = "none"; }
                upgradeButton.textContent = upgrade.name;
            }
        }})
    updateNodes();
}
