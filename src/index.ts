import Processor from "asciidoctor";
import { Command } from "commander";

import { newCommand } from "@/commands/new.js";

const processor = Processor();
console.log(processor.getCoreVersion());
console.log(processor.getVersion());
console.log(processor.getRuntime());

const program = new Command();

program.name("asciinun").description("this is a description").version("0.1.0");
program.addCommand(newCommand);

program.parse();
