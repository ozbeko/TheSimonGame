// Initialize the first variables.
var gamePattern = [];
var userClickedPattern = [];
var gameStatus = false;
var level = 0;

var buttonColours = ["red", "blue", "green", "yellow"];

// Controls that any keyboard events happened.
$(document).keydown(function(){
  if(gameStatus === false){
    $('h1').text("Level " + level);
    nextSequence();
    gameStatus = true;
  }
});

// Start Button click control.
$('.start-button').click(function(){
  if(gameStatus === false){
    $('h1').text("Level " + level);
    nextSequence();
    gameStatus = true;
  }
});

// Make a new sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $('h1').text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //Select button and make a flash
  $("#" + randomChosenColour).css({opacity: 0});
  $("#" + randomChosenColour).animate({opacity: 1}, 700);

  playSound(randomChosenColour);
}

//Play the audio
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Button click handler
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

//Animate the clicked buttons
function animatePress(currentColour){
  $('.'+ currentColour).addClass("pressed")
  setTimeout(function(){
    $('.'+ currentColour).removeClass("pressed");
  },100);
}

// Check the patterns
function checkAnswer(currentLevel){
//console.log(userClickedPattern + " " + gamePattern);
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      //console.log("success");
      setTimeout(function(){
          nextSequence();
        }, 1000);
    }
  }
  else{
    //console.log("wrong");
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(function(){
      $('body').removeClass('game-over');
    },200);
    $('h1').text('Game Over, Press Any Key to Restart');
    startOver();
  }
}

//Restart the game
function startOver(){
  gamePattern = [];
  gameStatus = false;
  level = 0;
  userClickedPattern = [];
}
