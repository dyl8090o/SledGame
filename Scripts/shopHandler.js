import { config } from "./config.js";
import { coinsChange, scoreChange } from "./main.js";

const everyItemButton = document.querySelectorAll(".itemButton");
console.log(everyItemButton)
document.getElementById("redArrowButton").classList.add("bought");

changeSled("redArrow");
function changeSled(sled){
    let allSledButtons = document.querySelectorAll(".itemButton.bought");
    allSledButtons.forEach(button => {
        button.classList.add("unequipped");
        button.classList.remove("equipped");
        button.textContent = "Unequipped";
    })

    console.log(sled)
    let sledButton = document.getElementById(sled+"Button");
    config.usedSled = ("Images/"+sled+".png");
    sledButton.classList.remove("unequipped");
    sledButton.classList.add("equipped");
    sledButton.textContent = "Equipped";
}

document.addEventListener("DOMContentLoaded", function() {

    everyItemButton.forEach(button => {
        button.addEventListener("click", (event) => {
            console.log("Buy Button Clicked")
            if (button.classList.contains("bought") === false && config.coins >= 5){
                button.classList.add("bought");
                coinsChange(-5, null);
                changeSled(button.id.replace("Button", ""))
            } else if (button.classList.contains("bought")){
                changeSled(button.id.replace("Button", ""));
            }

        })
    })

})
