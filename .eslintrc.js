module.exports = {
  "parser": "babel-eslint",
  "extends": ["airbnb", "eslint:all", "plugin:react/all"],
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "globals": {
    "configuration": true,
    "logger": true,
    "_development_": true
  },
  "rules": {
    "indent": ["error", 2],
    "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
    "react/jsx-indent-props": [2, 2],
    "react/jsx-filename-extension": [1, {
      "extensions": [".js", ".jsx"]
    }],
    "arrow-body-style": 0,
    "sort-keys": 0,
    "no-plusplus": 0,
    "arrow-parens": [1, "as-needed"],
    "no-extra-parens": 0,
    "no-magic-numbers": 0,
    "no-shadow": ["error", { "builtinGlobals": false, "hoist": "never", "allow": ["route"] }],
    "max-statements": [2, 30, {"ignoreTopLevelFunctions": true}],
    "jsx-quotes": [0, "prefer-single"],
    "object-curly-newline": 0,
    "id-length": ["error", { "min": 1 }],
    "sort-imports": 0,
    "max-params": 0,
    "no-process-exit": 0,
    "func-style": 0,
    "func-names": 0,
    "no-ternary": 0,
    "multiline-ternary": 0,
    "no-invalid-this": 0,
    "class-methods-use-this": 0,
    "import/no-unresolved": [2, { ignore: ['\assets/\/*'] }],
    "react/sort-prop-types": 0,
    "react/no-set-state": 0,
    "react/jsx-max-props-per-line": 0,
    "react/jsx-no-literals": 0,
    "react/jsx-no-bind": 0,
    "react/jsx-sort-props": 0,
    "react/forbid-prop-types": 0,
    'react/jsx-closing-bracket-location': 0,
    "react/sort-comp": [2, {
      "order": [
        "mixins",
        "displayName",
        "propTypes",
        "contextTypes",
        "childContextTypes",
        "statics",
        "defaultProps",
        "constructor",
        "getDefaultProps",
        "getInitialState",
        "getChildContext",
        "componentWillMount",
        "componentDidMount",
        "componentWillReceiveProps",
        "shouldComponentUpdate",
        "componentWillUpdate",
        "componentDidUpdate",
        "componentWillUnmount",
        "/^component.+$/",
        "/^get.+$/",
        "/^on.+$/",
        "everything-else",
        "/^render.+$/",
        "render"
      ]
    }]
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "settings": {
    "react": {
      "createClass": "createClass", // Regex for Component Factory to use, default to "createClass"
      "pragma": "React", // Pragma to use, default to "React"
      "version": "15.0" // React version, default to the latest React stable release
    },
    'import/resolver': {
        'webpack': {
            'config': 'configs/webpack.common.js'
        }
    }
  }
};
