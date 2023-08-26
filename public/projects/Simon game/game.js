var gamePattern = [];
var soundTrack = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var index = 0;
var started = false;

// Remove h2 and change h1 to show levels
$(document).on("keypress", function () {
  if (!started) {
    $("h1").text("Level " + level);
    $("#level-title").css({ margin: "5%" });
    $("h2").remove();
    nextSequence();
    started = true;
  }
});

// Acknowledge user's click and display sound and color
$(".btn").on("click", function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.trunc(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // console.log(gamePattern);

  levelPattern(gamePattern, 0);
}

function levelPattern(gamePattern, i) {
  // var i = 0;
  if (i < gamePattern.length) {
    $("#" + gamePattern[i])
      .delay(500)
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);
    playSound(gamePattern[i]);

    setTimeout(function () {
      levelPattern(gamePattern, i + 1);
    }, 1000); // Adjust delay time as needed
  }
}

function playSound(color) {
  try {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play().catch((error) => {
      console.error("Audio playback error:", error);
    });
  } catch (error) {
    console.error("Error creating audio object:", error);
  }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    setTimeout(function () {
      $("body").addClass("game-over");
    }, 500);

    $("h1").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
