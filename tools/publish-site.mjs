import {copyFile, mkdir, readdir, rm} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'dist');
const secretName = /^(?:\.env(?:\..*)?|id_(?:rsa|dsa|ecdsa|ed25519)(?:\.pub)?|.*\.(?:key|pem|p12|pfx))$/i;
const blockedAssetDirectories = new Set(['node_modules', 'tools', 'vendor']);

const isRootAsset = name => name === 'styles.css' || name.endsWith('.html') || name.endsWith('.js');

async function collectAssets(directory, relative = '') {
  const files = [];
  const entries = await readdir(directory, {withFileTypes: true});

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.name.startsWith('.') || secretName.test(entry.name)) continue;
    if (entry.isDirectory() && blockedAssetDirectories.has(entry.name)) continue;

    const source = path.join(directory, entry.name);
    const destination = path.join(relative, entry.name);

    if (entry.isSymbolicLink()) throw new Error(`Refusing to publish symbolic link: assets/${destination}`);
    if (entry.isDirectory()) files.push(...await collectAssets(source, destination));
    if (entry.isFile()) files.push(path.join('assets', destination));
  }

  return files;
}

const rootFiles = (await readdir(root, {withFileTypes: true}))
  .filter(entry => entry.isFile() && isRootAsset(entry.name))
  .map(entry => entry.name)
  .sort();
const assetFiles = await collectAssets(path.join(root, 'assets'));
const files = [...rootFiles, ...assetFiles];

await rm(output, {recursive: true, force: true});

for (const file of files) {
  const destination = path.join(output, file);
  await mkdir(path.dirname(destination), {recursive: true});
  await copyFile(path.join(root, file), destination);
}

console.log(`Prepared ${files.length} files in dist/`);
