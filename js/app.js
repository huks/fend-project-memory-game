// Variable Declaration
const deck = document.getElementById("deck-id");
const moves = document.getElementsByClassName("moves");

let MATCH_LIST = []; // global matchList

/*
 * Create a list that holds all of your cards
 */
const cardList = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"]; // unique set
cardList.push(...cardList); // Now the card list has two set of unique card

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

// Shuffle the list of cards
shuffle(cardList);

// Loop throught each card and create its HTML
console.log(deck);
// console.log(deck.children);

// want to improve somehow using dot operator...
for (let i=0; i<deck.children.length; i++){
    console.log(deck.children[i].children);
    deck.children[i].children[0].classList.add(cardList[i]);
}

// for (let foo of deck.children) {
//     console.log(foo.children[0].className);
//     foo.children[0].classList.add("fa-paper-plane-o");
// }

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
    // prevent displaying card while there are two cards already
    if (MATCH_LIST.length < 2) {
        target.classList.add("open", "show");
        addCard(MATCH_LIST, target);
    }    
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
        MATCH_LIST = [];
    } else if (a != b) {
        setTimeout(function(){
            removeCards();
            MATCH_LIST = [];
        }, 1000);
    }

    increaseMoveCounter();

    // if all cards have matched, display a message with the final score
}

/**
 * @description If the cards do match, lock the cards in the open position
 */
function lockCards() {
    for (let card of MATCH_LIST) {
        card.classList.remove("open", "show");
        card.classList.add("match");
    }
}

/**
 * @description If the cards do not match, remove the cards from the list and hide the card's symbol
 */
function removeCards() {
    // TODO: add animation
    for (let card of MATCH_LIST) {
        card.classList.remove("open", "show");
    }
}

/**
 * @description Increment the move counter and display it on the page
 */
function increaseMoveCounter() {
    moves[0].innerHTML++;
}