import { createFilter } from "@rollup/pluginutils";
import fs from "fs";
import path from "path";
import { promisify } from "util";
const readFile = promisify(fs.readFile);
import * as compiler from "vue-template-compiler";
import * as htmlparser from "htmlparser2";
import { parse } from "@vue/component-compiler-utils";

export default function vueExtends() {
  const filter = createFilter("**/*.vue");
  return {
    name: "rollup-plugin-vue-extends", // this name will show up in warnings and error
    async transform(code, id) {
      if (filter(id)) {
        console.log(id);

        const result = await getMergedCode(code, path.dirname(id), null, this);
        // console.log(code);
        return {
          code: result.source,
          map: { mappings: "" },
        };
      }
      return;
    },
  };
}

const defaultOptions = {
  EXT_POINT_TAG: "extension-point",
  EXTENSIONS_TAG: "extensions",
  EXTENSION_TAG: "extension",
  SUPER_TAG: "extension-super",
  EXT_POINT_NAME_ATTR: "name",
  EXT_POINT_REF_ATTR: "point",
  EXTENDABLE_ATTR: "extendable",
  EXTENDS_ATTR: "extends",
};
let options = defaultOptions;

//OK
const getMergedCode = async function (Source, basePath, aliases, context) {
  let { source, ancestorsPaths } = await resolveComponent(
    Source,
    basePath,
    aliases,
    context
  );

  // Remove comment lines at beginning of script block that were generated by the SFC parser
  let finalDescriptor = toDescriptor(source);
  if (finalDescriptor.script) {
    finalDescriptor.script.content = finalDescriptor.script.content.replace(
      /^(\/\/\n)+/,
      ""
    );
  }
  // Change all extension points to <template> on the final component to display fallback content
  if (
    finalDescriptor.template &&
    finalDescriptor.template.attrs[options.EXTENDABLE_ATTR]
  ) {
    let finalDom = parseDOM(finalDescriptor.template.content);
    findDomElementsByTagName(finalDom, options.EXT_POINT_TAG).forEach((ext) => {
      ext.name = "template";
      delete ext.attribs[options.EXT_POINT_NAME_ATTR];
    });
    source = `<template>
                ${htmlparser.DomUtils.getOuterHTML(finalDom)}
              </template>
              ${descriptorToHTML(finalDescriptor)}`;
  }
  return { source, ancestorsPaths };
};
//OK
let processComponent = async (baseAbsPath, aliases, currentDesc, context) => {
  const contents = await readFile(baseAbsPath, "utf8");
  // Resolve the base component recursively to support inheritance in N levels
  let basePath = path.dirname(baseAbsPath);
  const { source, ancestorsPaths } = await resolveComponent(
    contents,
    basePath,
    aliases,
    context
  );
  // Add this ancestor to the ancestors return array to add as dependencies for HMR
  ancestorsPaths.push(baseAbsPath);

  let baseDescriptor = toDescriptor(source);

  let baseDom = parseDOM(baseDescriptor.template.content);
  let currentDom = parseDOM(currentDesc.template.content);

  // Get all the child's component extensions
  let extensions = currentDom
    .find((node) => (node.type = "tag" && node.name === options.EXTENSIONS_TAG))
    .children.filter(
      (node) => (node.type = "tag" && node.name === options.EXTENSION_TAG)
    );

  // Replace each of the Base component's extension points with the child's extensions
  findDomElementsByTagName(baseDom, options.EXT_POINT_TAG).forEach(
    (extPoint) => {
      // Find the extend block for the current extension point
      let extendBlock = extensions.find(
        (node) =>
          node.attribs[options.EXT_POINT_REF_ATTR] ===
          extPoint.attribs[options.EXT_POINT_NAME_ATTR]
      );

      // If a extend block matching the extension point was found, replace the point's content with the extend block's
      if (extendBlock) {
        let defaultContent = extPoint.children;
        extPoint.children = extendBlock.children;

        findDomElementsByTagName(extPoint.children, options.SUPER_TAG).forEach(
          (zuper) => {
            zuper.name = "template";
            zuper.children = defaultContent;
          }
        );

        // Change extension point tag to a template tag
        extPoint.name = "template";
        delete extPoint.attribs[options.EXT_POINT_NAME_ATTR];
      }
    }
  );

  // Resolve promise with the new generated SFC
  return {
    source: `<template ${options.EXTENDABLE_ATTR}>
               ${htmlparser.DomUtils.getOuterHTML(baseDom)}
             </template>
             ${descriptorToHTML(currentDesc)}`,
    ancestorsPaths,
  };
};
//OK
async function resolveComponent(currentSource, basePath, aliases, context) {
  let currentDesc = toDescriptor(currentSource);

  let baseAbsPath;

  // If the component extends another, resolve its source merging it with the base component
  // else return code as is
  if (
    currentDesc.template &&
    currentDesc.template.attrs[options.EXTENDS_ATTR]
  ) {
    let baseRelPath = currentDesc.template.attrs[options.EXTENDS_ATTR];
    console.log("baseRelPath", baseRelPath);
    // If there's a matching alias, use it. If not, use the context path
    if (aliases) {
      var matchingAlias = Object.keys(aliases).find((k) => {
        let regex = new RegExp(k);
        return regex.test(baseRelPath);
      });
      if (baseRelPath.substr(-4).toLowerCase() != ".vue") {
        baseRelPath = baseRelPath + ".vue";
      }
      if (matchingAlias) {
        baseAbsPath = baseRelPath.replace(
          new RegExp(matchingAlias),
          aliases[matchingAlias]
        );
      } else {
        baseAbsPath = path.join(basePath, baseRelPath);
      }
      return processComponent(baseAbsPath, aliases, currentDesc, context);
    } else {
      baseAbsPath = path.resolve(basePath, baseRelPath);
      console.log({ basePath, baseRelPath, baseAbsPath });
      // console.log("baseAbsPath", baseAbsPath);
      return processComponent(baseAbsPath, aliases, currentDesc, context);
    }
  } else {
    return { source: currentSource, ancestorsPaths: [] };
  }
}

/**
 * Returns the SFC descriptor for a given SFC sourcecode
 * @param source
 */
const parseDOM = (source) => {
  // Use recognizeSelfClosing option to handle tags like <spacer />
  // Disable lowerCaseTags option to avoid turning things like MyComponent to mycomponent
  return htmlparser.parseDOM(source, {
    recognizeSelfClosing: true,
    lowerCaseTags: false,
  });
};

/**
 * Returns the SFC descriptor for a given SFC sourcecode
 * @param source
 */
const toDescriptor = (source) =>
  parse({
    source,
    compiler,
    needMap: false,
  });

const findDomElementsByTagName = (dom, tag) =>
  htmlparser.DomUtils.findAll(
    (node) => node.type === "tag" && node.name === tag,
    dom
  );

/**
 * Given a SFC's descriptor, returns the SFC's source **without** the template part
 * @param descriptor - SFC descriptor
 * @returns {string} - SFC source code
 */
const descriptorToHTML = (descriptor) =>
  descriptor.customBlocks
    .filter((cb) => cb.type !== options.EXTENSION_TAG)
    .map((cb) => blockToHTML(cb))
    .join("\n") +
  blockToHTML(descriptor.script) +
  descriptor.styles.map((cb) => blockToHTML(cb)).join("\n");

function blockToHTML(block) {
  if (block) {
    let attrToHtmlAttr = ([key, value]) => ` ${key}="${value}" `;
    let attrs = Object.entries(block.attrs).reduce(
      (accum, curr) => accum + attrToHtmlAttr(curr),
      ""
    );
    return `<${block.type} ${attrs}>${block.content}</${block.type}>`;
  }
}
