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

let displayHand = (image, src) => {
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
        image.onload = () => {
            context.drawImage(cardImage, cardSprites.values[card.value], cardSprites.suits[card.suit], 73, 98, 0, 0, 73, 98);
        };
        image.src = src;
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

game.deal();
let cardImage = new Image();
displayHand(cardImage, '../img/cards.png');