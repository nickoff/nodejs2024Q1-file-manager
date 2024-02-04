import * as fs from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { join, resolve } from 'node:path';
import { pipeline } from 'node:stream';
import { errMsg } from '../modules/constant.js';

export const cat = async (arg) => {
  if (arg.length === 1) {
    try {
      const currentDir = process.cwd();
      const path = join(currentDir, arg[0]);
      const isFile = (await fs.stat(path)).isFile();

      if (!isFile) {
        throw errMsg.operation;
      }

      await new Promise ((res) => {
        const rs = createReadStream(path, { encoding: 'utf8' })
        let data = '';
        rs.on('data', (chunk) => {
          data += chunk;
        });
        rs.on('end', () => {
          process.stdout.write(data);
          res();
        })
        rs.on('error', () => {
          throw errMsg.operation;
        })
      })
      
    } catch {
      throw errMsg.operation;
    }
  } else {
    throw errMsg.operation;
  }
}

export const add = async (arg) => {
  if (arg.length === 1) {
    try {
      const currentDir = process.cwd();
      const path = join(currentDir, arg[0]);

      await fs.writeFile(path, '');
      
    } catch {
      throw errMsg.operation;
    }
  } else {
    throw errMsg.operation;
  }
}

export const rn = async (arg) => {
  if (arg.length === 2) {
    try {
      const currentDir = process.cwd();
      const oldPath = join(currentDir, arg[0]);
      const newPath = join(currentDir, arg[1]);

      await fs.rename(oldPath, newPath);
      
    } catch {
      throw errMsg.operation;
    }
  } else {
    throw errMsg.operation;
  }
}

export const mv = async (arg) => {
  if (arg.length === 2) {
    try {
      const currentDir = process.cwd();
      const oldPath = join(currentDir, arg[0]);
      const isFile = (await fs.stat(oldPath)).isFile();

      if (!isFile) {
        throw errMsg.operation;
      }

      const newPathDir = resolve(currentDir, arg[1]);
      const newPath = join(newPathDir, arg[0]);
      await copyFile(oldPath, newPath);
      await fs.rm(oldPath);
    } catch {
      throw errMsg.operation;
    }
  } else {
    throw errMsg.operation;
  }
}

export const cp = async (arg) => {
  if (arg.length === 2) {
    try {
      const currentDir = process.cwd();
      const oldPath = join(currentDir, arg[0]);
      const isFile = (await fs.stat(oldPath)).isFile();

      if (!isFile) {
        throw errMsg.operation;
      }

      const newPathDir = resolve(currentDir, arg[1]);
      const newPath = join(newPathDir, arg[0]);
      await copyFile(oldPath, newPath);
    } catch {
      throw errMsg.operation;
    }
  } else {
    throw errMsg.operation;
  }
}

export const rm = async (arg) => {
  if (arg.length === 1) {
    try {
      const currentDir = process.cwd();
      const path = join(currentDir, arg[0]);
      const isFile = (await fs.stat(path)).isFile();

      if (!isFile) {
        throw errMsg.operation;
      }

      await fs.rm(path);
      
    } catch {
      throw errMsg.operation;
    }
  } else {
    throw errMsg.operation;
  }
}

function copyFile(oldPathFile, newPathFile) {
  return new Promise ((res, rej) => {
    pipeline(
      createReadStream(oldPathFile),
      createWriteStream(newPathFile),
      (err) => {
        if (err) {
          rej(err);
        } else {
          res();
        }
    })
  });
}
