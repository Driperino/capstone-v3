import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // Disable unused variables rule
      "@typescript-eslint/no-explicit-any": "off", // Allow the use of `any` type
      "react-hooks/exhaustive-deps": "warn", // Warn for missing useEffect dependencies instead of erroring
      "@next/next/no-img-element": "off", // Allow <img> tags instead of enforcing <Image />
      "react/no-unescaped-entities": "off", // Allow unescaped characters like single quotes
    },
  },
];

export default eslintConfig;
