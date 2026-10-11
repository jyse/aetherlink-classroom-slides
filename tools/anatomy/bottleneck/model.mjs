export const ILLUSTRATIVE = true;
export const ARRIVAL_RATE = 3.2;
export const SPEED_RANGE = Object.freeze({ min: 0.5, max: 1.5, step: 0.1 });

export const STATIONS = Object.freeze([
  { id: 'plan', name: 'Plan', capacity: 4.2, startQueue: 0.3 },
  { id: 'design', name: 'Design', capacity: 4.0, startQueue: 0.3 },
  { id: 'build', name: 'Build', capacity: 4.8, startQueue: 4.0, controlled: true },
  { id: 'test', name: 'Test', capacity: 6.0, startQueue: 0.0 },
  { id: 'deploy', name: 'Deploy', capacity: 2.6, startQueue: 0.4 },
  { id: 'maintain', name: 'Maintain', capacity: 3.8, startQueue: 0.5 },
]);

export const clampSpeed = (speed) => {
  const numeric = Number(speed);
  const value = Number.isFinite(numeric) ? numeric : 1;
  return Math.min(SPEED_RANGE.max, Math.max(SPEED_RANGE.min, value));
};

export function simulate(speed = 1) {
  const buildSpeed = clampSpeed(speed);
  let incoming = ARRIVAL_RATE;
  const stations = STATIONS.map((station) => {
    const capacity = station.capacity * (station.controlled ? buildSpeed : 1);
    const available = incoming + station.startQueue;
    const processed = Math.min(available, capacity);
    const queue = Math.max(0, available - processed);
    const result = { ...station, incoming, capacity, available, processed, queue };
    incoming = processed;
    return result;
  });
  const bottleneck = stations.reduce((worst, station) =>
    station.queue > worst.queue ? station : worst, stations[0]);
  return { illustrative: ILLUSTRATIVE, hours: 1, speed: buildSpeed, arrival: ARRIVAL_RATE, stations, bottleneck };
}

export function readoutOf(result) {
  const build = result.stations.find((station) => station.id === 'build');
  return `Build ${Math.round(result.speed * 100)}% · ${build.processed.toFixed(1)}/h · ${result.bottleneck.name} queue ${result.bottleneck.queue.toFixed(1)} after 1 h`;
}

export function stationSummary(result) {
  return result.stations.map((station) => ({
    id: station.id,
    name: station.name,
    processed: Number(station.processed.toFixed(2)),
    queue: Number(station.queue.toFixed(2)),
    bottleneck: station.id === result.bottleneck.id,
  }));
}
