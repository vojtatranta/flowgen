// @flow


import runner from "./src/cli/runner";
import { version } from "./package.json";

runner({
  flowTypedFormat: false,
  compileTests: false,
  flowPragma: true,
  defaultExportInterface: false,
  out: './flow/test.js',
  version,
}).compile([ './src/cli/__tests__/fixtures/import.d.ts' ])
