import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const parts = readdirSync(root)
  .filter((name) => /^HireMind-AI-source\.part\d+\.b64$/.test(name))
  .sort((a, b) => Number(a.match(/part(\d+)/)?.[1]) - Number(b.match(/part(\d+)/)?.[1]));

if (parts.length === 0) throw new Error('No source archive parts found.');

const out = join(root, 'HireMind-AI-source.tgz');
const buffers = parts.map((file) => Buffer.from(readFileSync(join(root, file), 'utf8').replace(/\s+/g, ''), 'base64'));
const archive = Buffer.concat(buffers);
writeFileSync(out, archive);

// Validate gzip before tar extraction. This produces a useful error instead of tar's opaque status 1.
if (archive.length < 2 || archive[0] !== 0x1f || archive[1] !== 0x8b) {
  throw new Error(`Reconstructed source archive is not valid gzip (size=${archive.length}, header=${archive.subarray(0, 8).toString('hex')}).`);
}

const web = join(root, 'web');
if (existsSync(web)) rmSync(web, { recursive: true, force: true });
mkdirSync(web, { recursive: true });

try {
  execFileSync('tar', ['-xzf', out, '--overwrite', '-C', web], { stdio: 'inherit' });
} catch {
  throw new Error('Source archive extraction failed. The archive parts in GitHub are inconsistent or truncated.');
}

if (!existsSync(join(web, 'package.json'))) {
  throw new Error('Extracted application does not contain web/package.json.');
}

console.log(`HireMind AI source extracted successfully from ${parts.length} archive parts.`);
