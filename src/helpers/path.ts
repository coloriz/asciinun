import { PathLike, Stats } from "node:fs";
import * as fs from "node:fs/promises";

export const isDir = async (path: PathLike): Promise<boolean> => {
  let stats: Stats;

  try {
    stats = await fs.stat(path);
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    if (err.code === "ENOENT") {
      return false;
    }
    throw error;
  }

  return stats.isDirectory();
};

export const isEmpty = async (path: PathLike): Promise<boolean> => {
  return (await fs.readdir(path)).length == 0;
};

export const exists = async (path: PathLike): Promise<boolean> => {
  try {
    await fs.access(path);
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    if (err.code === "ENOENT") {
      return false;
    }
    throw error;
  }
  return true;
};
