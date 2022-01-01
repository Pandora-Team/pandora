// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require("webpack")
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path")
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const isProduction = process.env.NODE_ENV === "production"

const plugins = [
    new webpack.ProvidePlugin({
        _: "lodash",
    }),
]

if (isProduction) {
    plugins.push(
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ["**/*", "!props.js", "!image/**"],
        }),
    )
}

module.exports = {
    publicPath:       "/",
    lintOnSave:       true,
    configureWebpack: {
        devtool: "source-map",
        resolve: {
            alias: {
                "@a": path.resolve(__dirname, "src/assets"),
                "@c": path.resolve(__dirname, "src/components"),
                "@v": path.resolve(__dirname, "src/views"),
                "@r": path.resolve(__dirname, "src/router"),
                "@s": path.resolve(__dirname, "src/store"),
            },
        },
        plugins,
    },
    css: {
        loaderOptions: {
            scss: {
                prependData: `
                    @import "~@/styles/variables.scss";
                `,
            },
        },
    },
    pwa: {
        name:                            "Pandora K-pop Dance",
        themeColor:                      "#242424",
        msTileColor:                     "#242424",
        appleMobileWebAppCapable:        "yes",
        appleMobileWebAppStatusBarStyle: "black",
        assetsVersion:                   "1.0",
        manifestOptions:                 {
            name:             "K-pop Dance Pandora",
            short_name:       "Pandora",
            display:          "fullscreen",
            orientation:      "portrait",
            background_color: "#242424",
            icons:            [
                { "src": "./img/icons/android-chrome-maskable-192x192.png", "sizes": "192x192", "type": "image/png" },
                { "src": "./img/icons/android-chrome-maskable-512x512.png", "sizes": "512x512", "type": "image/png" },
                { "src": "./img/icons/apple-touch-icon.png", "sizes": "180x180", "type": "image/png" },
                { "src": "./img/icons/favicon-16x16.png", "sizes": "16x16",   "type": "image/png" },
                { "src": "./img/icons/favicon-32x32.png", "sizes": "32x32", "type": "image/png" },
                { "src": "./img/icons/mstile-70x70.png", "sizes": "70x70", "type": "image/png" },
                { "src": "./img/icons/mstile-144x144.png", "sizes": "144x144", "type": "image/png" },
                { "src": "./img/icons/mstile-150x150.png", "sizes": "150x150", "type": "image/png" },
                { "src": "./img/icons/mstile-310x150.png", "sizes": "310x150", "type": "image/png" },
                { "src": "./img/icons/mstile-310x310.png", "sizes": "310x310", "type": "image/png" },
                { "src": "./img/icons/safari-pinned-tab.svg", "type": "image/svg" },
            ],
        },
    },
}
