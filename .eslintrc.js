module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module", // allows for the use of imports
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    "@typescript-eslint/indent": [2, 2]
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
