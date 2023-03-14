import * as fs from "node:fs/promises";
import * as path from "node:path";

import { Args, Command, Flags } from "@oclif/core";
import { CLIError } from "@oclif/errors";

import * as helpers from "@/helpers";

export default class NewSiteCommand extends Command {
  static summary = "Create a new site (skeleton)";

  static description = `
Create a new site in the provided directory.
The new site will have the correct structure, but no content or theme yet.`;

  static flags = {
    force: Flags.boolean({
      default: false,
      description: "init inside non-empty directory",
    }),
  };

  static args = {
    path: Args.string({ required: true }),
  };

  async run(): Promise<void> {
    const { flags, args } = await this.parse(NewSiteCommand);

    const createpath = path.resolve(path.normalize(args.path));

    const forceNew = flags.force;

    await doNewSite(createpath, forceNew);
  }
}

const doNewSite = async (basepath: string, force: boolean) => {
  const dirs = [
    path.join(basepath, "content"),
    path.join(basepath, "data"),
    path.join(basepath, "layouts"),
    path.join(basepath, "static"),
    path.join(basepath, "themes"),
  ];

  if (await helpers.exists(basepath)) {
    if (!(await helpers.isDir(basepath))) {
      throw new CLIError(`${basepath} already exists but not a directory`);
    }

    const isEmpty = await helpers.isEmpty(basepath);

    if (!isEmpty && !force) {
      throw new CLIError(
        `${basepath} already exists and is not empty. See --force.`
      );
    } else if (!isEmpty && force) {
      const all = [...dirs, path.join(basepath, "config.toml")];
      for (const path of all) {
        if (await helpers.exists(path)) {
          throw new CLIError(`${path} already exists`);
        }
      }
    }
  }

  await Promise.all(dirs.map((dir) => fs.mkdir(dir, { recursive: true })));

  createConfig(basepath);

  // TODO: Create a default archetype file.
};

const createConfig = (inpath: string) => {
  const config = new Map<string, string>();
  config.set("baseURL", "http://example.org/");
  config.set("title", "My New Hugo Site");
  config.set("languageCode", "en-US");
  console.log(inpath);

  // TODO: convert to toml and save
};
