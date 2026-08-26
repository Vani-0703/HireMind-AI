import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

// The source archive was split into independently base64-encoded byte chunks.
// Decode each chunk first, then concatenate the resulting bytes. Joining the
// base64 strings corrupts the gzip stream when a chunk boundary is not aligned
// to a 3-byte base64 boundary.
const parts = fs
  .readdirSync('bundle')
  .filter((x) => /^part\d+\.b64$/.test(x))
  .sort((a, b) => Number(a.match(/\d+/)?.[0]) - Number(b.match(/\d+/)?.[0]));

if (!parts.length) throw new Error('Missing source bundle parts');

const chunks = parts.map((p) => Buffer.from(fs.readFileSync(`bundle/${p}`, 'utf8').trim(), 'base64'));
const archive = Buffer.concat(chunks);
fs.writeFileSync('HireMind-AI-source.tgz', archive);

execFileSync('tar', ['-xzf', 'HireMind-AI-source.tgz', '--overwrite'], { stdio: 'inherit' });
console.log(`HireMind AI source extracted from ${parts.length} archive parts.`);
