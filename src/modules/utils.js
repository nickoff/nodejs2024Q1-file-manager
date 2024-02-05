export const argsToPath = (args) => {
  let paths = args.split(' ').reduce((acc, curr) => {
    if (curr.startsWith('"')) {
        acc.push(curr.replace(/"/g, ''));
    } else if (curr.endsWith('"')) {
        acc[acc.length - 1] += ' ' + curr.replace(/"/g, '');
    } else if (!acc[acc.length - 1].endsWith('"')) {
        acc.push(curr);
    } else {
        acc[acc.length - 1] += ' ' + curr;
    }
    return acc;
  }, []);
  return paths;
}