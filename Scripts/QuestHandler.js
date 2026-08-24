import { config } from "./config.js";

const possibleQuests = []

function generateQuests() {
    possibleQuests.push
    ((x) => ({
        x: x,
        quest: `Gain ${x} coins.`,
        reward: `${Math.floor(x*.3)} UP.`,
        extraInfo: null
    }))(Math.floor(Math.random() * (15 - 8 + 1) + 8)),

    ((x) => ({
        x: x,
        quest: `Gain ${x} coins in one round.`,
        reward: `${Math.floor(x*.4)} UP.`,
        extraInfo: null
    }))(Math.floor(Math.random() * (12 - 4 + 1) + 4))
}







