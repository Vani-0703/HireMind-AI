import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const web = join(root, 'web');

// Prefer a real checked-in web application. This is the production path and
// avoids depending on an archived/binary source bundle during Vercel builds.
if (existsSync(join(web, 'package.json'))) {
  console.log('HireMind AI: using checked-in web application.');
  process.exit(0);
}

// Legacy fallback for repositories that still contain the original bundle.
const bundle = join(root, 'bundle');
if (!existsSync(bundle)) throw new Error('HireMind AI source is missing: web/ and bundle/ are both unavailable.');
const parts = readdirSync(bundle).filter((name) => /^part\d+\.b64$/.test(name)).sort((a,b) => Number(a.match(/\d+/)?.[0]) - Number(b.match(/\d+/)?.[0]));
if (!parts.length) throw new Error('HireMind AI source bundle has no archive parts.');
const chunks = parts.map((file) => Buffer.from(readFileSync(join(bundle, file), 'utf8').replace(/\s+/g,''), 'base64'));
const archivePath = join(root, 'HireMind-AI-source.tgz');
writeFileSync(archivePath, Buffer.concat(chunks));
mkdirSync(web, { recursive: true });
try { execFileSync('tar', ['-xzf', archivePath, '--overwrite', '-C', web], {stdio:'inherit'}); }
catch { throw new Error('Legacy source archive is corrupted. Use the checked-in web/ application instead.'); }
if (!existsSync(join(web,'package.json'))) throw new Error('Source extraction completed without web/package.json.');
console.log('HireMind AI: legacy source extracted.');
