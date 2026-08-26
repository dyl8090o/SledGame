import { config } from "./config.js";

const possibleQuests = []
const possibleSpecialQuests = {}

function generateQuests() {
    possibleQuests.push

    ((x) => ({
        x: x,
        quest: `Gain ${x} coins.`,
        reward: `${Math.floor(x*.3)} UP.`,
        extraInfo: null,
        progress: null
    }))(Math.floor(Math.random() * (15 - 8 + 1) + 8)),

    ((x) => ({
        x: x,
        quest: `Gain ${x} coins in one round.`,
        reward: `${Math.floor(x*.4)} UP.`,
        extraInfo: null,
        progress: null
    }))(Math.floor(Math.random() * (8 - 3 + 1) + 4)),

    ((x) => ({
        x: x,
        quest: `Gain ${x} distance.`,
        reward: `${Math.floor(x*.005)} UP.`,
        extraInfo: null,
        progress: null
    }))(Math.floor(Math.random() * (800 - 300 + 1) + 300)),

    ((x) => ({
        x: x,
        quest: `Gain ${x} distance in one round.`,
        reward: `${Math.floor(x*.02)} UP.`,
        extraInfo: null,
        progress: null
    }))(Math.floor(Math.random() * (160 - 70 + 1) + 80))

    ((x) => ({
        x: x,
        quest: `Gain ${x} distance in one round without taking damage.`,
        reward: `${Math.floor(x*.03)} UP.`,
        extraInfo: null,
        progress: null
    }))(Math.floor(Math.random() * (160 - 70 + 1) + 80))

    ((x) => ({
        x: x,
        quest: `Survive ${x} seconds in one round with one heart.`,
        reward: `${Math.floor(x*.08)} UP.`,
        extraInfo: null,
        progress: null
    }))(Math.floor(Math.random() * (80 - 40 + 1) + 40))






    // NEW SECTION

    possibleSpecialQuests.push

    ((x) => ({
        x: x,
        quest: `Gain ${x} distance in one round in the bottom half of the screen.`,
        reward: `${Math.floor(x*.04)} UP.`,
        extraInfo: "You will have 5 seconds of grace upon round start.",
        progress: null
    }))(Math.floor(Math.random() * (120 - 40 + 1) + 80))

    ((x) => ({
        x: x,
        quest: `Gain ${x} distance in one round in the top half of the screen.`,
        reward: `${Math.floor(x*.05)} UP.`,
        extraInfo: "You will have 5 seconds of grace upon round start.",
        progress: null
    }))(Math.floor(Math.random() * (120 - 40 + 1) + 80))

    ((x) => ({
        x: x,
        quest: `Gain ${x} distance in one round in the middle third of the screen.`,
        reward: `${Math.floor(x*.07)} UP.`,
        extraInfo: "You will have 5 seconds of grace upon round start.",
        progress: null
    }))(Math.floor(Math.random() * (120 - 40 + 1) + 80))





}







