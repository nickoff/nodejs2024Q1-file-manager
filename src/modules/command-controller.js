import { up, cd, ls } from './navigation.js';
import { cat, add } from './basic-file-operation.js';

export const commandController = {
  'up': up,
  'cd': cd,
  'ls': ls,
  'cat': cat,
  'add': add
}