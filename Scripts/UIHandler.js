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

const animatedImages = [
    {element: document.createElement("video"), name: "heart"},
    {element: document.createElement("video"), name: "brokenHeart"},
    {element: document.createElement("video"), name: "emptyHeart"},
]

const heart = animatedImages[0].element;
const brokenHeart = animatedImages[1].element;
const emptyHeart = animatedImages[2].element;


animatedImages.forEach(image => {
    let video = image.element
    video.src = `Images/${image.name}.webm`;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.preload = "auto";
    video.play()
})

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

let logsButton = document.getElementById("logsButton")
logsButton.addEventListener( "click", function() {
    gameStateChange("logs");
});

let logsMainMenuButton = document.getElementById("logsMainMenuButton")
logsMainMenuButton.addEventListener( "click", function() {
    gameStateChange("mainMenu");
});

let upgradesButton = document.getElementById("upgradesButton")
upgradesButton.addEventListener( "click", function() {
    gameStateChange("upgrades");
});

let upgradesMainMenuButton = document.getElementById("upgradesMainMenuButton")
upgradesMainMenuButton.addEventListener( "click", function() {
    gameStateChange("mainMenu");
});

/* Free Coin Debug Button 
let freeCoin = document.getElementById("freeCoin")
freeCoin.addEventListener( "click", function() {
    coinsChange(1, null)
});
*/

function heartUpdate(setHearts, changeBy){
    let heart1 = document.getElementById("heart1");
    let heart2 = document.getElementById("heart2")
    let heart3 = document.getElementById("heart3")

    if(setHearts != null){
        config.lives = setHearts;
    } else{
        config.lives += changeBy;
    }

    if(config.lives === 0){
        console.log(`Time: ${config.roundTime}`)
        gameStateChange("gameOver");
    } else if(config.lives === 1){
        heart1.src = heart.src;
        heart2.src = brokenHeart.src
        heart3.src = brokenHeart.src
    } else if(config.lives === 2){
        heart1.src = heart.src
        heart2.src = heart.src
        heart3.src = brokenHeart.src
    } else if(config.lives === 3){
        heart1.src = heart.src
        heart2.src = heart.src
        heart3.src = heart.src
    }

    if (config.hearts === 1){ heart2.src = emptyHeart.src; heart3.src = emptyHeart.src; }
    if (config.hearts === 2){ heart3.src = emptyHeart.src; }
    heart1.load();
    heart1.play();
    heart2.load();
    heart2.play();
    heart3.load();
    heart3.play();
    heart1.loop = true;
    heart2.loop = true;
    heart3.loop = true;
}

setInterval(() => {
    checkVersion();
}, 5000);

let versionIdentifier = document.getElementById("versionIdentifier");
let versionNumber = null;
let gameDisabled = false;
let disabledVersions = [];
checkVersion();
async function checkVersion() {
    let docRef = doc(db, "version", "version");
    let docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        versionNumber = docSnap.data().number;
        gameDisabled = docSnap.data().disabled;
        
        disabledVersions = docSnap.data().disabledVersions
        if (disabledVersions.includes(config.version)){ gameDisabled = true }
        let minVersion = docSnap.data().minVersion
        if (minVersion > config.version){ gameDisabled = true }
    }

    // console.log(`version: ${config.version} | Firebase version: ${versionNumber}`)
    // console.log(`Document exists: ${docSnap.exists()} | Document data: ${docSnap.data().number}`)

    if (config.version === versionNumber){
        versionIdentifier.textContent = `V.${config.version}, Up to date.`
    } else if (config.version < versionNumber){
        versionIdentifier.textContent = `V.${config.version}, Out of date, refresh to update.`
    } else if (config.version > versionNumber){
        versionIdentifier.textContent = `V.${config.version}, Version mismatch, please inform dyl8090o.`
    } if (gameDisabled === true) { console.log(`Game disabled!`); gameStateChange("disabled") }
}

