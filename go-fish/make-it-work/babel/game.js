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
        this.pairs = [];
    }

    get values() {
        let values = [];
        _.each(this.hand, card => {
            values.push(card.value);
        });
        return values
    }

    hasA(value) {
        return _.includes(this.values, value);
    }

    removeCard(value) {
        let cardToRemove;
        _.each(this.hand, card => {
            if (card.value === value) {
                cardToRemove = card;
            };
        });
        _.pull(this.hand, cardToRemove)
        return cardToRemove;
    }

    hasPair() {
        return _.uniq(this.values).length < this.values.length
    }

    findAPair() {
        // return a list with one pair of cards in it
        let pairs = [];
        _.each(_.range(this.hand.length), i => {
            let currentCard = this.hand[i];
            let restOfCards = _.slice(this.hand, i + 1);
            _.each(restOfCards, card => {
                if (card.value === currentCard.value) {
                    pairs.push([currentCard, card]);
                };
            });
        });
        return pairs[0];
    }
    
    makePairs() {
        if (this.hasPair()) {
            let pair = this.findAPair();
            // add pair to pairs
            this.pairs.push(pair);
            // remove those cards from the hand
            _.each(pair, card => {
                _.pull(this.hand, card);
            });
            this.makePairs();
        };
    }
    
}

export class Game {
    constructor(playerNames) {
        this.players = {};
        _.each(playerNames, name => {
            this.players[name] = new Player(name);
        })
        this.deck = new Deck();
        this.deck.shuffle();
    }
    
    deal() {
        _.each(this.players, player => {
            player.hand = this.deck.draw(7);
        })
    }
}
