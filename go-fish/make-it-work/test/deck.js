import test from 'ava';
import * as _ from 'lodash';

import { Deck } from '../babel/game';
import { correctCards } from './data/correctCards';

let deck1, deck2, deck3, deck4;
let oneCard, sevenCards;

test.before(t => {
    deck1 = new Deck();
    
    deck2 = new Deck();
    oneCard = deck2.draw();
    
    deck3 = new Deck();
    sevenCards = deck3.draw(7);
    
    deck4 = new Deck();
    deck4.draw(5);
    deck4.collect();
})

test('the deck has 52 cards', t => {
    t.true(deck1.cards.length === 52);
});

test('the deck has all the correct cards in it', t => {
    t.true(_.isEqual(correctCards, deck1.cards));
});

test('one card is drawn by default', t => {
    t.true(oneCard.length === 1);
});

test('seven cards can be drawn at once', t => {
    t.true(sevenCards.length === 7);
});

test('drawing cards adds those cards to the cardsInPlay', t => {
    t.true(deck2.cardsInPlay.length === 1);
    t.true(deck3.cardsInPlay.length === 7);
});

test('drawing cards removes those cards from the deck', t => {
    t.true(deck2.cards.length === 51);
    t.true(deck3.cards.length === 45);
});

test('cards are collected and the deck is full again', t => { 
    t.true(deck4.cards.length === 52);
    t.true(deck4.cardsInPlay.length === 0);
});


