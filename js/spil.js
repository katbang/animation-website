window.addEventListener("load", sidenVises);
window.addEventListener("resize", windowResize);
window.addEventListener("load", windowResize);
let points;
let liv;

function windowResize() {
  console.log("windowResize");
  let widthScreen = document.querySelector("#screen").clientWidth;
  let myFontInPercent1 = 3;
  let myFont1 = (widthScreen / 100) * myFontInPercent1;
  document.querySelector("#antal_liv").style.fontSize = myFont1 + "px";
  document.querySelector("#antal_points").style.fontSize = myFont1 + "px";
  let myFontInPercent3 = 5;
  let myFont3 = (widthScreen / 100) * myFontInPercent3;
  document.querySelector("#lvl_complete_tekst").style.fontSize = myFont3 + "px";
}

function hideAll() {
  document.querySelector("#game_over").classList.add("skjul");
  document.querySelector("#level_complete").classList.add("skjul");
  document.querySelector("#start").classList.add("skjul");
  document.querySelector("#infoskærm").classList.add("skjul");
}

function sidenVises() {
  console.log("funktionen sidenVises");
  hideAll();
  document.querySelector("#start").classList.remove("skjul");

  document.querySelector("#start_knap").addEventListener("click", startSpillet);
  document.querySelector("#how_to").addEventListener("click", infoSkærm);
}

function infoSkærm() {
  console.log("funktionen infoSkærm");
  document.querySelector("#infoskærm").classList.remove("skjul");
  document
    .querySelector("#start_knap2")
    .addEventListener("click", startSpillet);
}

function printLiv() {
  console.log("funktion printLiv");
  document.querySelector("#antal_liv").textContent = liv;
}

function printPoints() {
  console.log("funktion printPoints");
  document.querySelector("#antal_points").textContent = points;
}

function addPoints() {
  points = points + 1;
}

function mistLiv() {
  liv = liv - 1;
}

function startSpillet() {
  console.log("funktionen startSpillet");
  hideAll();
  let rndNum1 = generateRandomNumber1();
  let rndNum2 = generateRandomNumber2();
  let rndNum3 = generateRandomNumber3();
  document.querySelector("#bg_sound").volume = 0.9;
  document.querySelector("#bg_sound").play();

  document
    .querySelector("#dream_container1")
    .classList.add("appear", "pointer");
  document.querySelector("#dream_container1").classList.add("pos" + rndNum1);
  document
    .querySelector("#dream_container2")
    .classList.add("appear", "pointer");
  document.querySelector("#dream_container2").classList.add("pos" + rndNum1);
  document
    .querySelector("#ondkarakter1_container")
    .classList.add("appear", "pointer");
  document
    .querySelector("#ondkarakter1_container")
    .classList.add("pos" + rndNum2);
  document
    .querySelector("#ondkarakter2_container")
    .classList.add("appear", "pointer");
  document
    .querySelector("#ondkarakter2_container")
    .classList.add("pos" + rndNum3);
  document
    .querySelector("#dream_container1")
    .addEventListener("animationend", restartDream);
  document
    .querySelector("#dream_container2")
    .addEventListener("animationend", restartDream);
  document
    .querySelector("#ondkarakter1_container")
    .addEventListener("animationend", restartOnd);
  document
    .querySelector("#ondkarakter2_container")
    .addEventListener("animationend", restartOnd);
  document
    .querySelector("#dream_container1")
    .addEventListener("mousedown", clickDream);
  document
    .querySelector("#dream_container2")
    .addEventListener("mousedown", clickDream);
  document
    .querySelector("#ondkarakter1_container")
    .addEventListener("mousedown", clickOnd);
  document
    .querySelector("#ondkarakter2_container")
    .addEventListener("mousedown", clickOnd);

  console.log("tiden er startet");
  document.querySelector("#tid_sprite").classList.add("shrink");
  document
    .querySelector("#tid_sprite")
    .addEventListener("animationend", stopSpillet);
  liv = 3;
  points = 0;
  printLiv();
  printPoints();
}

function generateRandomNumber1() {
  return Math.floor(Math.random() * 9) + 1;
}
function generateRandomNumber2() {
  return Math.floor(Math.random() * 9) + 1;
}
function generateRandomNumber3() {
  return Math.floor(Math.random() * 9) + 1;
}

function clickDream() {
  console.log("funktionen clickDream");
  console.log(this.getAttribute("id"));
  this.removeEventListener("mousedown", clickDream);
  this.classList.add("tilt");
  this.firstElementChild.classList.add("disappear");
  this.addEventListener("animationend", restartDream);
  document.querySelector("#dream_sound").currentTime = 0;
  document.querySelector("#dream_sound").volume = 0.9;
  document.querySelector("#dream_sound").play();
  addPoints();
  printPoints();
}

function clickOnd() {
  console.log("funktionen clickOnd");
  console.log(this.getAttribute("id"));
  document;
  this.removeEventListener("mousedown", clickOnd);
  this.classList.add("darken");
  this.firstElementChild.classList.add("disappear");
  this.addEventListener("animationend", restartOnd);
  document.querySelector("#ond_sound").currentTime = 0;
  document.querySelector("#ond_sound").volume = 0.9;
  document.querySelector("#ond_sound").play();
  mistLiv();
  printLiv();
  if (liv === 0) {
    stopSpillet();
  }
}
function restartDream() {
  console.log("funktionen restartDream");
  this.classList = "";
  this.firstElementChild.classList = "";
  this.offsetHeight;
  let rndNum1 = generateRandomNumber1();
  this.classList.add("appear", "pointer");
  this.classList.add("pos" + rndNum1);
  this.addEventListener("mousedown", clickDream);
}
function restartOnd() {
  console.log("funktionen restartOnd");
  this.classList = "";
  this.firstElementChild.classList = "";
  this.offsetHeight;
  let rndNum2 = generateRandomNumber2();
  document;
  this.classList.add("appear", "pointer");
  document;
  this.classList.add("pos" + rndNum2);
  this.addEventListener("mousedown", clickOnd);
}

function stopSpillet() {
  console.log("funktion stopSpillet");
  document.querySelector("#bg_sound").pause();
  document.querySelector("#bg_sound").currentTime = 0;
  document.querySelector("#tid_container").classList = "";
  document.querySelector("#tid_sprite").classList = "";
  document.querySelector("#ondkarakter1_container").classList = "";
  document.querySelector("#ondkarakter1_sprite").classList = "";
  document.querySelector("#ondkarakter2_container").classList = "";
  document.querySelector("#ondkarakter2_sprite").classList = "";
  document.querySelector("#dream_container1").classList = "";
  document.querySelector("#dream_sprite1").classList = "";
  document.querySelector("#dream_container2").classList = "";
  document.querySelector("#dream_sprite2").classList = "";
  if (liv === 0) {
    gameOver();
  } else if (points < 25) {
    gameOver();
  } else if (points >= 25) {
    levelComplete();
  }
}
function gameOver() {
  console.log("funktion gameOver");
  document.querySelector("#tid_sprite").classList = "";
  document.querySelector("#game_over").classList.remove("skjul");
  document
    .querySelector("#spil_igen2")
    .addEventListener("mousedown", startSpillet);
}
function levelComplete() {
  console.log("funktion levelComplete");
  document.querySelector("#tid_sprite").classList = "";
  document.querySelector("#level_complete").classList.remove("skjul");
  document
    .querySelector("#spil_igen1")
    .addEventListener("mousedown", startSpillet);
  document.querySelector("#points").textContent = points;
}
