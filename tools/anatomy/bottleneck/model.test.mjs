import assert from 'node:assert/strict';
import { ARRIVAL_RATE, SPEED_RANGE, STATIONS, clampSpeed, readoutOf, simulate } from './model.mjs';

assert.equal(clampSpeed(-2), SPEED_RANGE.min);
assert.equal(clampSpeed(0), SPEED_RANGE.min);
assert.equal(clampSpeed(8), SPEED_RANGE.max);
assert.equal(clampSpeed(1.2), 1.2);
assert.equal(clampSpeed(Number.NaN), 1);

for (const speed of [0.5, 0.75, 1, 1.25, 1.5]) {
  const result = simulate(speed);
  assert.equal(result.illustrative, true);
  assert.equal(result.stations.length, 6);
  assert.equal(result.stations[0].incoming, ARRIVAL_RATE);
  for (const station of result.stations) {
    assert.ok(Math.abs(station.available - station.processed - station.queue) < 1e-9,
      `${station.name} must conserve work at ${speed}`);
    assert.ok(station.processed <= station.capacity + 1e-9);
    assert.ok(station.queue >= 0);
  }
}

assert.equal(simulate(0.5).bottleneck.id, 'build');
assert.equal(simulate(1.5).bottleneck.id, 'deploy');
assert.ok(simulate(1.5).stations[2].processed > simulate(0.5).stations[2].processed);
assert.ok(simulate(1.5).stations[4].queue > simulate(0.5).stations[4].queue);
assert.match(readoutOf(simulate(1.5)), /Build 150%/);
assert.match(readoutOf(simulate(1.5)), /after 1 h/);
assert.deepEqual(STATIONS.map((station) => station.name), ['Plan', 'Design', 'Build', 'Test', 'Deploy', 'Maintain']);

console.log('model assertions passed');
