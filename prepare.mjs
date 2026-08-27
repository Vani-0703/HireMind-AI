import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const bundle = join(root, 'bundle');
const parts = readdirSync(bundle)
  .filter((name) => /^part\d+\.b64$/.test(name))
  .sort((a, b) => Number(a.match(/\d+/)?.[0]) - Number(b.match(/\d+/)?.[0]));

if (parts.length === 0) throw new Error('No source archive parts found in bundle/.');

// The archive was Base64-split after gzip compression. Each .b64 file is
// therefore a slice of the SAME gzip stream. Decode each slice and concatenate
// the bytes; do NOT gunzip individual slices.
const compressedChunks = parts.map((file) => {
  const encoded = readFileSync(join(bundle, file), 'utf8').replace(/\s+/g, '');
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(encoded)) {
    throw new Error(`${file} contains invalid Base64 characters.`);
  }
  const bytes = Buffer.from(encoded, 'base64');
  if (!bytes.length) throw new Error(`${file} decoded to an empty chunk.`);
  return bytes;
});

const archivePath = join(root, 'HireMind-AI-source.tgz');
writeFileSync(archivePath, Buffer.concat(compressedChunks));

const web = join(root, 'web');
if (existsSync(web)) rmSync(web, { recursive: true, force: true });
mkdirSync(web, { recursive: true });

try {
  execFileSync('tar', ['-xzf', archivePath, '--overwrite', '-C', web], { stdio: 'inherit' });
} catch {
  throw new Error('Source archive extraction failed. The Base64 archive parts are corrupted or incomplete.');
}

if (!existsSync(join(web, 'package.json'))) {
  throw new Error('Extracted application does not contain web/package.json.');
}

console.log(`HireMind AI source extracted successfully from ${parts.length} archive parts.`);
