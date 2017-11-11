module.exports = {
  "extends": [
    "airbnb",
    "plugin:flowtype/recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/flowtype",
    "prettier/react"
  ],
  "plugins": [
    "jsx-a11y",
    "flowtype",
    "react",
    "prettier",
  ],
  "parserOptions": {
    "ecmaVersion": 2016,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "jest": true,
    "es6": true,
    "node": true
  },
  "globals": {
    "document": false,
    "jasmine": false,
    "fetch": false,
    "window": false,
    "navigator": false,
    "isNaN": false,
    "URL": false
  },
  "rules": {
    "react/jsx-no-bind": 0,
    "import/no-unresolved": 0,
    "react/jsx-filename-extension": 0,

    "no-console": 0,
    "no-restricted-globals": 0,
    "react/forbid-prop-types": 0,
    "import/no-extraneous-dependencies": ["error", {"devDependencies": [
      "**/*.test.js",
      "tests/**/*.js",
      "**/*.stories.js"
    ]}],
    "camelcase": 0,
    "import/first": 0,
    "global-require": 0,
    "jsx-a11y/href-no-hash": 0,
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "react/require-default-props": 0,
    "react/display-name": 0,
    "react/prop-types": 0,
    "react/no-array-index-key": 0,
    "import/extensions": ["error", "never", {
      js: "never",
      jsx: "never",
    }],
    "prettier/prettier": ["error", {
      printWidth: 80,
      jsxBracketSameLine: true,
      singleQuote: true,
      semi: false
    }],
  },
}
