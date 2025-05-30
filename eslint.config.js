import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    files: "custom/static/copy.js",
  },
];

// eslint.config.js
// Copyright 2024 Keith Maxwell
// SPDX-License-Identifier: MPL-2.0
