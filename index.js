const colors = ["red", "green", "blue", "yellow", "black", "gray" ,"pink","skyblue","gold","brown"];
let score = 0;
let highScore = 0;
let gameMode = "stop";
let currentGameSpeed = 2;
const gameSpeed = {
  5: 5,
  10: 10,
  15: 15,
  20: 20,
};

let body = document.querySelector("body");
let playBtn = document.getElementById("play");
let resetBtn = document.getElementById("reset");
let playGround = document.getElementById("play-ground");
let scoreText = document.getElementById("score");
let highScoreText = document.getElementById("highScore");

function generateBubble() {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.style.backgroundColor =
    colors[Math.floor(Math.random() * colors.length)];
  bubble.style.left =
    Math.floor(Math.random() * (window.innerWidth - 100)) + "px";

  playGround.appendChild(bubble);
}

function removeAllBubbles() {
  let bubbles = document.getElementsByClassName("bubble");

  for (bubble of bubbles) {
    playGround.removeChild(bubble);
  }

  resetBtn.click();
  resetBtn.click();
  resetBtn.click();
  resetBtn.click();
}

playBtn.addEventListener("click", () => {
  gameMode = "start";
});

resetBtn.addEventListener("click", () => {
  gameMode = "stop";
  scoreText.innerHTML = "Score: " + 0;
  removeAllBubbles();
});

playGround.addEventListener("click", (e) => {
  if (gameMode == "start" && e.target.classList.contains("bubble")) {
    playGround.removeChild(e.target);
    score++;
    scoreText.innerHTML = "Score: " + score;

    if (Object.hasOwn(gameSpeed, score)) {
      currentGameSpeed = gameSpeed[score];
    }
  }
});

// Intervals

// Intervals to move the bubbles downwards
setInterval(() => {
  if (gameMode == "start") {
    let bubbles = document.getElementsByClassName("bubble");
    for (el of bubbles) {
      el.style.top =
        Number(el.style.top.split("px")[0]) + currentGameSpeed + "px";
    }
  }
}, 100);

// Intervals to check the bubble reaches the end and stop the game

setInterval(() => {
  if (gameMode != "end") {
    let bubbles = document.getElementsByClassName("bubble");
    for (el of bubbles) {
      if (Number(el.style.top.split("px")[0]) + 66 >= window.innerHeight) {
        alert("!! Game End !!");
        gameMode = "end";
        highScore = Math.max(score, highScore);
        highScoreText.innerHTML = "High Score: " + highScore;
        scoreText.innerHTML = "Score: " + 0;
        removeAllBubbles();
      }
    }
  }
}, 200);

// intervals to generate bubbles after every 200ml
setInterval(() => {
  if (gameMode == "start") {
    generateBubble();
  }
}, 1200);
