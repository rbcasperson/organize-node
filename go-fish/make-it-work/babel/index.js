import * as _ from 'lodash';
import { Game } from './game';

let game = new Game(["user", "comp"]);
let user = game.players["user"];
let comp = game.players["comp"];
let deck = game.deck;


let cardSprites = {
    values: {
        "ace": 0,
        "2": 73,
        "3": 73 * 2,
        "4": 73 * 3,
        "5": 73 * 4,
        "6": 73 * 5,
        "7": 73 * 6,
        "8": 73 * 7,
        "9": 73 * 8,
        "10": 73 * 9,
        "jack": 73 * 10,
        "queen": 73 * 11,
        "king": 73 * 12
    },
    suits: {
        "clubs": 0,
        "spades": 98,
        "hearts": 98 * 2,
        "diamonds": 98 * 3
    }
}

let banner = document.getElementById("banner");

let displayHand = () => {
    let image = cardImage;
    let handEl = document.getElementById("hand");
    // clear the hand
    while(handEl.firstChild) {
        handEl.removeChild(handEl.firstChild);
    }
    
    _.each(user.hand, card => {
        let canvas = document.createElement('canvas');
        canvas.height = 98;
        canvas.width = 73;
        handEl.appendChild(canvas);
        let context = canvas.getContext('2d');
        context.drawImage(image, cardSprites.values[card.value], cardSprites.suits[card.suit], 73, 98, 0, 0, 73, 98);
        canvas.addEventListener("click", function() { selectCard(card, canvas); });
    })
}

let displayPairCount = () => {
    document.getElementById("pairCount").innerHTML = user.pairs.length;
    // TODO add comp too
};

let selectedCard;
let selectedEl;

let selectCard = (card, el) => {
    if (selectedCard !== card) {
        if (selectedEl) { selectedEl.style.border = "none"; };
        selectedEl = el;
        selectedEl.style.border = "2px solid black";
        selectedCard = card;
    } else {
        selectedEl.style.border = "none";
        selectedEl = undefined;
        selectedCard = undefined;
    }
}

let displayText = text => {
    banner.innerHTML = text;
}

//WORKING ON THIS
// for user only here 
let makePairs = () => {
    user.makePairs();
    displayHand();
    displayPairCount();
}
document.getElementById("makePairs").onclick = makePairs;


// ------------------------------------- //

//WORKING ON THIS
let turnButton = document.getElementById('takeTurn');
turnButton.onclick = e => {
    if (selectedCard) {
        displayText(`You: "Computer, do you have a ${selectedCard.value}?"`);
        setTimeout(function() {
            console.log(comp.values);
            if (comp.hasA(selectedCard.value)) {
                displayText(`Comp: "Yes I do! Here you are!"`);
                user.hand.push(comp.removeCard(selectedCard.value));
                displayHand();
                console.log("user hand");
                console.log(user.values);
                console.log("comp hand");
                console.log(comp.values);
                //TODO call the user turn again
            } else {
                displayText(`Comp: "Go fish!"`);
                //TODO draw a card, then call the computer's turn
            };
        }, 1000);
    } else {
        displayText(`Select a card before you take your turn!`);
    }
    
}

game.deal();
let cardImage = new Image();
cardImage.onload = () => {
    displayHand();
    displayPairCount();
}
cardImage.src = '../img/cards.png';
