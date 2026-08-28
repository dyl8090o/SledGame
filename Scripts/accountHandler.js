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
import { coinsChange } from "./main.js";
export { saveData, loadData }

let accountDiv = document.getElementById("accountDiv");
let signUpButton = document.getElementById("signUpButton");
let logInButton = document.getElementById("logInButton");
let userIdentifier = document.getElementById("userIdentifier");
let accountButton = document.getElementById("accountButton");
let usernameInput = document.getElementById("usernameInput");
let passwordInput = document.getElementById("passwordInput");
let logOrSign = null;

// EXCLUDING ARRAYS, COINS, & JOINDATE //
let storedData = [
    "coinsCollected",
    "totalCoins",
    "livesLost",
    "livesLostToRocks",
    "livesLostToWindCones",
    "livesLostToSleds",
    "questsComplete",
    "questsSkipped",
    "totalSession",
    "roundsPlayed",
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
loadData();
config.totalSession += 1;
saveData();
if (username != "loggedOut"){
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

        // Load sleds
        if ("sleds" in data){
            config.sleds = [];
            data.sleds.forEach(element => {
                config.sleds.push(element);
                let sled = document.getElementById(element+"Button")
                sled.classList.add("bought")
                sled.classList.add("unequipped")
                sled.textContent = "Unequipped";
                if (sled.classList.contains("equipped")) { sled.classList.remove("equipped") }
            });
        } else { toPopulate.sleds = [] }

        // Load trails
        if ("trails" in data){
            config.trails = [];
            data.trails.forEach(element => {
                config.trails.push(element);
                let trail = document.getElementById(element+"TrailButton")
                trail.classList.add("bought")
                trail.classList.add("unequipped")
                trail.textContent = "Unequipped";
                if (trail.classList.contains("equipped")) { trail.classList.remove("equipped") }
            });
        } else { toPopulate.trails = [] }
    
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
            sleds: config.sleds,
            trails: config.trails,
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
        if (stat in data) {
            total += data[stat];
        }
    });
    console.log(total);
}