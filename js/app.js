/*
 * Create a list that holds all of your cards
 * two same icons (original+copy)
 */
const iconLists = ["fa fa-diamond","fa fa-diamond",
"fa fa-paper-plane-o","fa fa-paper-plane-o",
"fa fa-anchor","fa fa-anchor","fa fa-bolt","fa fa-bolt",
"fa fa-cube","fa fa-cube","fa fa-leaf","fa fa-leaf",
"fa fa-bicycle","fa fa-bicycle","fa fa-bomb","fa fa-bomb"];


/*
* Cards container contains all the card
*/
const cardContainer = document.querySelector('.deck');


/*
* invoke startGame function on document load
*/
document.body.onload = startGame();


/*
* Start the Game
*/
function startGame(){
    shuffle(iconLists); //shuffling the cards
    for(let i = 0; i < iconLists.length; i++){
        const card = document.createElement("li");
        card.classList.add("card"); //class removed in HTML, adding in JS
        card.innerHTML = `<i class = "${iconLists[i]}"></i>`;
        cardContainer.appendChild(card);
        //timer
        second = 0;
        minute = 0; 
        hour = 0;
        var timer = document.querySelector(".timer");
        timer.innerHTML = "0 mins 0 secs";
        clearInterval(interval);
        //invoke the click function
        cardClick(card);
    }
}



/*
* creation of card click
*/
let openedCards = [];
function cardClick(card){
    card.addEventListener("click", function(){
        const currentCard = this;
        const previousCard = openedCards[0];
        if(openedCards.length === 1){ 
            card.classList.add("open","show","match","disable");
            openedCards.push(this);  //this refers to 'card', card opened one by one should be saved in the openedCards array
            compare(currentCard,previousCard);


        }
        else{
            card.classList.add("open","show","match","disable");
            openedCards.push(this);
        }
    });
}


/*
* Compare the two cards
*/
function compare(currentCard, previousCard){
    //compare two cards
    if(currentCard.innerHTML === previousCard.innerHTML){
        matched(currentCard, previousCard);
    }
    else{
        unMatched(currentCard, previousCard);
    }
    // add the moves function to count the moves
    countMoves();
    //success.innerHTML = "";
}


/*
* when cards match
*/
let matchedCards = [];
var success = document.querySelector('.successText');
function matched(currentCard, previousCard){
    currentCard.classList.add("match");
    previousCard.classList.add("match");
    matchedCards.push(currentCard,previousCard);
    success.innerHTML = "Success !!";
    //if 2 cards match reset openedCards array so that the next pair will match
    openedCards = [];
    //check if game is over
    congratulations();
}


/*
* when card doesn't match
*/
function unMatched(currentCard, previousCard){
    //if doesn't match wait for 1000ms and flip the card back
    setTimeout(function(){
        currentCard.classList.remove("open","show","match","disable");
        previousCard.classList.remove("open","show","match","disable");
    }, 1000);
    success.innerHTML = "Try Again !!";
    openedCards = [];
}


/*
* Restart button 
*/
const restartButton = document.querySelector('.restart');
restartButton.addEventListener("click",function(){
    // Delete all the cards
    cardContainer.innerHTML = "";
    //start the game again
    startGame();
    //reset any related variables
    matchedCards = [];
    //reset the moves when restarting the game
    moves = 0;
    movesContainer.innerHTML = moves;
    //reset the rating when restarting the game
    ratingContainer.innerHTML = "";
    ratingContainer.innerHTML += `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
    success.innerHTML = "";
});


/*
* Count the moves 
*/
const movesContainer = document.querySelector('.moves');
let moves = 0;
movesContainer.innerHTML = 0;
function countMoves(){
    moves++;
    movesContainer.innerHTML = moves;
    rating();
    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }
}


/*
* Set the rating based on moves
*/
const ratingContainer =  document.querySelector('.stars');
function rating(){
    switch(moves){
        case 12:
        ratingContainer.removeChild(ratingContainer.children[0]);
        break;
        case 25:
        ratingContainer.removeChild(ratingContainer.children[0]);
        break;
    }
}


/*
* Game timer
*/
var second = 0, minute = 0, hour = 0;
var timer = document.querySelector('.timer');
var interval;

function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute + "  min" + " " + second + "  secs ";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}


/*
* Congratulations popup
*/
let modal = document.getElementById("popup1");
function congratulations(){
    if(matchedCards.length === iconLists.length){
        clearInterval(interval);
        finalTime = timer.innerHTML;
        modal.classList.add("showModal");
        var starRating = document.querySelector(".stars").innerHTML;
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;
        closeModal();
    }
}


/*
* Close icon on Congratulations popup
*/
let closeIcon = document.querySelector('.close');
function closeModal(){
    closeIcon.addEventListener("click", function(){
        modal.classList.remove("showModal");
        // Delete all the cards
        cardContainer.innerHTML = "";
        //start the game again
        startGame();
        //reset any related variables
        matchedCards = [];
        //reset the moves when restarting the game
        moves = 0;
        movesContainer.innerHTML = moves;
        //reset the rating when restarting the game
        ratingContainer.innerHTML = "";
        ratingContainer.innerHTML += `<li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;
        success.innerHTML = "";
        });
}


/*
* Play again button on Congratulations popup
*/
function playAgain(){
    modal.classList.remove("showModal");
    // Delete all the cards
    cardContainer.innerHTML = "";
    //start the game again
    startGame();
    //reset any related variables
    matchedCards = [];
    //reset the moves when restarting the game
    moves = 0;
    movesContainer.innerHTML = moves;
    //reset the rating when restarting the game
    ratingContainer.innerHTML = "";
    ratingContainer.innerHTML += `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
    success.innerHTML = "";
}


/*
* Shuffle function from http://stackoverflow.com/a/2450976
*/
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

