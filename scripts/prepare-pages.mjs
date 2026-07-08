import { copyFileSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const distDir = 'dist';
const indexPath = join(distDir, 'index.html');
const notFoundPath = join(distDir, '404.html');
const noJekyllPath = join(distDir, '.nojekyll');

if (existsSync(indexPath)) {
  copyFileSync(indexPath, notFoundPath);
}

if (!existsSync(noJekyllPath)) {
  writeFileSync(noJekyllPath, '');
}
