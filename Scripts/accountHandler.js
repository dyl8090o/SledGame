import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js'
import { getFirestore, doc, setDoc, updateDoc, collection, getDoc, getDocs  } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js';
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
const auth = getAuth(app);

import { config } from "./config.js";
import { coinsChange, UPChange } from "./main.js";
import { upgrades, loadUpgrades } from './upgradeHandler.js';
export { saveData, loadData }

let accountDiv = document.getElementById("accountDiv");
let signUpButton = document.getElementById("signUpButton");
let logInButton = document.getElementById("logInButton");
let userIdentifier = document.getElementById("userIdentifier");
let accountButton = document.getElementById("accountButtonText");
let usernameInput = document.getElementById("usernameInput");
let passwordInput = document.getElementById("passwordInput");
let logOrSign = null;

// EXCLUDING ARRAYS, COINS, UP, QUESTS & JOINDATE //
let storedData = [
    "totalCoins",
    "coinsCollected",
    "livesLost",
    "livesLostToRocks",
    "livesLostToWindCones",
    "livesLostToSleds",

    "quest1Complete",
    "quest1Skipped",
    "quest2Complete",
    "quest2Skipped",
    "quest3Complete",
    "quest3Skipped",
    "quest4Complete",
    "quest4Skipped",
    "quest5Complete",
    "quest5Skipped",
    "quest6Complete",
    "quest6Skipped",

    "quest101Complete",
    "quest101Skipped",
    "quest102Complete",
    "quest102Skipped",
    "quest103Complete",
    "quest103Skipped",
    "quest104Complete",
    "quest104Skipped",
    "quest105Complete",
    "quest105Skipped",
    "quest106Complete",
    "quest106Skipped",

    "quest1Rewards",
    "quest2Rewards",
    "quest3Rewards",
    "quest4Rewards",
    "quest5Rewards",
    "quest6Rewards",

    "quest101Rewards",
    "quest102Rewards",
    "quest103Rewards",
    "quest104Rewards",
    "quest105Rewards",
    "quest106Rewards",

    "extraHeartIUsed",
    "mindReaderUsed",
    "brakeControlIUsed",
    "brakeControlIIUsed",
    "slipperySidesIUsed",
    "slipperySidesIIUsed",
    "extraHeartIIUsed",
    "recoverySpeedIUsed",
    "recoverySpeedIIUsed",
    "magneticSledIUsed",
    "magneticSledIIUsed",
    "goldenTouchIUsed",
    "goldenTouchIIUsed",
    "moreCoinsUsed",
    "betterTurningIUsed",
    "betterTurningIIUsed",
    "disposableBrakesUsed",
    "cardboardShieldUsed",
    "snowballCannonUsed",
    "bigStickUsed",
    "shrinkRayUsed",
    "coinGoblinUsed",
    "strongerBrakesUsed",
    "moreBrakesUsed",
    "thickerCardboardUsed",
    "moreCardboardUsed",
    "spikeyCardboardUsed",
    "moreSnowUsed",
    "compactSnowballUsed",
    "lighterStickUsed",
    "protectiveStickUsed",
    "coinHogUsed",
    "longCoinsUsed",
    "strongerBeamUsed",
    "moreEnergyUsed",
    "batteryPackUsed",

    "disposableBrakesActivated",
    "cardboardShieldActivated",
    "snowballCannonActivated",
    "bigStickActivated",
    "shrinkRayActivated",
    "coinGoblinActivated",

    "totalSession",
    "roundsPlayed",
    "pureRoundsPlayed",

    "timesUPressed",
    "totalAngleRotated",
    "totalHorizontalMovement",
    "totalVerticalMovement",
    "bestDistance",
    "totalDistance",
    "bestTime",
    "totalTime",
    "bestSpeed",
    "totalSpeed",

    "totalPureAngleRotated",
    "totalPureHorizontalMovement",
    "totalPureVerticalMovement",
    "bestPureDistance",
    "totalPureDistance",
    "bestPureTime",
    "totalPureTime",
    "bestPureSpeed",
    "totalPureSpeed",

    "roundsWithHitboxes",

    "roundsWithredArrow",
    "roundsWithgreenArrow",
    "roundsWithblueArrow",
    "roundsWithorangeArrow",
    "roundsWithpurpleArrow",
    "roundsWithredSled",
    "roundsWithgreenSled",
    "roundsWithblueSled",
    "roundsWithgoldSled",
    "roundsWithpurpleSled",
    "roundsWithduckSled",
    "roundsWithsubwaySurfersSled",

    "roundsWithredCircleTrail",
    "roundsWithgreenCircleTrail",
    "roundsWithblueCircleTrail",
    "roundsWithorangeCircleTrail",
    "roundsWithpurpleCircleTrail",
    "roundsWithstarTrail",
    "roundsWithheartTrail",
    "roundsWithduckSledTrail",
]

accountDiv.style.display = "none";
userIdentifier.style.display = "none";

signUpButton.addEventListener("click", function(){
    if (logOrSign === null || logOrSign === "log"){
        logOrSign = "sign";
        accountDiv.style.display = "block";
        accountButton.textContent = "Sign Up";
    } else{
        logOrSign = null;
        accountDiv.style.display = "none";
        accountButton.textContent = "null";
    }
    console.log(`Log or Sign? ${logOrSign}`)
})
logInButton.addEventListener("click", function(){
    if (logOrSign === null || logOrSign === "sign"){
        logOrSign = "log";
        accountDiv.style.display = "block";
        accountButton.textContent = "Log In";
    } else{
        logOrSign = null;
        accountDiv.style.display = "none";
        accountButton.textContent = "null";
    }
    console.log(`Log or Sign? ${logOrSign}`)
})

accountButton.addEventListener("click", function() {
    if(logOrSign === "sign" && usernameInput.value != "" && passwordInput.value != ""){
        signUp(usernameInput.value, passwordInput.value);
        usernameInput.value = "";
        passwordInput.value = "";
    }

    if(logOrSign === "log" && usernameInput.value != "" && passwordInput.value != ""){
        logIn(usernameInput.value, passwordInput.value);
        usernameInput.value = "";
        passwordInput.value = "";
    }
})

async function signUp(username, password){

    try {
        await createUserWithEmailAndPassword(auth, username + "@sledgame.local", password);
        const docRef = doc(db, "accounts", username);
        await setDoc(docRef, {
            active: true,
            inactiveReason: null
        }, { merge: true });
        logIn(username, password)
    } catch (error) {
        if (error.code === "auth/weak-password"){ accountButton.textContent = "Weak Password"; }
        if (error.code === "auth/email-already-in-use"){ accountButton.textContent = "Username Taken"; }
        if (error.code === "auth/invalid-email"){ accountButton.textContent = "Invalid Username"; }
        if (error.code === "auth/network-request-failed"){ accountButton.textContent = "No Connection"; }
    }

}

logIn("loggedOut", "fAkno9SYu4NKBQupZF16ehwQ72VP8")
async function logIn(username, password){
try {
await signInWithEmailAndPassword(auth, username + "@sledgame.local", password);
config.accountName = username;
await loadData();
saveData();
if (username != "loggedOut"){
config.totalSession += 1;
signUpButton.style.display = "none";
logInButton.style.display = "none";
accountDiv.style.display = "none";
userIdentifier.textContent = `Logged in as: ${username}`;
userIdentifier.style.display = "block";
}
} catch (error) {
    console.log(error);
    if (error.code === "auth/invalid-credential"){ accountButton.textContent = "Incorrect Password"; }
        if (error.code === "auth/too-many-requests"){ accountButton.textContent = "Too Many Attempts"; }
        if (error.code === "auth/network-request-failed"){ accountButton.textContent = "No Connection"; }
}}

async function loadData(){
    let username = config.accountName;
    const docRef = doc(db, "accounts", username);
    const docSnap = await getDoc(docRef);
    console.log(`Logged in as ${username}`)

    if (docSnap.exists()){
        let data = docSnap.data();
        let toPopulate = {};
        config.accountName = username;

        if (username != "loggedOut"){
        // Load coins
        if ("coins" in data){
            coinsChange(0, data.coins);
        } else { toPopulate.coins = 0 }

        // Load UP
        if ("UP" in data){
            UPChange(0, data.UP);
        } else { toPopulate.UP = 0 }

        // Load sleds
        if ("sleds" in data){
            config.sleds = [];
            data.sleds.forEach(element => {
                config.sleds.push(element);
                let sled = document.getElementById(element+"Button")
                let sledText = sled.querySelector(".buttonText")
                sled.classList.add("bought")
                sled.classList.add("unequipped")
                sledText.textContent = "Unequipped";
                if (sled.classList.contains("equipped")) { sled.classList.remove("equipped") }
            });
        } else { toPopulate.sleds = [] }

        // Load trails
        if ("trails" in data){
            config.trails = [];
            data.trails.forEach(element => {
                config.trails.push(element);
                let trail = document.getElementById(element+"TrailButton")
                let trailText = trail.querySelector(".buttonText")
                trail.classList.add("bought")
                trail.classList.add("unequipped")
                trailText.textContent = "Unequipped";
                if (trail.classList.contains("equipped")) { trail.classList.remove("equipped") }
            });
        } else { toPopulate.trails = [] }

        // Load boughtUpgrades
        upgrades.forEach(upgrade =>{
            if (upgrade.id != extraHeartI){ upgrade.status = "locked" }
            else { upgrade.status = "unlocked" }
            upgrade.equipped = false;
        })
        if ("boughtUpgrades" in data){
            config.boughtUpgrades = [];
            data.boughtUpgrades.forEach(id => {
                let upgrade = upgrades.find(item => item.id === id);
                upgrade.status = "bought";
                config.boughtUpgrades.push(id)
            });
        } else { toPopulate.boughtUpgrades = [] }

        // Load equippedUpgrades
        if ("equippedUpgrades" in data){
            config.equippedUpgrades = [];
            data.equippedUpgrades.forEach(id => {
                let upgrade = upgrades.find(item => item.id === id);
                upgrade.equipped = true;
                config.equippedUpgrades.push(id)
            });
        } else { toPopulate.equippedUpgrades = [] }
        loadUpgrades();
    
        // Load joinDate
        if ("joinDate" in data){
            config.joinDate = data.joinDate
        } else { toPopulate.joinDate = Date.now() }}

        // Load stored data
        storedData.forEach(field => {
            if (field in data){
            config[field] = data[field]
        } else { toPopulate[field] = 0 }
        })


        // Populate missing values
        if (Object.keys(toPopulate).length > 0) {
            await updateDoc(docRef, toPopulate);
        }
        console.log(config.boughtUpgrades)
    }
}

async function saveData() {
    if (config.accountName === null) return;
    const docRef = doc(db, "accounts", config.accountName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()){
        let updates = {};
        if (config.accountName != "loggedOut"){
        updates = {
            coins: config.coins,
            UP: config.UP,
            sleds: config.sleds,
            trails: config.trails,
            equippedUpgrades: config.equippedUpgrades,
            boughtUpgrades: config.boughtUpgrades,
        }}
        
        storedData.forEach(field => {
            updates[field] = config[field]
        })

        await updateDoc(docRef, updates)

    }

}

// getTotalStat();
async function getTotalStat() {
    const snapshot = await getDocs(collection(db, "accounts"));
    let stat = "coinsCollected"
    let total = 0;
    snapshot.forEach(docSnap => {
        let data = docSnap.data();
        if (stat in data && config.accountName != "loggedOut" || stat in data && config.accountName != "dyl8090oDev") {
            total += data[stat];
        }
    });
    console.log(total);
}




/*
async function purifyData(){
    config.accountName = "thatonelermis"
    loadData();

    let username = config.accountName;
    const docRef = doc(db, "accounts", username);
    const docSnap = await getDoc(docRef);
    console.log(`Purifying ${username}`)

    if (docSnap.exists()){
        let data = docSnap.data();
        config.accountName = username;

        if (data.bestDistance != 0){
            await updateDoc(docRef, { bestPureDistance: data.bestDistance, bestDistance: 0})
        }

        if (data.bestSpeed != 0){
            await updateDoc(docRef, { bestPureSpeed: data.bestSpeed, bestSpeed: 0})
        }

        if (data.bestTime != 0){
            await updateDoc(docRef, { bestPureTime: data.bestTime, bestTime: 0})
        }

        if (data.totalDistance != 0){
            await updateDoc(docRef, { totalPureDistance: data.totalDistance, totalDistance: 0})
        }

        if (data.totalSpeed != 0){
            await updateDoc(docRef, { totalPureSpeed: data.totalSpeed, totalSpeed: 0})
        }

        if (data.totalTime != 0){
            await updateDoc(docRef, { totalPureTime: data.totalTime, totalTime: 0})
        }

        if (data.totalAngleRotated != 0){
            await updateDoc(docRef, { totalPureAngleRotated: data.totalAngleRotated, totalAngleRotated: 0})
        }

        if (data.totalHorizontalMovement != 0){
            await updateDoc(docRef, { totalPureHorizontalMovement: data.totalHorizontalMovement, totalHorizontalMovement: 0})
        }

        if (data.totalVerticalMovement != 0){
            await updateDoc(docRef, { totalPureVerticalMovement: data.totalVerticalMovement, totalVerticalMovement: 0})
        }
    }
}
purifyData();
*/