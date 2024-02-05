import * as fs from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { join } from 'node:path';
import { errMsg } from './constant.js';
import { createHash } from 'node:crypto';

export const hash = async (arg) => {
  if (arg.length === 1) {
    try {
      const currentDir = process.cwd();
      const filePath = join(currentDir, arg[0]);
      const isFile = (await fs.stat(filePath)).isFile();

      if (!isFile) {
        throw errMsg.operation;
      }

      const rs = createReadStream(filePath);
      const hash = createHash('sha256');

      for await (const chunk of rs) {
        hash.update(chunk);
      }

      console.log(hash.digest('hex'));
    } catch {
      throw errMsg.operation;
    }
  } else {
    throw errMsg.operation;
  }
}