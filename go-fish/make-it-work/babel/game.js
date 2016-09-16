import * as _ from 'lodash';

export class Deck {
    constructor() {
        this.cards = [];
        this.cardsInPlay = [];
    }
    
    draw(n = 1) {
        drawnCards = []
        _.each(_.range(n), count => {
            topCard = this.cards.pop;
            drawnCards.push(topCard);
            this.cardsInPlay.push(topCard);
        })
    }
    
    collect() {
        _.each(this.cardsInPlay, card => {
            this.cards.append(card);
        })
        this.cardsInPlay = [];
    }
    
    shuffle() {
        _.shuffle(this.cards);
    }
}

export class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
        this.matchesPile = [];
    }
    
    makeMatch(value) {
        
    }
    
    makeAllMatches(value) {
        
    }
    
    addToMatchPile(match) {
        
    }
    
    removeCard(value) {
        
    }
}

export class Game {
    constructor(playerNames) {
        this.players = {};
        _.each(playerNames, name => {
            this.addPlayer(name);
        })
        this.deck = new Deck();
        deck.shuffle();
    }
    
    addPlayer(name) {
        this.players[name] = new Player(name);
    }
    
    deal() {
        _.each(this.players, player => {
            player.hand = this.deck.draw(7);
        })
    }
    
    
}