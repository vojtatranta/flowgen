/* @flow */
import type { RawNode } from "../nodes/node";

import namespaceManager from "../namespaceManager";
import printers from "./index";

export const moduleExports = (node: RawNode): string => {
  let name = printers.node.printType(node.expression);

  return `declare module.exports: typeof ${name}`;
};

export const exporter = (node: RawNode): string => {
  let str = "";

  if (
    node.modifiers &&
    node.modifiers.some(modifier => modifier.kind === "ExportKeyword")
  ) {
    str += "export ";
  }

  if (
    node.modifiers &&
    node.modifiers.some(modifier => modifier.kind === "DefaultKeyword")
  ) {
    str += "default ";
  }

  return str;
};

export const imports = (node: ImportNode, moduleName: string): string => {
  let str = "import type ";
  const importClause = node.importClause

  // if (node.default) {
  //   str += node.default;

  //   if (node.explicit.length) {
  //     str += ", ";
  //   }
  // }

  let nameImports = []
  if (importClause.namedBindings) {
    nameImports = importClause.namedBindings.elements.map((element) => {
      return `${element.name.text},`
    })
  } else {
    str += `${importClause.name.text}`
  }

  if (nameImports.length) {
    str += `{ ${nameImports.join(", ")} }`;
  }

  str += ` from '${moduleName}'\n\n`;

  return str;
};

export const namespace = (name: string, hidePunctuation: boolean = false) => {
  if (namespaceManager.nsExists(name)) {
    return `${name}${hidePunctuation ? "" : "$"}`;
  }

  return name + (hidePunctuation ? "" : ".");
};

export const namespaceProp = (name: string) => {
  if (namespaceManager.nsPropExists(name)) {
    return `${namespaceManager.getNSForProp(name)}$${name}`;
  }

  return name;
};
