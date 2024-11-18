import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";

export default [
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    languageOptions: { 
      globals: globals.browser 
    }
  },
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {
    rules: {
      'semi': 'off',
      'space-before-function-paren': 'off',
      'no-tabs': 'off',
      'no-trailing-spaces': 'off'
    }
  }
];