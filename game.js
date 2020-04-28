var buttonColors = ["red", "blue", "green", "yellow"];
var game_pattern = [];
var game_level = 0;
var user_clicked_pattern = [];
var user_entries = 0;
var game_started = false;
var game_over = false;

// update the title
function updateTitle(new_title) {
    console.log("will update title to ", new_title);
    $("#level-title").text(new_title);
}

// play the sound corresponding to the button that was clicked
function playSound(pressed_button) {
    var audio_for_button = new Audio("sounds/" + pressed_button + ".mp3");
    audio_for_button.play();
}

// called when a new color is generated in the sequence, or the user clicks a button
function buttonPressed(pressed_button) {
    $("#" + pressed_button).addClass("pressed");
    playSound(pressed_button);
    setTimeout(function() {
        $("#" + pressed_button).removeClass("pressed");
    }, 150);
}

// generate the next color in the sequence
function nextSequence() {
    var randNum = Math.floor(Math.random() * 4);
    var pressed_button = buttonColors[randNum];
    game_pattern.push(pressed_button);
    console.log(game_pattern);
    buttonPressed(pressed_button);
    game_level++;
    updateTitle("Level " + (game_level));
}

// return page to normal background, once user gets the sequence wrong
function resetPage(params) {
    console.log("reseting background");
    $("body").removeClass("game-over");
    game_over = true;
}

// once the user gets the sequence wrong
function gameOver() {
    $("body").addClass("game-over");
    updateTitle("Game Over, Press Any Key to Restart");
    disableButtonEvent();
    setTimeout(function() {
        resetPage();
    }, 200);
}

// check answer once the user has clicked the color buttons
function checkAnswer(pressed_button) {
    if (pressed_button == game_pattern[user_entries]) {
        //console.log("done with ", user_entries);
    } else {
        //console.log("failed on ", user_entries);
        gameOver();
    }
    user_entries++;
    if (user_entries == game_level) {
        user_entries = 0;
        setTimeout(function() {
            nextSequence();
        }, 1000);
    }
}

function enableButtonEvent(params) {
    $(".btn").attr("disabled", "facel").on("click", false);
}

function disableButtonEvent(params) {
    $(".btn").attr("disabled", "true").off("click");
}

// user clicking one of the color buttons
$(".btn").click(function(e) {
    var pressed_button = $(this).attr("id");
    buttonPressed(pressed_button);
    checkAnswer(pressed_button);
});

// start new game
function startGame() {
    console.log("key press detected");
    if (game_over) {
        location.reload();
        game_pattern = [];
        game_level = 0;
        user_clicked_pattern = [];
        user_entries = 0;
        game_started = false;
        game_over = false;
    } else {
        enableButtonEvent();
        nextSequence();
    }
}

// user clicking any key on the keyboard
$(document).keydown(function(e) {
    if (!game_started) {
        game_started = true;
        enableButtonEvent();
    }
    startGame();
});