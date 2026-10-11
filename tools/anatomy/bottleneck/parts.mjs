import { STATIONS } from './model.mjs';

const part = (id, group, purpose) => ({ id, group, purpose });

export const PARTS = [
  part('base-plate', 'base', 'Carries the six-station line.'),
  ...['nw', 'ne', 'sw', 'se'].map((corner) => part(`foot-${corner}`, 'base', 'Supports and lifts the base plate.')),
  ...['nw', 'ne', 'sw', 'se'].map((corner) => part(`base-screw-${corner}`, 'base', 'Fastens the plate to its frame.')),
  part('ruler-strip', 'base', 'Makes the line read as a calibrated instrument.'),
  part('model-plate', 'base', 'Marks every value as illustrative.'),
  part('belt-back-rail', 'transport', 'Guides work along the far edge.'),
  part('belt-front-rail', 'transport', 'Guides work along the near edge.'),
  ...Array.from({ length: 7 }, (_, index) => part(`belt-roller-${index + 1}`, 'transport', 'Supports the work conveyor.')),
  ...STATIONS.flatMap((station) => [
    part(`${station.id}-pedestal`, station.id, 'Anchors the station to the line.'),
    part(`${station.id}-housing`, station.id, 'Contains the station mechanism.'),
    part(`${station.id}-cap`, station.id, 'Closes and stiffens the housing.'),
    part(`${station.id}-sensor`, station.id, 'Detects incoming work.'),
    part(`${station.id}-lamp`, station.id, 'Shows station activity or the bottleneck.'),
    part(`${station.id}-queue-tray`, station.id, 'Holds work waiting for the station.'),
    ...Array.from({ length: 5 }, (_, index) =>
      part(`${station.id}-queue-card-${index + 1}`, station.id, 'Represents queued work from the model.')),
  ]),
  part('build-control-bed', 'control', 'Mounts the Build speed control.'),
  part('build-control-track', 'control', 'Defines the 50–150% speed range.'),
  part('build-control-knob', 'control', 'Lets the reader change Build speed.'),
  part('build-control-pointer', 'control', 'Shows the selected Build speed.'),
];

export const partIds = () => PARTS.map((entry) => entry.id);
