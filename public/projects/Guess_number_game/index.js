"use strict";
let num = Math.trunc(Math.random() * 20) + 1;
let score = 20;

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

function guessHandler() {
  const userInput = Number(document.querySelector(".guess").value);
  document.querySelector(".guess").value = "";
  console.log(userInput);
  console.log("initial score: " + score);

  if (userInput > 20 || userInput < 1 || !userInput) {
    displayMessage("⛔️ Number not in range!");
  } else if (score > 0) {
    if (num === userInput) {
      document.querySelector(".number").textContent = num;
      displayMessage("🎉 Correct Number!");
      document.querySelector("body").style.backgroundColor = "green";
      document.querySelector(".number").style.padding = "0rem 6rem";
      if (score > Number(document.querySelector(".highscore").textContent)) {
        document.querySelector(".highscore").textContent = score;
      }
      // When user input does not match with num
    } else if (userInput !== num) {
      if (score > 1) {
        displayMessage(userInput > num ? "📈 Too high!!" : "📈 Too low!!");
        score--;
        document.querySelector(".score").textContent = score;
        console.log("new score: " + score);
      } else {
        displayMessage("💥 You lost the game!");
        document.querySelector("body").style.backgroundColor = "red";
      }
    }
  }
  console.log("initial score: " + score);
}

document.querySelector(".check").addEventListener("click", guessHandler);
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    guessHandler();
  }
});

document.querySelector(".again").addEventListener("click", function () {
  // document.querySelector(".highscore").textContent = score;
  score = 20;
  displayMessage("Start guessing...");
  document.querySelector(".score").textContent = score;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
  document.querySelector("body").style.backgroundColor = "rgb(40, 37, 37)";
  document.querySelector(".number").style.padding = "0rem 3rem";
  num = Math.trunc(Math.random() * 20) + 1;
});
