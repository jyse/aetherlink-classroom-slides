// Run with: node --test   (no install needed)
const test = require('node:test'); const assert = require('node:assert');
const store = {}; global.localStorage = { getItem: k => store[k] ?? null, setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } };
const Arcade = require('../arcade.js');
test('a valid score is stored and comes back in the top 10', () => {
  Arcade.clear(); Arcade.submitScore({ player: 'Cons', avatar: '/games/snake/avatar.png', points: 42, game: 'Snake' });
  assert.equal(Arcade.topScores(10)[0].points, 42);
});
test('the top 10 is sorted, highest first, and has at most 10 scores', () => {
  Arcade.clear(); for (let i = 0; i < 12; i++) Arcade.submitScore({ player: 'P' + i, avatar: 'a.png', points: i, game: 'Snake' });
  const top = Arcade.topScores(10); assert.equal(top.length, 10); assert.equal(top[0].points, 11);
});
test('a score that breaks the contract is rejected', () => {
  assert.throws(() => Arcade.submitScore({ player: '', avatar: 'a.png', points: 3, game: 'Snake' }));
  assert.throws(() => Arcade.submitScore({ player: 'Cons', avatar: 'a.png', points: 2.5, game: 'Snake' }));
  assert.throws(() => Arcade.submitScore({ player: 'Cons', avatar: 'a.png', points: 3 }));
});
