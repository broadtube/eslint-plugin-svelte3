export const processor_options = {};

// find Linter instance

const Linter = window.Linter || Linter;
if (!Linter) {
  throw new Error("Could not find ESLint Linter in require cache");
}

// patch Linter#verify
const { verify } = Linter.prototype;
Linter.prototype.verify = function (code, config, options) {
  // fetch settings
  const settings =
    (config &&
      (typeof config.extractConfig === "function"
        ? config.extractConfig(options.filename)
        : config
      ).settings) ||
    {};
  processor_options.custom_compiler = settings["svelte3/compiler"];
  processor_options.ignore_warnings = settings["svelte3/ignore-warnings"];
  processor_options.ignore_styles = settings["svelte3/ignore-styles"];
  processor_options.compiler_options = settings["svelte3/compiler-options"];
  processor_options.named_blocks = settings["svelte3/named-blocks"];
  processor_options.typescript = settings["svelte3/typescript"];
  // call original Linter#verify
  return verify.call(this, code, config, options);
};
