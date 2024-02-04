import { up, cd, ls } from './navigation.js';
import { cat, add, rn, cp, mv, rm } from './basic-file-operation.js';
import { osInfo } from './os-system-info.js';

export const commandController = {
  'up': up,
  'cd': cd,
  'ls': ls,
  'cat': cat,
  'add': add,
  'rn': rn,
  'cp': cp,
  'mv': mv,
  'rm': rm,
  'os': osInfo
}