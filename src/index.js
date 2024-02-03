import * as readline from 'node:readline/promises';
import * as os from 'node:os';

const startArgs = process.argv.find(arg => arg.startsWith('--username'));
const username = startArgs?.split('=')[1] ?? 'Guest';
const homeUserDir = os.homedir();
process.chdir(homeUserDir);
console.log(`Welcome to the File Manager, ${username}!`);
printCWD();

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.prompt();
rl.on('line', (input) => {
  if (input.split(' ')[0] === '.exit') {
    rl.close();
  } else {
    console.log(`You entered command: ${input.split(' ')[0]}`);
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