import * as fs from 'node:fs/promises';
import { createReadStream } from 'fs';
import { join } from 'path';

export const cat = async (arg) => {
  if (arg.length === 1) {
    try {
      const currentDir = process.cwd();
      const path = join(currentDir, arg[0]);
      const isFile = (await fs.stat(path)).isFile();

     if (!isFile) {
        throw new Error('Operation failed');
      }

      await new Promise ((resolve) => {
        const rs = createReadStream(path, { encoding: 'utf8' })
        let data = '';
        rs.on('data', (chunk) => {
          data += chunk;
        });
        rs.on('end', () => {
          process.stdout.write(data);
          resolve();
        })
        rs.on('error', () => {
          throw new Error('Operation failed');
        })
      })
      
    } catch {
      throw new Error('Operation failed');
    }
  } else {
    throw new Error('Operation failed');
  }
}

export const add = async (arg) => {
  if (arg.length === 1) {
    try {
      const currentDir = process.cwd();
      const path = join(currentDir, arg[0]);

      await fs.writeFile(path, '');
      
    } catch {
      throw new Error('Operation failed');
    }
  } else {
    throw new Error('Operation failed');
  }
}