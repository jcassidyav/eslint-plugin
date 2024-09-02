// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from "node:url";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      parserOptions: {
        project: path.join(__dirname,"tsconfig.json")
      },
    },
    ignores: [ "node_modules",
        "dist",
        "reports",
        ],
    rules: {
            "@typescript-eslint/no-explicit-any": "off"
          }
  },
);