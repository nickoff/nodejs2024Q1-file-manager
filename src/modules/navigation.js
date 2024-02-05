import fs from 'node:fs/promises';
import { errMsg } from './constant.js';
export const up = (arg) => {
  if (arg.length === 1) {
    process.chdir('..');
  } else {
    throw errMsg.operation;
  }
}

export const cd = (path) => {
  if (path.length === 1) {
    process.chdir(path[0]);
  } else {
    throw errMsg.operation;
  }
}

export const ls = async (arg) => {
  try {
    if (arg.length === 1) {
      const currentDir = process.cwd();
      const files = (await fs.readdir(currentDir))
      let filesWithTypes = await Promise.all(files.map(async (file) => {
        return {
          Name: file,
          Type: await getType(`${currentDir}/${file}`)
        }
      }))

      filesWithTypes = filesWithTypes.sort((a, b) => {
        if (a.Type !== b.Type) {
          return a.Type === 'directory' ? -1 : 1;
        }
        return a.Name.localeCompare(b.Name);
      });
    
      console.table(filesWithTypes);
    } else {
      throw errMsg.operation;
    }
  } catch {
    throw errMsg.operation;
  }
}

async function getType(path) {
  const stat = await fs.stat(path);
  if (stat.isFile()) {
    return 'file';
  } else if (stat.isDirectory()) {
    return 'directory';
  } else {
    return 'unknown';
  }
}