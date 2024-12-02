// Copyright Sebastian Wiesner <sebastian@swsnr.de>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0.If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

// @ts-check

import gsebuild from "@swsnr/gsebuild/eslint";
import eslintConfigPrettier from "eslint-config-prettier";

// Consider eslint-plugin-promise again once it supports flat config,
// see https://github.com/eslint-community/eslint-plugin-promise/issues/449

export default [
  ...gsebuild.configs.typescript,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        // @ts-ignore
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  eslintConfigPrettier,
  // Global ignores, see https://eslint.org/docs/latest/use/configure/configuration-files#globally-ignoring-files-with-ignores
  // "ignores" must be the _only_ key in this object!
  {
    ignores: [
      // eslint configs
      "eslint.config.*",
      // Build outputs
      "build/**/*",
      "dist/**/*",
      // Packages
      "node_modules/**",
    ],
  },
];
