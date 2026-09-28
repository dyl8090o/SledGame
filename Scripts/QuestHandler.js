import { config } from "./config.js";
import { UPChange } from "./main.js";
export { rerollQuests }

let possibleQuests = []
let possibleSpecialQuests = []

function generateQuests() {

    possibleQuests = []
    possibleSpecialQuests = []

    possibleQuests = [

    ((x) => ({
        id: 1,
        x: x,
        quest: `Gain ${x} coins.`,
        reward: Math.floor(x*.3),
        extraInfo: null,
        active: false,
        progress: 0,
    }))(Math.floor(Math.random() * (15 - 8 + 1) + 8)),

    ((x) => ({
        id: 2,
        x: x,
        quest: `Gain ${x} coins in one round.`,
        reward: Math.floor(x*.4),
        extraInfo: null,
        active: false,
        progress: 0,
    }))(Math.floor(Math.random() * (8 - 3 + 1) + 4)),

    ((x) => ({
        id: 3,
        x: x,
        quest: `Gain ${x} distance.`,
        reward: Math.floor(x*.005),
        extraInfo: null,
        active: false,
        progress: 0,
    }))(Math.floor(Math.random() * (800 - 300 + 1) + 300)),

    ((x) => ({
        id: 4,
        x: x,
        quest: `Gain ${x} distance in one round.`,
        reward: Math.floor(x*.02),
        extraInfo: null,
        active: false,
        progress: 0,
    }))(Math.floor(Math.random() * (200 - 70 + 1) + 80)),

    ((x) => ({
        id: 5,
        x: x,
        quest: `Gain ${x} distance in one round without taking damage.`,
        reward: Math.floor(x*.03),
        extraInfo: null,
        active: false,
        progress: 0,
    }))(Math.floor(Math.random() * (160 - 70 + 1) + 80)),

    ((x) => ({
        id: 6,
        x: x,
        quest: `Survive ${x} seconds in one round with one heart.`,
        reward: Math.floor(x*.08),
        extraInfo: null,
        active: false,
        progress: 0,
    }))(Math.floor(Math.random() * (80 - 40 + 1) + 40)),

    ]




    // NEW SECTION

    possibleSpecialQuests = [

    ((x) => ({
        id: 101,
        x: x,
        quest: `Gain ${x} consecutive distance in one round in the bottom half of the screen.`,
        reward: Math.floor(x*.04),
        extraInfo: null,
        active: false,
        progress: 0,
    }))(Math.floor(Math.random() * (160 - 70 + 1) + 80)),

    ((x) => ({
        id: 102,
        x: x,
        quest: `Gain ${x} consecutive distance in one round in the top half of the screen.`,
        reward: Math.floor(x*.05),
        extraInfo: null,
        active: false,
        progress: 0,
    }))(Math.floor(Math.random() * (160 - 70 + 1) + 80)),

    ((x) => ({
        id: 103,
        x: x,
        quest: `Gain ${x} consecutive distance in one round in the middle third of the screen.`,
        reward: Math.floor(x*.07),
        extraInfo: null,
        active: false,
        progress: 0,
    }))(Math.floor(Math.random() * (160 - 70 + 1) + 80)),

    ((x) => ({
        id: 104,
        x: x,
        quest: `Gain ${x} distance in one round with only rocks.`,
        reward: Math.floor(x*.04),
        extraInfo: "Only rocks will spawn while this quest is active.",
        active: false,
        progress: 0,
    }))(Math.floor(Math.random() * (160 - 70 + 1) + 80)),

    ((x) => ({
        id: 105,
        x: x,
        quest: `Gain ${x} distance in one round with only wind cones.`,
        reward: Math.floor(x*.06),
        extraInfo: "Only wind cones will spawn while this quest is active.",
        active: false,
        progress: 0,
    }))(Math.floor(Math.random() * (160 - 70 + 1) + 80)),

    ((x) => ({
        id: 106,
        x: x,
        quest: `Gain ${x} distance in one round with only sleds.`,
        reward: Math.floor(x*.05),
        extraInfo: "Only sleds will spawn while this quest is active.",
        active: false,
        progress: 0,
    }))(Math.floor(Math.random() * (160 - 70 + 1) + 80)),

    ]

}

const quest1Title = document.getElementById("quest1Title");
const quest1Extra = document.getElementById("quest1Extra");
const quest1Reward = document.getElementById("quest1Reward");
const quest1ProgText = document.getElementById("quest1ProgText");
const quest1Button = document.getElementById("quest1ButtonImg");
const quest1ProgFill = document.getElementById("quest1ProgFill");

const quest2Title = document.getElementById("quest2Title");
const quest2Extra = document.getElementById("quest2Extra");
const quest2Reward = document.getElementById("quest2Reward");
const quest2ProgText = document.getElementById("quest2ProgText");
const quest2Button = document.getElementById("quest2ButtonImg");
const quest2ProgFill = document.getElementById("quest2ProgFill");


function rerollQuests() {

    if (config.quest1.active === false && !config.accountName === "loggedOut"){ config[`quest${config.quest1.id}Skipped`] += 1 }
    if (config.quest2.active === false && !config.accountName === "loggedOut"){ config[`quest${config.quest2.id}Skipped`] += 1 }

    if (config.quest1.progress >= config.quest1.x){ UPChange(config.quest1.reward, null); config.quest1.active = false; config[`quest${config.quest1.id}Complete`] += 1; config[`quest${config.quest1.id}Rewards`] += config.quest1.reward }
    if (config.quest2.progress >= config.quest2.x){ UPChange(config.quest2.reward, null); config.quest2.active = false; config[`quest${config.quest2.id}Complete`] += 1; config[`quest${config.quest2.id}Rewards`] += config.quest2.reward }


    generateQuests();
    console.log(possibleQuests);
    console.log(possibleSpecialQuests);

    if (config.quest1.active === false){
        let questType = Math.floor(Math.random() * (100 - 0 + 1) + 0);
        if (questType <= 80){
            let randomQuest = possibleQuests[Math.floor(Math.random() * possibleQuests.length)]
            config.quest1 = randomQuest;
        } else{
            let randomQuest = possibleSpecialQuests[Math.floor(Math.random() * possibleQuests.length)]
            config.quest1 = randomQuest;
        }
        quest1Title.textContent = config.quest1.quest;
        if (config.quest1.extraInfo != null){ quest1Extra.textContent = config.quest1.extraInfo; }
        else{ quest1Extra.textContent = null; }
        quest1Reward.textContent = `Reward: ${config.quest1.reward} UP`;
        quest1ProgText.textContent = `0/${config.quest1.x}`;
        quest1Button.textContent = "\u{2713}"
        quest1Button.style.backgroundColor = "rgb(132, 212, 57)";
        quest1Button.style.borderColor = "rgb(33, 110, 17)";
    }

    generateQuests();
    console.log(possibleQuests);
    console.log(possibleSpecialQuests);

    if (config.quest2.active === false){
        let questType = Math.floor(Math.random() * (100 - 0 + 1) + 0);
        if (questType <= 80){
            let randomQuest = possibleQuests[Math.floor(Math.random() * possibleQuests.length)]
            config.quest2 = randomQuest;
        } else{
            let randomQuest = possibleSpecialQuests[Math.floor(Math.random() * possibleQuests.length)]
            config.quest2 = randomQuest;
        }
        quest2Title.textContent = config.quest2.quest;
        if (config.quest2.extraInfo != null){ quest2Extra.textContent = config.quest2.extraInfo; }
        else{ quest2Extra.textContent = null; }
        quest2Reward.textContent = `Reward: ${config.quest2.reward} UP`;
        quest2ProgText.textContent = `0/${config.quest2.x}`;
        quest2Button.textContent = "\u{2713}"
        quest2Button.style.backgroundColor = "rgb(132, 212, 57)";
        quest2Button.style.borderColor = "rgb(33, 110, 17)";
    }  

    // In one round quests
    if (config.quest1.id === 2 || config.quest1.id === 4 || config.quest1.id === 5 || config.quest1.id === 6 || config.quest1.id === 101 || config.quest1.id === 102 || config.quest1.id === 103 || config.quest1.id === 104 || config.quest1.id === 105 || config.quest1.id === 106){
        config.quest1.progress = 0;
        quest1ProgText.textContent = `${config.quest1.progress}/${config.quest1.x}`
        quest1ProgFill.style.width = (config.quest1.progress/config.quest1.x)*100 + "%";
    }
    if (config.quest2.id === 2 || config.quest2.id === 4 || config.quest2.id === 5 || config.quest2.id === 6 || config.quest2.id === 101 || config.quest2.id === 102 || config.quest2.id === 103 || config.quest2.id === 104 || config.quest2.id === 105 || config.quest2.id === 106){
        config.quest2.progress = 0;
        quest2ProgText.textContent = `${config.quest2.progress}/${config.quest2.x}`
        quest2ProgFill.style.width = (config.quest2.progress/config.quest2.x)*100 + "%";
    }

}
rerollQuests();

quest1Button.addEventListener("click", () => {

    if (config.quest1.active === false){

    config.quest1.active = true;
    quest1Button.src = "Images/Buttons/cancel.png"

    } else if (config.quest1.active === true){

        config.quest1.active = false;
        quest1Button.src = "Images/Buttons/accept.png"

    }
})

quest2Button.addEventListener("click", () => {

    if (config.quest2.active === false){
    config.quest2.active = true;
    quest2Button.src = "Images/Buttons/cancel.png"
    } else if (config.quest2.active === true){
        config.quest2.active = false;
        quest2Button.src = "Images/Buttons/accept.png"
    }
})


