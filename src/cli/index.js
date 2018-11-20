#! /usr/bin/env node
/* @flow */
import { recursiveWalkTree } from "../parse";
import runner from "./runner";
import { version } from "../../package.json";

import program from "commander";

program
  .version(version)
  .option(
    "-o --output-file [outputFile]",
    "name for ouput file, defaults to export.flow.js",
    "export.flow.js",
  )
  .option("--flow-typed-format", "format output for flow-typed")
  .option("--compile-tests", "compile any <filename>-tests.ts files found")
  .option("--flow-pragma", "adds // @flow at the beginning of the file instead default meta text")
  .option("--no-default-export-interface", "transforms 'export default interface' to 'export interface'")
  .arguments("[files...]")
  .action((files, options) => {
    runner({
      flowTypedFormat: options.flowTypedFormat,
      compileTests: options.compileTests,
      flowPragma: options.flowPragma,
      defaultExportInterface: options.defaultExportInterface,
      out: options.outputFile,
      version,
    }).compile(files);
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
