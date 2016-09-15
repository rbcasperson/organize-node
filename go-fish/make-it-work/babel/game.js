import * as _ from 'lodash';

class Deck {
    
}

class Player {
    constructor() {
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

class Game {
    constructor(playerNames) {
        _.each(playerNames, name => {
            this.addPlayer(name);
        })
        this.deck = new Deck();
        deck.shuffle();
    }
    
    deal() {
        
    }
    
    
}