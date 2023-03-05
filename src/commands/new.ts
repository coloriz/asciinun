import { mkdirSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

import { Command } from "commander";

import * as helpers from "@/helpers";

export const newCommand = new Command("new")
  .argument("<path>")
  .option("--force", "init inside non-empty directory")
  .action((createpath: string, force: boolean) => {
    const basepath = resolve(createpath);
    const dirs = [
      join(basepath, "content"),
      join(basepath, "data"),
      join(basepath, "layouts"),
      join(basepath, "static"),
      join(basepath, "themes"),
    ];

    if (existsSync(basepath)) {
      if (!helpers.isDir(basepath)) {
        throw new Error(`${basepath} already exists but not a directory`);
      }

      const isEmpty = helpers.isEmpty(basepath);

      if (!isEmpty && !force) {
        throw new Error(
          `${basepath} already exists and is not empty. See --force.`
        );
      } else if (!isEmpty && force) {
        const all = [...dirs, join(basepath, "config.toml")];
        for (const path of all) {
          if (existsSync(path)) {
            throw new Error(`${path} already exists`);
          }
        }
      }
    }

    for (const dir of dirs) {
      mkdirSync(dir, { recursive: true });
    }

    createConfig(join(basepath, "config.toml"));
  });

const createConfig = (configpath: string) => {
  const config = new Map<string, string>();
  config.set("baseURL", "http://example.org/");
  config.set("title", "My New Hugo Site");
  config.set("languageCode", "en-US");
  console.log(configpath);

  // TODO: convert to toml and save
};
