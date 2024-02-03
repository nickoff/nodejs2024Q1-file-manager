import fs from 'node:fs/promises';
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

export const ls = async (arg) => {
  try {
    if (arg.length === 0) {
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
      throw new Error('Operation failed');
    }
  } catch {
    throw new Error('Operation failed');
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