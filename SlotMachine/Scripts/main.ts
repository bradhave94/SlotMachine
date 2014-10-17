/**
    File name: main.st
    Author: Bradley Haveman
    Site Name: Slot machine 
    File decsription: main.ts contains all the logic for game. Start by setting up the canvas by adding all the buttons and create varibales for the reels. And let the player spin and win
 */

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
var grapesImg = new Image();
grapesImg.src = "./images/grapes.png";
var bananas = 0;
var bananasImg = new Image();
bananasImg.src = "./images/bananas.png";
var oranges = 0;
var orangesImg = new Image();
orangesImg.src = "./images/orange.png";
var cherries = 0;
var cherriesImg = new Image();
cherriesImg.src = "./images/cherries.png";
var bars = 0;
var barsImg = new Image();
barsImg.src = "./images/bars.png";
var bells = 0;
var bellsImg = new Image();
bellsImg.src = "./images/bells.png";
var sevens = 0;
var sevensImg = new Image();
sevensImg.src = "./images/sevens.png";
var blanks = 0;
var blanksImg = new Image();
blanksImg.src = "./images/blanks.png";

//the stage
var stage = new createjs.Stage(document.getElementById("canvas"));

//The images and text to display
var image = new createjs.Bitmap("./images/SlotMachine.png");
var reset = new createjs.Bitmap("./images/reset.png");
var betOne = new createjs.Bitmap("./images/betOne.png");
var betMax = new createjs.Bitmap("./images/betMax.png");
var spin = new createjs.Bitmap("./images/spin.png");
var resetGloss = new createjs.Bitmap("./images/resetGloss.png");
var betOneGloss = new createjs.Bitmap("./images/betOneGloss.png");
var betMaxGloss = new createjs.Bitmap("./images/betMaxGloss.png");
var spinGloss = new createjs.Bitmap("./images/spinGloss.png");
var closeButton = new createjs.Bitmap("./images/closeButton.png");
var closeButtonGloss = new createjs.Bitmap("./images/closeButtonGloss.png");
var jackpotTextBox = new createjs.Bitmap("./images/jackpotTextBox.png");
var playerBetTextBox = new createjs.Bitmap("./images/textBox.png");
var creditsTextBox = new createjs.Bitmap("./images/textBox.png");
var winOrLoseTextBox = new createjs.Bitmap("./images/winOrLoseTextBox.png");
var jackpotText = new createjs.Text("Jackpot: " + jackpot, "12px Myriad Pro", "#FF0000");
var playerBetText = new createjs.Text("Payer Bet: " + playerBet, "12px Myriad Pro", "#FF0000");
var creditsText = new createjs.Text("Credits: " + playerMoney, "12px Myriad Pro", "#FF0000");
var winOrLoseText = new createjs.Text("Welcome!", "35px Myriad Pro", "#FFFF00");

//Sound fils
var click = new Audio("./Sound/click.mp3");
var ambience = new Audio("./Sound/ambience.mp3");
var jackpotSound = new Audio("./Sound/jackpot.mp3");

//reels
var reel1;
var reel2;
var reel3;
var reels = [reel1 = new createjs.Bitmap(sevensImg), reel2 = new createjs.Bitmap(sevensImg), reel3 = new createjs.Bitmap(sevensImg)];

var timer = 0;
var resetClicked = false;
var betOneClicked = false;
var betMaxClicked = false;
var spinClicked = false;
var closeButtonClicked = false;

//Initialize the program, place the children on the canvad
function init() {
    ambience.loop = true;
    ambience.play();
    ambience.volume = .25
    createjs.Ticker.setFPS(60);
    stage.enableMouseOver(20);

    //Add children
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
    stage.addChild(jackpotTextBox);
    jackpotTextBox.x = 284;
    jackpotTextBox.y = 309;
    stage.addChild(playerBetTextBox);
    playerBetTextBox.x = 187;
    playerBetTextBox.y = 521;
    stage.addChild(creditsTextBox);
    creditsTextBox.x = 384;
    creditsTextBox.y = 521;
    stage.addChild(jackpotText);
    jackpotText.x = 301;
    jackpotText.y = 319;
    stage.addChild(playerBetText);
    playerBetText.x = 196;
    playerBetText.y = 527;
    stage.addChild(creditsText);
    creditsText.x = 399;
    creditsText.y = 527;
    stage.addChild(winOrLoseTextBox);
    winOrLoseTextBox.x = 183;
    winOrLoseTextBox.y = 783;
    stage.addChild(winOrLoseText);
    winOrLoseText.x = 194;
    winOrLoseText.y = 792;

    stage.addChild(reels[0]);
    reels[0].x = 206;
    reels[0].y = 374;
    stage.addChild(reels[1]);
    reels[1].x = 310;
    reels[1].y = 374;
    stage.addChild(reels[2]);
    reels[2].x = 412;
    reels[2].y = 374;

    stage.update();
    createjs.Ticker.addEventListener("tick", handleTick);

    //Mouse functions for reset
    reset.addEventListener("mouseover", function () { reset.alpha = 0.5; stage.update(); });
    reset.addEventListener("rollout", function () { reset.alpha = 1; stage.update(); });
    reset.addEventListener("click", function () {
        stage.removeChild(reset); stage.addChild(resetGloss);
        resetGloss.x = 160;
        resetGloss.y = 608;
        stage.update();
        resetClicked = true;
        resetAll();
        showPlayerStats();
        click.play();
    })

    //Mouse functions for betOne
    betOne.addEventListener("mouseover", function () { betOne.alpha = 0.5; stage.update(); });
    betOne.addEventListener("rollout", function () { betOne.alpha = 1; stage.update(); });
    betOne.addEventListener("click", function () {
        stage.removeChild(betOne); stage.addChild(betOneGloss);
        betOneGloss.x = 259;
        betOneGloss.y = 608;  
        playerBet = 1; 
        playerBetText.text = "Player Bet: " + playerBet;
        showPlayerStats();   
        stage.update();
        betOneClicked = true;
        click.play();
    })

    //Mouse functions for betMax
    betMax.addEventListener("mouseover", function () { betMax.alpha = 0.5; stage.update(); });
    betMax.addEventListener("rollout", function () { betMax.alpha = 1; stage.update(); });
    betMax.addEventListener("click", function () {
        stage.removeChild(betMax); stage.addChild(betMaxGloss);
        betMaxGloss.x = 350;
        betMaxGloss.y = 608;
        playerBet = 5;
        playerBetText.text = "Player Bet: " + playerBet;
        showPlayerStats();
        stage.update();
        betMaxClicked = true;
        click.play();
    })

    //Mouse functions for closeButton
    closeButton.addEventListener("mouseover", function () { closeButton.alpha = 0.5; stage.update(); });
    closeButton.addEventListener("rollout", function () { closeButton.alpha = 1; stage.update(); });
    closeButton.addEventListener("click", function () {
        stage.removeChild(closeButton); stage.addChild(closeButtonGloss);
        closeButtonGloss.x = 112;
        closeButtonGloss.y = 779;
        stage.update();
        closeButtonClicked = true;
        click.play();

        //Redirect the user
        if (confirm("Exit The Game?")) {
            window.location.replace("http://www.bigbustycoons.com/");
            
        }
    })

    //Mouse functions for spin
    spin.addEventListener("mouseover", function () { spin.alpha = 0.5; stage.update(); });
    spin.addEventListener("rollout", function () { spin.alpha = 1; stage.update(); });

    /* When the player clicks the spin button the game kicks off */
    spin.addEventListener("click", function () {  
        click.play();
        stage.removeChild(spin); stage.addChild(spinGloss);
        spinGloss.x = 438;
        spinGloss.y = 594;
        stage.update();
        spinClicked = true;
        if (playerBet != 0) {
            if (playerMoney == 0) {
                if (confirm("You ran out of Money! \nDo you want to play again?")) {
                    resetAll();
                    showPlayerStats();
                }
            }
            else if (playerBet > playerMoney) {
                alert("You don't have enough Money to place that bet.");
            }           
            else if (playerBet <= playerMoney) {
                spinResult = Reels();
                fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];

                $("div#result>p").text(fruits);
                determineWinnings();
                turn++;
                showPlayerStats();
            }            
        }
        else {
            alert("Please enter a bet amount");
        }
    })
}

//Ticker evert, update the frame every second
function handleTick() {

    //Check if the button has been click and reset to original image.
    if (resetClicked) {
        timer += 1;
        if (timer > 10) {
            stage.removeChild(resetGloss); stage.addChild(reset);
            reset.x = 160;
            reset.y = 608;
            timer = 0;
            stage.update();
            resetClicked = false;
        }
    }

    //Check if the button has been click and reset to original image.
    if (betOneClicked) {
        timer += 1;
        if (timer > 10) {
            stage.removeChild(betOneGloss); stage.addChild(betOne);
            betOne.x = 259;
            betOne.y = 608;
            timer = 0;
            stage.update();
            betOneClicked = false;
        }
    }

    //Check if the button has been click and reset to original image.
    if (betMaxClicked) {
        timer += 1;
        if (timer > 10) {
            stage.removeChild(betMaxGloss); stage.addChild(betMax);
            betMax.x = 350;
            betMax.y = 608;
            timer = 0;
            stage.update();
            betMaxClicked = false;
        }
    }

    //Check if the button has been click and reset to original image.
    if (spinClicked) {
        timer += 1;
        if (timer > 10) {
            stage.removeChild(spinGloss); stage.addChild(spin);
            spin.x = 438;
            spin.y = 594;
            timer = 0;
            stage.update();
            spinClicked = false;
        }
    }

    //Check if the button has been click and reset to original image.
    if (closeButtonClicked) {
        timer += 1;
        if (timer > 10) {
            stage.removeChild(closeButtonGloss); stage.addChild(closeButton);
            closeButton.x = 112;
            closeButton.y = 779
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
    $("#playerBet").text("Player Bet: " + playerBet);
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
    jackpotText.text = "Jackpot: " + jackpot;
    creditsText.text = "Credits: " + playerMoney;
    playerBetText.text = "Player Bet: " + playerBet;
    winOrLoseText.text = "Welcome!";
}


/* Check to see if the player won the jackpot */
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        jackpotSound.play();
        alert("You Won the $" + jackpot + " Jackpot!!");
        winOrLoseText.text = "JACKPOT!!!!! $" + jackpot;
        playerMoney += jackpot;
        jackpot = 1000;
        
    }
}

/* Utility function to show a win message and increase player money */
function showWinMessage() {
    playerMoney += winnings;
    stage.update();
    winOrLoseText.text = "You Won! $" + winnings;
    resetFruitTally();
    checkJackPot();
}

/* Utility function to show a loss message and reduce player money */
function showLossMessage() {
    playerMoney -= playerBet;
    winOrLoseText.text = "You Lost!";
    resetFruitTally();
    jackpot += +playerBet;
    jackpotText.text = "Jackpot: " + jackpot;
    creditsText.text = "Credits: " + playerMoney;
    
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    }
    else {
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
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = "blank";
                blanks++;
                reels[spin].image = blanksImg;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = "Grapes";
                grapes++;
                reels[spin].image = grapesImg;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = "Banana";
                bananas++;
                reels[spin].image = bananasImg;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = "Orange";
                oranges++;
                reels[spin].image = orangesImg;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = "Cherry";
                cherries++;
                reels[spin].image = cherriesImg;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = "Bar";
                bars++;
                reels[spin].image = barsImg;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = "Bell";
                bells++;
                reels[spin].image = bellsImg;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = "Seven";
                sevens++;
                reels[spin].image = sevensImg;
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
        }
        else if (bananas == 3) {
            winnings = playerBet * 20;
        }
        else if (oranges == 3) {
            winnings = playerBet * 30;
        }
        else if (cherries == 3) {
            winnings = playerBet * 40;
        }
        else if (bars == 3) {
            winnings = playerBet * 50;
        }
        else if (bells == 3) {
            winnings = playerBet * 75;
        }
        else if (sevens == 3) {
            winnings = playerBet * 100;
        }
        else if (grapes == 2) {
            winnings = playerBet * 2;
        }
        else if (bananas == 2) {
            winnings = playerBet * 2;
        }
        else if (oranges == 2) {
            winnings = playerBet * 3;
        }
        else if (cherries == 2) {
            winnings = playerBet * 4;
        }
        else if (bars == 2) {
            winnings = playerBet * 5;
        }
        else if (bells == 2) {
            winnings = playerBet * 10;
        }
        else if (sevens == 2) {
            winnings = playerBet * 20;
        }
        else if (sevens == 1) {
            winnings = playerBet * 5;
        }
        else {
            winnings = playerBet * 1;
        }
        winNumber++;
        showWinMessage();
    }
    else {
        lossNumber++;
        showLossMessage();
    }
}