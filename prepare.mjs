import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { gunzipSync } from 'node:zlib';

const root = process.cwd();
const bundle = join(root, 'bundle');
const parts = readdirSync(bundle)
  .filter((name) => /^part\d+\.b64$/.test(name))
  .sort((a, b) => Number(a.match(/\d+/)?.[0]) - Number(b.match(/\d+/)?.[0]));

if (parts.length === 0) throw new Error('No source archive parts found in bundle/.');

// Each part is a separately gzip-compressed binary chunk encoded as Base64.
// Decode AND gunzip every part, then concatenate the resulting TAR byte chunks.
const tarChunks = parts.map((file) => {
  const encoded = readFileSync(join(bundle, file), 'utf8').replace(/\s+/g, '');
  const compressed = Buffer.from(encoded, 'base64');
  if (compressed.length < 2 || compressed[0] !== 0x1f || compressed[1] !== 0x8b) {
    throw new Error(`${file} is not a valid gzip member.`);
  }
  try {
    return gunzipSync(compressed);
  } catch (error) {
    throw new Error(`Unable to decompress ${file}: ${error instanceof Error ? error.message : String(error)}`);
  }
});

const tarPath = join(root, 'HireMind-AI-source.tar');
writeFileSync(tarPath, Buffer.concat(tarChunks));

const web = join(root, 'web');
if (existsSync(web)) rmSync(web, { recursive: true, force: true });
mkdirSync(web, { recursive: true });

try {
  execFileSync('tar', ['-xf', tarPath, '--overwrite', '-C', web], { stdio: 'inherit' });
} catch {
  throw new Error('Source TAR extraction failed after all archive parts were decompressed.');
}

if (!existsSync(join(web, 'package.json'))) {
  throw new Error('Extracted application does not contain web/package.json.');
}

console.log(`HireMind AI source extracted successfully from ${parts.length} compressed parts.`);
