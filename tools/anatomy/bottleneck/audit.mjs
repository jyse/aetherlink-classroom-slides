import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { PARTS, partIds } from './parts.mjs';

const root = new URL('../../../', import.meta.url).pathname;
const htmlFiles = ['bottleneck.html', 'bottleneck-light.html'];
const svgFiles = ['bottleneck.svg', 'bottleneck-light.svg'];
const readOutputs = (files) => files.map((file) => [file, readFileSync(join(root, 'assets/anatomy', file), 'utf8')]);
const htmlOutputs = readOutputs(htmlFiles);
const svgOutputs = readOutputs(svgFiles);
const outputs = [...htmlOutputs, ...svgOutputs];

assert.ok(PARTS.length >= 40, `expected 40 purposeful parts, got ${PARTS.length}`);
assert.equal(new Set(partIds()).size, PARTS.length, 'part ids must be unique');

for (const [file, source] of outputs) {
  assert.match(source, /<svg/);
  assert.match(source, /ILLUSTRATIVE VALUES/);
  assert.match(source, /Plan to Maintain/);
  assert.match(source, /data-station-index="0" data-level="0"/);
  assert.doesNotMatch(source, /<(?:script|link)[^>]+(?:src|href)=/i, `${file} must be standalone`);
  for (const id of partIds()) assert.match(source, new RegExp(`data-part=["']${id}["']`), `${file} missing ${id}`);
}

for (const [, source] of htmlOutputs) {
  assert.match(source, /IntersectionObserver/);
  assert.match(source, /prefers-reduced-motion/);
  assert.match(source, /pointermove/);
  assert.match(source, /ArrowRight/);
  assert.match(source, /\[data-station-index=.*\]\[data-level\]/);
  assert.match(source, /role="slider"/);
}

for (const [file, source] of svgOutputs) {
  assert.match(source, /role="img"/, `${file} must remain a static image`);
  assert.doesNotMatch(source, /<script\b/i, `${file} must not embed runtime JavaScript`);
  assert.doesNotMatch(source, /role="slider"|tabindex=/, `${file} must not expose interactive controls`);
}

assert.match(outputs.find(([file]) => file === 'bottleneck-light.html')[1], /data-theme="light"/);
assert.match(outputs.find(([file]) => file === 'bottleneck-light.svg')[1], /data-theme="light"/);
assert.match(outputs.find(([file]) => file === 'bottleneck.html')[1], /role="slider"/);

console.log(`artifact audit passed · ${outputs.length} standalone outputs · ${PARTS.length} purposeful parts`);
