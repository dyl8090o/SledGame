import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js'
import { getFirestore, doc, setDoc, collection, getDoc  } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";
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
import { coinsChange, gameStateChange, distanceChange } from "./main.js";
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
    let feedbackUserInput = document.getElementById("feedbackInputUser")
    let feedbackUser = feedbackUserInput.value;
    feedbackInput.value = "";
    if (feedback != ""){
        setDoc(doc(db, "feedback", Date()), {Feedback: feedback, User: feedbackUser, accountName: config.accountName})
    }
})



/* Free Coin Debug Button 
let freeCoin = document.getElementById("freeCoin")
freeCoin.addEventListener( "click", function() {
    coinsChange(1, null)
});
*/

function heartUpdate(setHearts, changeBy){
    let heart1 = document.getElementById("heart1");
    let heart2 = document.getElementById("heart2")

    if(setHearts != null){
        config.lives = setHearts;
    } else{
        config.lives += changeBy;
    }

    if(config.lives === 0){
        console.log(`Time: ${config.roundTime}`)
        gameStateChange("gameOver");
    } else if(config.lives === 1){
        heart1.src = "Images/heart.png"
        heart2.src = "Images/BrokenHeart.png"   
    } else if(config.lives === 2){
        heart1.src = "Images/heart.png"
        heart2.src = "Images/heart.png"
    }
}

setInterval(() => {
    checkVersion();
}, 5000);

let versionIdentifier = document.getElementById("versionIdentifier");
let versionNumber = null;
let gameDisabled = false;
checkVersion();
async function checkVersion() {
    let docRef = doc(db, "version", "version");
    let docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        versionNumber = docSnap.data().number;
        gameDisabled = docSnap.data().disabled;
    }

    // console.log(`version: ${config.version} | Firebase version: ${versionNumber}`)
    // console.log(`Document exists: ${docSnap.exists()} | Document data: ${docSnap.data().number}`)

    if (config.version === versionNumber){
        versionIdentifier.textContent = `V.${config.version}, Up to date.`
    } else if (config.version < versionNumber){
        versionIdentifier.textContent = `V.${config.version}, Out of date, refresh to update.`
    } else if (config.version > versionNumber){
        versionIdentifier.textContent = `V.${config.version}, Version mismatch, please inform dyl8090o.`
    } if (config.version === 24 || gameDisabled === true) { console.log(`Game disabled!`); gameStateChange("disabled") }
}

