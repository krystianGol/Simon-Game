var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var levelValue = 0;
var clickCounter = 0;
var gameOver = false;


function nextSequence() {
    levelValue += 1;
    userClickedPattern = [];
    clickCounter = 0;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);


    $("h1").text("Remember Pattern");

    setTimeout(function () {
        for (let i = 0; i < gamePattern.length; i++) {
            setTimeout(function () {
                $("#" + gamePattern[i]).fadeOut(100).fadeIn(100);
                playSound(gamePattern[i]);
                if (i === gamePattern.length - 1) {
                    setTimeout(function () {
                        $("h1").text("Level " + levelValue);
                    }, 800);
                }
            }, i * 500);
        }
    }, 500)

}


function playSound(name) {
    var audioPathName = "sounds/" + name + ".mp3";
    var audio = new Audio(audioPathName);
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}

function checkAnswer() {
    for (var i = 0; i < levelValue; i++) {
        if (gamePattern[i] !== userClickedPattern[i]) {
            return false;
        }
    }
    return true;
}

function startOver() {
    gamePattern = [];
    levelValue = 0;
    gameOver = false;
}

$(document).keypress(function (event) {
    if (event.key === "a" && levelValue == 0) {
        nextSequence();
    }
})

$(document).keypress(function () {
    if (gameOver === true) {
        startOver();
        nextSequence();
    }
})


$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    clickCounter += 1;

    if (clickCounter == levelValue) {
        if (checkAnswer() === true) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        } else {
            var audioPathName = "sounds/wrong.mp3";
            var audio = new Audio(audioPathName);
            audio.play();

            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);

            $("h1").text("Game Over, Press Any Key to Restart");

            gameOver = true;
        }
    }
})



