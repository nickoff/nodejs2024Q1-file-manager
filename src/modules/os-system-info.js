import * as os from 'node:os';
import { errMsg } from '../modules/constant.js';
export const osInfo = async (arg) => {
  if (arg.length === 1) {

    try {
      switch (arg[0]) {
        case '--EOL': console.log(JSON.stringify(os.EOL));
        break;
        case '--cpus': console.table(os.cpus().map((cpu) => {return { Model: cpu.model, Speed: (cpu.speed / 1000) + ' Ghz' }}));
        break;
        case '--homedir': console.log(os.homedir());
        break;
        case '--username': console.log(os.userInfo().username);
        break;
        case '--architecture': console.log(os.arch());
        break;
        default: throw errMsg.operation;
      }
      
    } catch {
      throw errMsg.operation;
    }
  } else {
    throw errMsg.operation;
  }
}