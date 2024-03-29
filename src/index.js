import * as readline from 'node:readline/promises';
import * as os from 'node:os';
import { commandController } from './modules/command-controller.js';
import { errMsgText } from './modules/constant.js';

const startArgs = process.argv.find(arg => arg.startsWith('--username'));
const username = startArgs?.split('=')[1] ?? 'Guest';
const homeUserDir = os.homedir();
process.chdir(homeUserDir);

console.log('\x1b[31m\x1b[1m%s\x1b[0m',
`ATTENTION !!!
If there are spaces in the path, the path should be put in quotes
(if there are more than one path in the command, both should be put in quotes).
Example: add "./new file.txt" or cp "file.txt" "new file.txt"`);
console.log(`Welcome to the File Manager, ${username}!`);
printCWD();

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.prompt();
rl.on('line', async (input) => {
  if (input.split(' ')[0] === '.exit') {
    rl.close();
  } else {
    try {
      let args = input.split(' ').slice(1).join(' ');
      if (args.startsWith('"')) {
        args = args.split('"').filter(args => args !== '' && args !== ' ');

      } else if (args.startsWith("'")) {
        args = args.split("'").filter(args => args !== '' && args !== ' ');
      } else {
        args = args.split(' ');
      }

      await commandController[input.split(' ')[0]](args);
    } catch (e) {
      if (e.message === errMsgText.operation) {
        console.log(e.message);
      } else {
        console.log(errMsgText.input);
      }
    };
  }
  printCWD()
  rl.prompt();
});

rl.on('close', exit);
rl.on('SIGINT', exit);

function printCWD() {
  const currentDir = process.cwd();
  console.log(`You are currently in: ${currentDir}`);
}

function exit() {
  console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
}