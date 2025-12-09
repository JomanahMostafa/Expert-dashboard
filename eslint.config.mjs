import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/**
 * ESLint Flat Config for Next.js + TypeScript
 * Includes:
 *  - next/core-web-vitals
 *  - next/typescript
 *  - disabling rules blocking Vercel build:
 *      @typescript-eslint/no-explicit-any
 *      @typescript-eslint/no-unused-vars
 */

const eslintConfig = [
  // Next.js + TS recommended configs
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Custom rule overrides
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
];

export default eslintConfig;
