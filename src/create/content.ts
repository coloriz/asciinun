import { CLIError } from "@oclif/errors";

export const newContent = async (
  kind: string,
  targetPath: string,
  force: boolean
): Promise<void> => {
  if (kind === "") {
    kind = "hi";
  }

  const ext = "";

  if (ext === "") {
    throw new CLIError(
      `failed to resolve ${targetPath} to an archetype template`
    );
  }
};
