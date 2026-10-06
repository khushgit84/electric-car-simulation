import fs from 'fs';
import path from 'path';

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'dist' || file === 'public' || file.endsWith('.mp4') || file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.ico') || file.endsWith('.lock') || file.endsWith('.yaml')) {
      continue;
    }
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('Vexlora') || content.includes('VEXLORA')) {
        content = content.replace(/Vexlora/g, 'Vexlora').replace(/VEXLORA/g, 'VEXLORA');
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

replaceInDir(process.cwd());
