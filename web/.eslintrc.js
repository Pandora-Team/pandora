module.exports = {
    root: true,

    env: {
        node: true,
    },

    extends: [
        "eslint:recommended",
        "plugin:vue/recommended",
        "@vue/typescript/recommended",
    ],

    parserOptions: {
        ecmaVersion: 2020,
    // project:     "./tsconfig.json"
    },

  // plugins:                                        ["eslint-plugin-local-rules"],

    rules: {
        "no-console":  process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",

    // "local-rules/ts-interface-spaces":          "warn",

        "arrow-body-style":      "warn",
        "no-nested-ternary":     "warn",
        "prefer-regex-literals": "warn",
        "prefer-const":          "warn",
        "object-curly-spacing":  ["warn", "always"],
        "prefer-template":       "warn",
        "space-infix-ops":       "warn",
        "space-before-blocks":   "warn",
        "space-in-parens":       "warn",
        "no-multi-spaces":       ["warn", {
            exceptions: {
                TSTypeAnnotation: true,
                Property:         true,
                Program:          true,
            },
        }],
        "no-spaced-func":                   "warn",
        "quote-props":                      ["warn", "as-needed"],
        "brace-style":                      "warn",
        "prefer-arrow-callback":            "warn",
        "no-unneeded-ternary":              "warn",
        "nonblock-statement-body-position": ["warn", "beside", { overrides: { while: "below" } }],

        "no-var":                   "warn",
        "no-multiple-empty-lines":  ["warn", { max: 2 }],
        "key-spacing":              ["warn", { align: "value" }],
        indent:                     ["warn", 4, { ignoreComments: true }],
        "linebreak-style":          ["warn", "windows"],
        quotes:                     ["warn", "double", { avoidEscape: true }],
        semi:                       ["warn", "never"],
        "no-mixed-spaces-and-tabs": ["warn", "smart-tabs"],
        "comma-dangle":             ["warn", "always-multiline"],
        "vue/max-len":              ["warn", {
            code:                      120,
            ignoreComments:            true,
            ignoreRegExpLiterals:      true,
            ignoreStrings:             true,
            ignoreTemplateLiterals:    true,
            ignoreHTMLAttributeValues: true,
        }],
        "vue/no-multi-spaces": ["warn", {
            ignoreProperties: false,
        }],
        "newline-per-chained-call": ["warn", { ignoreChainWithDepth: 2 }],
        "no-prototype-builtins":    "off",

    // "keyword-spacing": ["warn", { "before": true, "after": true }],
        "comma-spacing": "warn",
        "arrow-spacing": "warn",

    // "@typescript-eslint/prefer-includes":       "warn",
        "@typescript-eslint/array-type":             "warn",
        "@typescript-eslint/no-non-null-assertion":  "off",
        "@typescript-eslint/camelcase":              "off",
        "@typescript-eslint/member-delimiter-style": ["warn", {
            multiline: {
                delimiter: "none",
            },
            singleline: {
                delimiter: "comma",
            },
        }],

        "vue/no-v-html":        "off",
        "vue/html-indent":      ["warn", 4],
        "vue/this-in-template": ["error", "never"],
    },

    globals: {
        _:      true,
        ITLSVG: true,
    },
}
