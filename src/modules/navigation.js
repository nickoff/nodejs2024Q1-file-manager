export const up = (arg) => {
  if (arg.length === 0) {
    process.chdir('..');
  } else {
    throw new Error('Operation failed');
  }
}

export const cd = (path) => {
  if (path.length === 1) {
    process.chdir(path[0]);
  } else {
    throw new Error('Operation failed');
  }
}
