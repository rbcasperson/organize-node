import * as _ from 'lodash';

export class Deck {
    constructor() {
        this.suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        this.values = _.concat(_.range(2, 11), ['ace', 'king', 'queen', 'jack']);
        this.generateCards();
        this.cardsInPlay = [];
    }
    
    generateCards() {
        this.cards = [];
        _.each(this.suits, suit => {
            _.each(this.values, value => {
                this.cards.push({
                    name: `${value} of ${suit}`,
                    suit: suit,
                    value: value
                });
            });
        });
    }
    
    draw(n = 1) {
        let drawnCards = []
        _.each(_.range(n), count => {
            let topCard = this.cards.pop();
            drawnCards.push(topCard);
            this.cardsInPlay.push(topCard);
        })
        return drawnCards
    }
    
    collect() {
        _.each(this.cardsInPlay, card => {
            this.cards.push(card);
        })
        this.cardsInPlay = [];
    }
    
    shuffle() {
        this.cards = _.shuffle(this.cards);
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
