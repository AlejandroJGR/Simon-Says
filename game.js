$(document).ready(function () {
  let buttonColours = ["red", "yellow", "green", "blue"];
  let gamePattern = [];
  let userCLickedPattern = [];
  let started = false;
  let level = 0;
  //ale
  $(document).on("keypress", function () {
    if (!started) {
      $("#level-title").text("Level" + level);
      nextSequence();
      started = true;
    }
  });
  $(".btn").on("click", function () {
    let userChosenColour = $(this).attr("id");
    userCLickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    clickedButton(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    console.log("user:", userCLickedPattern);
  });
  function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userCLickedPattern[currentLevel]) {
      console.log("yey");
      if (userCLickedPattern.length === gamePattern.length) {
        console.log("game patt:", gamePattern);
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      console.log("Nay");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      $("h1").html("Game Over! Press any key to continue");
      startOver();
    }
  }
  function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").html("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    console.log("rand color:", randomChosenColour);
    gamePattern.push(randomChosenColour);
    console.log("new seq: ", gamePattern);
    $("#" + randomChosenColour)
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);
    playSound(randomChosenColour);
  }
  function clickedButton(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

  function playSound(name) {
    const audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }
  function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
});
