import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

const archive='HireMind-AI-source.tgz';
if (!fs.existsSync(archive)) throw new Error(`Missing ${archive}`);
execFileSync('tar',['-xzf',archive,'--overwrite'],{stdio:'inherit'});
console.log('HireMind AI source extracted.');
