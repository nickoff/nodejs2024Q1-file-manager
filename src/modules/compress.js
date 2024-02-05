import * as fs from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { join, resolve } from 'node:path';
import { pipeline } from 'node:stream';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { errMsg } from './constant.js';

export const compress = async (arg) => {
  if (arg.length === 2) {
    try {
      const currentDir = process.cwd();
      const pathToFile = join(currentDir, arg[0]);
      const isFile = (await fs.stat(pathToFile)).isFile();

      if (!isFile) {
        throw errMsg.operation;
      }

      const pathToDestination = join(currentDir, arg[1]);
      await compressFile(pathToFile, pathToDestination);
    } catch {
      throw errMsg.operation;
    }
  } else {
    throw errMsg.operation;
  }
}

export const decompress = async (arg) => {
  if (arg.length === 2) {
    try {
      const currentDir = process.cwd();
      const pathToFile = join(currentDir, arg[0]);
      const isFile = (await fs.stat(pathToFile)).isFile();

      if (!isFile) {
        throw errMsg.operation;
      }

      const pathToDestination = join(currentDir, arg[1]);
      await decompressFile(pathToFile, pathToDestination);
    } catch (e) {
      console.log(e)
      throw errMsg.operation;
    }
  } else {
    throw errMsg.operation;
  }
}

function compressFile(pathToFile, pathToDestination) {
  return new Promise ((res, rej) => {
    pipeline(
      createReadStream(pathToFile),
      createBrotliCompress(),
      createWriteStream(pathToDestination),
      (err) => {
        if (err) {
          rej(err);
        } else {
          res();
        }
    })
  });
}

function decompressFile(pathToFile, pathToDestination) {
  return new Promise ((res, rej) => {
    pipeline(
      createReadStream(pathToFile),
      createBrotliDecompress(),
      createWriteStream(pathToDestination),
      (err) => {
        if (err) {
          rej(err);
        } else {
          res();
        }
    })
  });
}