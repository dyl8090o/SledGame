import { config } from "./config.js";
import { coinsChange, gameStateChange, scoreChange } from "./main.js";
export { heartUpdate }

let playButton = document.getElementById("playButton")
playButton.addEventListener( "click", function() {
    gameStateChange("game");
});

let menuButton = document.getElementById("gameOverMenuButton")
menuButton.addEventListener( "click", function() {
    gameStateChange("mainMenu");
});

let shopButton = document.getElementById("shopButton")
shopButton.addEventListener( "click", function() {
    gameStateChange("shop");
});

let shopMainMenuButton = document.getElementById("shopMainMenuButton")
shopMainMenuButton.addEventListener( "click", function() {
    gameStateChange("mainMenu");
});

//let freeCoin = document.getElementById("freeCoin")
//freeCoin.addEventListener( "click", function() {
//    coinsChange(1, null)
//});

function heartUpdate(setHearts, changeBy){
    let heart1 = document.getElementById("heart1");
    let heart2 = document.getElementById("heart2")

    if(setHearts != null){
        config.lives = setHearts;
    } else{
        config.lives += changeBy;
    }

    if(config.lives === 0){
        gameStateChange("gameOver");
    } else if(config.lives === 1){
        heart1.src = "Images/Heart.png"
        heart2.src = "Images/BrokenHeart.png"
    } else if(config.lives === 2){
        heart1.src = "Images/Heart.png"
        heart2.src = "Images/Heart.png"
    }
}