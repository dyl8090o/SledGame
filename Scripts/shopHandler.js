import { config } from "./config.js";
import { coinsChange, scoreChange } from "./main.js";

const everySledButton = document.querySelectorAll(".sledButton");
console.log(everySledButton)
const everyTrailButton = document.querySelectorAll(".trailButton");
console.log(everyTrailButton)

document.getElementById("redArrowButton").classList.add("bought");

let sledDiv = document.getElementById("sledDiv");
let trailDiv = document.getElementById("trailDiv");

changeSled("redArrow");
function changeSled(sled){
    let allSledButtons = document.querySelectorAll(".itemButton.sledButton.bought");
    allSledButtons.forEach(button => {
        button.classList.add("unequipped");
        button.classList.remove("equipped");
        button.textContent = "Unequipped";
    })

    console.log(sled)
    let sledButton = document.getElementById(sled+"Button");
    config.usedSled = (`Images/${sled}.png`);
    sledButton.classList.remove("unequipped");
    sledButton.classList.add("equipped");
    sledButton.textContent = "Equipped";
}

function changeTrail(trail){
    let allTrailButtons = document.querySelectorAll(".itemButton.trailButton.bought");
    allTrailButtons.forEach(button => {
        button.classList.add("unequipped");
        button.classList.remove("equipped");
        button.textContent = "Unequipped";
    })

    console.log(trail)
    let trailButton = document.getElementById(trail+"TrailButton");
     console.log(trailButton)
    if(`Images/${trail}.png` === config.usedTrail){
        config.usedTrail = "none";
        trailButton.classList.add("unequipped");
        trailButton.classList.remove("equipped");
        trailButton.textContent = "Unequipped";
    } else {
    config.usedTrail = (`Images/${trail}.png`);
    trailButton.classList.remove("unequipped");
    trailButton.classList.add("equipped");
    trailButton.textContent = "Equipped";
    }
}

document.addEventListener("DOMContentLoaded", function() {

    sledDiv.style.display = "block";
    trailDiv.style.display = "none";

    everySledButton.forEach(button => {
        let itemName = button.id.replace("Button", "")
        let itemCost = config[itemName + "Cost"];
        // console.log(`Button ID: ${button.id} | Item Name: ${itemName} | Item Cost: i${itemCost}`);
        button.addEventListener("click", (event) => {

            console.log("Buy Button Clicked")
            if (button.classList.contains("bought") === false && config.coins >= itemCost){
                button.classList.add("bought");
                coinsChange(-itemCost, null);
                changeSled(button.id.replace("Button", ""))
            } else if (button.classList.contains("bought")){
                changeSled(button.id.replace("Button", ""));
            }

        })
    })

    everyTrailButton.forEach(button => {
        let itemName = button.id.replace("Button", "")
        let itemCost = config[itemName + "Cost"];
         console.log(`Button ID: ${button.id} | Item Name: ${itemName} | Item Cost: i${itemCost}`);
        button.addEventListener("click", (event) => {

            console.log("Buy Button Clicked")
            if (button.classList.contains("bought") === false && config.coins >= itemCost){
                button.classList.add("bought");
                coinsChange(-itemCost, null);
                changeTrail(button.id.replace("TrailButton", ""))
            } else if (button.classList.contains("bought")){
                changeTrail(button.id.replace("TrailButton", ""));
            }

        })
    })

})

let sledButton = document.getElementById("sledButton")
sledButton.addEventListener( "click", function() {
    sledDiv.style.display = "block";
    trailDiv.style.display = "none";
})

let trailButton = document.getElementById("trailButton")
trailButton.addEventListener( "click", function() {
    sledDiv.style.display = "none";
    trailDiv.style.display = "block";
})
