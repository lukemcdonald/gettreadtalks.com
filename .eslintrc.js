export default {
  extends: [
    "wesbos",
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  "rules": {
    "react/jsx-props-no-spreading": "off",
    "react/prop-types": 0,
    "no-shadow": "off",
    "no-void": "off"
  },
  "settings": {
    "import/resolver": {
      "node": {
        "moduleDirectory": [
          "node_modules",
          "src"
        ]
      }
    }
  }
}
