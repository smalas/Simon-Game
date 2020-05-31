var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(".btn").on("click", function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  animatePress(userChosenColor);
  playSound(userChosenColor);

  checkAnswer(level);
});

$(document).on("keypress", function(){
  if(!started){
    $("h1").html("Level "+level);
    nextSequence();
    statrted= true;
  }
});

function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  animatePress(randomChosenColor);
  playSound(randomChosenColor);

  level++;
  $("h1").html("Level "+level);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  //right answer
  // Check if equal
  var equal = true;
  for(i=0; i<=userClickedPattern.length; i++){
    if(userClickedPattern[i]!==gamePattern[i]){
      equal=false;
    }
  }

  if (userClickedPattern.length===gamePattern.length && equal){
    setTimeout(nextSequence, 1000);
    userClickedPattern=[];
  }
  else if(userClickedPattern.length===gamePattern.length && !equal){ //game over
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    playSound("wrong");
    $("h1").html("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  gamePattern = [];
  userClickedPattern=[];
  level = 0;
  started=false;
}
