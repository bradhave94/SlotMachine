var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var turn = 0;
var playerBet = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult;
var fruits = "";
var winRatio = 0;
var grapes = 0;
var bananas = 0;
var oranges = 0;
var cherries = 0;
var bars = 0;
var bells = 0;
var sevens = 0;
var blanks = 0;

var stage = new createjs.Stage(document.getElementById("canvas"));

var image = new createjs.Bitmap("../images/SlotMachine.png");
var reset = new createjs.Bitmap("../images/reset.png");
var betOne = new createjs.Bitmap("../images/betOne.png");
var betMax = new createjs.Bitmap("../images/betMax.png");
var spin = new createjs.Bitmap("../images/spin.png");
var resetGloss = new createjs.Bitmap("../images/resetGloss.png");
var betOneGloss = new createjs.Bitmap("../images/betOneGloss.png");
var betMaxGloss = new createjs.Bitmap("../images/betMaxGloss.png");
var spinGloss = new createjs.Bitmap("../images/spinGloss.png");
var closeButton = new createjs.Bitmap("../images/closeButton.png");
var closeButtonGloss = new createjs.Bitmap("../images/closeButtonGloss.png");

var timer = 0;
var resetClicked = false;
var betOneClicked = false;
var betMaxClicked = false;
var spinClicked = false;
var closeButtonClicked = false;

function init() {
    createjs.Ticker.setFPS(60);
    stage.enableMouseOver(20);

    stage.addChild(image);
    stage.addChild(reset);
    reset.x = 160;
    reset.y = 608;
    stage.addChild(betOne);
    betOne.x = 259;
    betOne.y = 608;
    stage.addChild(betMax);
    betMax.x = 350;
    betMax.y = 608;
    stage.addChild(spin);
    spin.x = 438;
    spin.y = 594;
    stage.addChild(closeButton);
    closeButton.x = 112;
    closeButton.y = 779;

    stage.update();

    createjs.Ticker.addEventListener("tick", handleTick);

    reset.addEventListener("mouseover", function () {
        reset.alpha = 0.5;
        stage.update();
    });
    reset.addEventListener("rollout", function () {
        reset.alpha = 1;
        stage.update();
    });
    reset.addEventListener("click", function () {
        stage.removeChild(reset);
        stage.addChild(resetGloss);
        resetGloss.x = 160;
        resetGloss.y = 608;
        stage.update();
        resetClicked = true;
        resetAll();
        showPlayerStats();
    });

    betOne.addEventListener("mouseover", function () {
        betOne.alpha = 0.5;
        stage.update();
    });
    betOne.addEventListener("rollout", function () {
        betOne.alpha = 1;
        stage.update();
    });
    betOne.addEventListener("click", function () {
        stage.removeChild(betOne);
        stage.addChild(betOneGloss);
        betOneGloss.x = 259;
        betOneGloss.y = 608;
        stage.update();
        betOneClicked = true;
    });

    betMax.addEventListener("mouseover", function () {
        betMax.alpha = 0.5;
        stage.update();
    });
    betMax.addEventListener("rollout", function () {
        betMax.alpha = 1;
        stage.update();
    });
    betMax.addEventListener("click", function () {
        stage.removeChild(betMax);
        stage.addChild(betMaxGloss);
        betMaxGloss.x = 350;
        betMaxGloss.y = 608;
        stage.update();
        betMaxClicked = true;
    });

    closeButton.addEventListener("mouseover", function () {
        closeButton.alpha = 0.5;
        stage.update();
    });
    closeButton.addEventListener("rollout", function () {
        closeButton.alpha = 1;
        stage.update();
    });
    closeButton.addEventListener("click", function () {
        stage.removeChild(closeButton);
        stage.addChild(closeButtonGloss);
        closeButtonGloss.x = 112;
        closeButtonGloss.y = 779;
        stage.update();
        closeButtonClicked = true;

        if (confirm("Close Window?")) {
            close();
        }
    });

    spin.addEventListener("mouseover", function () {
        spin.alpha = 0.5;
        stage.update();
    });
    spin.addEventListener("rollout", function () {
        spin.alpha = 1;
        stage.update();
    });

    /* When the player clicks the spin button the game kicks off */
    spin.addEventListener("click", function () {
        stage.removeChild(spin);
        stage.addChild(spinGloss);
        spinGloss.x = 438;
        spinGloss.y = 594;
        stage.update();
        spinClicked = true;

        playerBet = $("div#betEntry>input").val();

        if (playerMoney == 0) {
            if (confirm("You ran out of Money! \nDo you want to play again?")) {
                resetAll();
                showPlayerStats();
            }
        } else if (playerBet > playerMoney) {
            alert("You don't have enough Money to place that bet.");
        } else if (playerBet < 0) {
            alert("All bets must be a positive $ amount.");
        } else if (playerBet <= playerMoney) {
            spinResult = Reels();
            fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
            $("div#result>p").text(fruits);
            determineWinnings();
            turn++;
            showPlayerStats();
        } else {
            alert("Please enter a valid bet amount");
        }
    });
}

function handleTick() {
    if (resetClicked) {
        timer += 1;
        if (timer > 10) {
            stage.removeChild(resetGloss);
            stage.addChild(reset);
            reset.x = 160;
            reset.y = 608;
            timer = 0;
            stage.update();
            resetClicked = false;
        }
    }

    if (betOneClicked) {
        timer += 1;
        if (timer > 10) {
            stage.removeChild(betOneGloss);
            stage.addChild(betOne);
            betOne.x = 259;
            betOne.y = 608;
            timer = 0;
            stage.update();
            betOneClicked = false;
        }
    }

    if (betMaxClicked) {
        timer += 1;
        if (timer > 10) {
            stage.removeChild(betMaxGloss);
            stage.addChild(betMax);
            betMax.x = 350;
            betMax.y = 608;
            timer = 0;
            stage.update();
            betMaxClicked = false;
        }
    }

    if (spinClicked) {
        timer += 1;
        if (timer > 10) {
            stage.removeChild(spinGloss);
            stage.addChild(spin);
            spin.x = 438;
            spin.y = 594;
            timer = 0;
            stage.update();
            spinClicked = false;
        }
    }

    if (closeButtonClicked) {
        timer += 1;
        if (timer > 10) {
            stage.removeChild(closeButtonGloss);
            stage.addChild(closeButton);
            closeButton.x = 112;
            closeButton.y = 779;
            timer = 0;
            stage.update();
            closeButtonClicked = false;
        }
    }
    stage.update;
}

/* Utility function to show Player Stats */
function showPlayerStats() {
    winRatio = winNumber / turn;
    $("#jackpot").text("Jackpot: " + jackpot);
    $("#playerMoney").text("Player Money: " + playerMoney);
    $("#playerTurn").text("Turn: " + turn);
    $("#playerWins").text("Wins: " + winNumber);
    $("#playerLosses").text("Losses: " + lossNumber);
    $("#playerWinRatio").text("Win Ratio: " + (winRatio * 100).toFixed(2) + "%");
}

/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    grapes = 0;
    bananas = 0;
    oranges = 0;
    cherries = 0;
    bars = 0;
    bells = 0;
    sevens = 0;
    blanks = 0;
}

/* Utility function to reset the player stats */
function resetAll() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    turn = 0;
    playerBet = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;
}

/* Check to see if the player won the jackpot */
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        alert("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        jackpot = 1000;
    }
}

/* Utility function to show a win message and increase player money */
function showWinMessage() {
    playerMoney += winnings;
    $("div#winOrLose>p").text("You Won: $" + winnings);
    resetFruitTally();
    checkJackPot();
}

/* Utility function to show a loss message and reduce player money */
function showLossMessage() {
    playerMoney -= playerBet;
    $("div#winOrLose>p").text("You Lost!");
    resetFruitTally();
    jackpot += +playerBet;
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    } else {
        return !value;
    }
}

/* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */
function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):
                betLine[spin] = "blank";
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37):
                betLine[spin] = "Grapes";
                grapes++;
                break;
            case checkRange(outCome[spin], 38, 46):
                betLine[spin] = "Banana";
                bananas++;
                break;
            case checkRange(outCome[spin], 47, 54):
                betLine[spin] = "Orange";
                oranges++;
                break;
            case checkRange(outCome[spin], 55, 59):
                betLine[spin] = "Cherry";
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62):
                betLine[spin] = "Bar";
                bars++;
                break;
            case checkRange(outCome[spin], 63, 64):
                betLine[spin] = "Bell";
                bells++;
                break;
            case checkRange(outCome[spin], 65, 65):
                betLine[spin] = "Seven";
                sevens++;
                break;
        }
    }
    return betLine;
}

/* This function calculates the player's winnings, if any */
function determineWinnings() {
    if (blanks == 0) {
        if (grapes == 3) {
            winnings = playerBet * 10;
        } else if (bananas == 3) {
            winnings = playerBet * 20;
        } else if (oranges == 3) {
            winnings = playerBet * 30;
        } else if (cherries == 3) {
            winnings = playerBet * 40;
        } else if (bars == 3) {
            winnings = playerBet * 50;
        } else if (bells == 3) {
            winnings = playerBet * 75;
        } else if (sevens == 3) {
            winnings = playerBet * 100;
        } else if (grapes == 2) {
            winnings = playerBet * 2;
        } else if (bananas == 2) {
            winnings = playerBet * 2;
        } else if (oranges == 2) {
            winnings = playerBet * 3;
        } else if (cherries == 2) {
            winnings = playerBet * 4;
        } else if (bars == 2) {
            winnings = playerBet * 5;
        } else if (bells == 2) {
            winnings = playerBet * 10;
        } else if (sevens == 2) {
            winnings = playerBet * 20;
        } else if (sevens == 1) {
            winnings = playerBet * 5;
        } else {
            winnings = playerBet * 1;
        }
        winNumber++;
        showWinMessage();
    } else {
        lossNumber++;
        showLossMessage();
    }
}
//# sourceMappingURL=main.js.map
