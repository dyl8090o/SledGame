import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js'
import { getFirestore, doc, setDoc, collection  } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyDw4yRbrAtMjdlY2l1MUWFKJsaMp83w6fU",
  authDomain: "sled-game.firebaseapp.com",
  projectId: "sled-game",
  storageBucket: "sled-game.firebasestorage.app",
  messagingSenderId: "319102855342",
  appId: "1:319102855342:web:7d8f1936cbf51bf70a253f"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

let feedbackButton = document.getElementById("feedbackButton")
feedbackButton.addEventListener( "click", function() {
    gameStateChange("feedback");
});

let feedbackMainMenuButton = document.getElementById("feedbackMainMenuButton")
feedbackMainMenuButton.addEventListener( "click", function() {
    gameStateChange("mainMenu");
});

let feedbackSubmitButton = document.getElementById("feedbackSubmit")
feedbackSubmitButton.addEventListener( "click", function(){
    let feedbackInput = document.getElementById("feedbackInput")
    let feedback = feedbackInput.value;
    feedbackInput.value = "";
    if (feedback != ""){
        setDoc(doc(db, "feedback", Date()), {Feedback: feedback})
    }
})
/* Free Coin Debug Button */
let freeCoin = document.getElementById("freeCoin")
freeCoin.addEventListener( "click", function() {
    coinsChange(1, null)
});


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
        heart1.src = "Images/heart.png"
        heart2.src = "Images/BrokenHeart.png"
    } else if(config.lives === 2){
        heart1.src = "Images/heart.png"
        heart2.src = "Images/heart.png"
    }
}