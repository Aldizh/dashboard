module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'] // Specify it only for TypeScript files
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    "camelcase": "off",
    "react/react-in-jsx-scope": "off", // avoid the need for import react statement
    "@typescript-eslint/quotes": [
      "error",
      "double",
      {
        "avoidEscape": true,
        "allowTemplateLiterals": true
      }
    ],
    "@typescript-eslint/prefer-nullish-coalescing": "warn",
    "@typescript-eslint/no-explicit-any": ["off"], // override
    "@typescript-eslint/no-explicit-any": ["off"], // override
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
