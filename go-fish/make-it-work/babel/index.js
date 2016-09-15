import * as _ from 'lodash';
import GoFish from './game';

let game = new GoFish(["user", "comp"]);
let user = game.players["user"];
let comp = game.players["comp"];
let deck = game.deck;

let banner = document.getElementById("banner");

let displayHand = () => {
    let handEl = document.getElementById("hand");
    // clear the hand
    while(handEl.firstChild) {
        handEl.removeChild(handEl.firstChild);
    }
    // display the hand
    _.each(user.hand, card => {
        let cardEl = new Image(100, 200);
        cardEl.src = cardImageSources[card.name];
        handEl.appendChild(cardEl);
    })
}

let compTurn = () => {
    let card = comp.randomCard();
    banner.innerHTML = `Computer: "Do you have a ${card.value}?"`;
    if (_.includes(user.hand.values, card.value)) {
        // There is a match
        banner.innerHTML = `You: "Yes, I have a ${card.value}! Here you are!"`
        comp.hand.cards += user.removeCard(card.value)
        comp.makeMatch(card.value);
        displayHand();
        compTurn();
    } else {
        // There is not a match
        banner.innerHTML = "Go Fish!";
        comp.hand.cards += deck.draw();
        displayHand();
        userTurn();
    }
}

let userTurn = () => {
    banner.innerHTML = "Choose A Card";
    let card = getSelectedCard();
    banner.innerHTML = `You: "Computer, do you have a ${card.value}?"`;
    if (_.includes(comp.hand.values, card.value)) {
        // There is a match
        banner.innerHTML = `Computer: "Yes, I have a ${card.value}! Here you are!"`
        user.hand.cards += comp.removeCard(card.value)
        user.makeMatch(card.value);
        displayHand();
        userTurn();
    } else {
        // There is not a match
        banner.innerHTML = "Go Fish!";
        user.hand.cards += deck.draw();
        displayHand();
        compTurn();
    }
}