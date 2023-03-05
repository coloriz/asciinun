import { PathLike, readdirSync, statSync } from "node:fs";

export const isDir = (path: PathLike): boolean => {
  const stat = statSync(path, { throwIfNoEntry: false });

  if (stat == undefined) {
    return false;
  }

  return stat.isDirectory();
};

export const isEmpty = (path: PathLike): boolean => {
  return readdirSync(path).length == 0;
};
