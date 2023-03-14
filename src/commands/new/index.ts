import { Args, Command, Flags } from "@oclif/core";

export default class NewCommand extends Command {
  static summary = "Create new content for your site";

  static description = `
Create a new content file and automatically set the date and title.
It will guess which kind of file to create based on the path provided.

If archetypes are provided in your theme or site, they will be used.

Ensure you run this within the root directory of your site.`;

  static flags = {
    kind: Flags.string({
      char: "k",
      default: "",
      description: "content type to create",
    }),
    force: Flags.boolean({
      char: "f",
      default: false,
      description: "overwrite file if it already exists",
    }),
  };

  static args = {
    path: Args.string({ required: true }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(NewCommand);

    this.log(
      `hello ${args.path} from ${flags.kind}, ${flags.force}! (./src/commands/hello/index.ts)`
    );
  }
}
