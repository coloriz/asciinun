import * as fs from "node:fs";

export const isDir = async (path: fs.PathLike): Promise<boolean> => {
  if (!fs.existsSync(path)) {
    return false;
  }

  return (await fs.promises.stat(path)).isDirectory();
};

export const isEmpty = async (path: fs.PathLike): Promise<boolean> => {
  return (await fs.promises.readdir(path)).length == 0;
};
