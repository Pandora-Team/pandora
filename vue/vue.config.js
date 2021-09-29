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
}