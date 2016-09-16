import test from 'ava';

import { Deck } from '../src/game';

let deck;

test.before(t => {
    deck = new Deck();
})

test('the testing works', t => {
    t.pass();
});

test('the deck has 52 cards', t => {
    t.true(deck.cards.length === 52);
});