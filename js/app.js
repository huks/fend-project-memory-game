/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
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

// Variable Declaration
const deck = document.getElementById("deck-id");
const moves = document.getElementsByClassName("moves");
let MATCH_LIST = []; // global matchList

// Set up the event listener for a card
deck.addEventListener("click", function(e) {
    if (e.target.nodeName === "LI" && e.target.className === "card") {
        displayCard(event.target);
    }
});

/**
 * @description Display the card's symbol
 * @param {object} target - the card clicked
 */
function displayCard(target) {
    target.classList.add("open", "show");
    addCard(MATCH_LIST, target);
}

/**
 * @description Add the card to a *list* of "open" cards
 * @param {object} list - global MATCH_LIST
 * @param {object} card
 */
function addCard(list, card) {
    list.push(card);
    if (list.length == 2) {
        isMatch(list[0], list[1]);
    }
}

/**
 * @description If the list already has another card, check to see if the two cards match
 * @param {object} aCard
 * @param {object} bCard
 */
function isMatch(aCard, bCard) {  
    let a = aCard.children[0].className;
    let b = bCard.children[0].className;

    if (a == b) {
        lockCards();
    } else if (a != b) {
        removeCards();
    }

    MATCH_LIST = [];

    increaseMoveCounter();

    // if all cards have matched, display a message with the final score
}

/**
 * @description If the cards do match, lock the cards in the open position
 */
function lockCards() {
    for (card of MATCH_LIST) {
        card.classList.remove("open", "show");
        card.classList.add("match");
    }
}

/**
 * @description If the cards do not match, remove the cards from the list and hide the card's symbol
 */
function removeCards() {
    // TODO: add animation
    for (card of MATCH_LIST) {
        card.classList.remove("open", "show");
    }
}

/**
 * @description Increment the move counter and display it on the page
 */
function increaseMoveCounter() {
    moves[0].innerHTML++;
}