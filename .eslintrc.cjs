module.exports = {
  extends: [
    "eslint:recommended",
    ".eslintrc.gjs-guide.yml",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:promise/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    // See https://typescript-eslint.io/linting/typed-linting
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint", "promise"],
  root: true,
  rules: {},
  ignorePatterns: [
    // Build outputs
    "/build/**/*",
    "/dist/**/*",
    // Node modules
    "/node_modules/**/*",
    // Generated types
    "/@types/gir-generated/**/*",
  ],
};
