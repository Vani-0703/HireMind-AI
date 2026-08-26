import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
const parts = fs.readdirSync('bundle').filter((x) => /^part\d+\.b64$/.test(x)).sort();
if (!parts.length) throw new Error('Missing source bundle parts');
const b64 = parts.map((p) => fs.readFileSync(`bundle/${p}`, 'utf8').trim()).join('');
fs.writeFileSync('HireMind-AI-source.tgz', Buffer.from(b64, 'base64'));
execFileSync('tar', ['-xzf', 'HireMind-AI-source.tgz', '--overwrite'], { stdio: 'inherit' });
console.log('HireMind AI source extracted.');
