module.exports = {
  env: {
    "node": true,
    "browser": true,
    "es6": true
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript"
  ],
  globals: {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  parserOptions: {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  plugins: [
    "@typescript-eslint"
  ],
  settings: {
    "import/resolver": {
      "node": { 
        "paths": ["src", "src/controllers", "src/models", "src/framework", "src/services"]
      }
    }
  },
  rules: {
    "@typescript-eslint/indent": ["error", 2, { "SwitchCase": 1 }], 
    "@typescript-eslint/interface-name-prefix": "off",
    "max-len": ["warn", { 
      "code": 115, 
      "ignoreUrls": true, 
      "ignoreStrings": true, 
      "ignoreComments": true, 
      "ignoreTemplateLiterals": true 
    }],
    "keyword-spacing": "error",
    "arrow-spacing": "error",
    "space-infix-ops": "error",
    "space-before-blocks": ["error", { 
      "functions": "always", 
      "keywords": "always", 
      "classes": "always" 
    }], 
    "no-multi-spaces": "error",
    "object-curly-spacing": ["warn", "always"],
    "semi": "error",
    "no-console": "warn",
    "no-multiple-empty-lines": "error",
    "no-empty": "off",
    "quotes": ["error", "single", { "allowTemplateLiterals": true }],
    "import/order": ["error", {
      "groups": ["builtin", "external", "internal", "parent", "sibling", "index"], 
      "newlines-between": "always-and-inside-groups", 
      "alphabetize": {
        "order": 'asc',
        "caseInsensitive": true
      }, 
      "pathGroups": [
        {
          "pattern": "controlers/**",
          "group": "internal"
        },
        {
          "pattern": "models/**",
          "group": "internal"
        },
        {
          "pattern": "framework/**",
          "group": "internal"
        },
        {
          "pattern": "services/**",
          "group": "internal"
        },
      ],
    }], 
    "import/newline-after-import": ["error", { "count": 1 }]
  }
}