import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Fichiers générés par Payload : leur signature impose des paramètres
    // inutilisés, et les corriger serait écrasé à la prochaine génération.
    "src/migrations/**",
    "src/payload-types.ts",
    "src/app/(payload)/admin/importMap.js",
  ]),
]);

export default eslintConfig;
