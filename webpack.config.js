const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
    const isProd = argv.mode === "production";

    return {
        mode: isProd ? "production" : "development",

        entry: {
            "js/index": "./src/scripts/pages/index.js",
            "css/index-critical": "./src/css/critical/index-critical.css",
            "css/index-async": "./src/css/async/index-async.css",
        },

        output: {
            path: path.resolve(__dirname, "docs"),
            filename: isProd ? "[name].min.js" : "[name].js",
            clean: true,
            publicPath: "",
        },

        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                url: false
                            }
                        }
                    ],
                }
            ],
        },

        optimization: {
            minimize: isProd,
            minimizer: [
                new CssMinimizerPlugin(),
                new TerserPlugin({ extractComments: false }),
            ],
        },

        plugins: [
            new RemoveEmptyScriptsPlugin(),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, "src/assets"),
                        to: path.resolve(__dirname, "docs/assets"),
                        noErrorOnMissing: true
                    }
                ]
            }),
            new MiniCssExtractPlugin({
                filename: isProd ? "[name].min.css" : "[name].css",
            }),
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                filename: "index.html",
                inject: false,
                minify: isProd
                    ? { collapseWhitespace: true, removeComments: true }
                    : false,
            }),
        ],
    };
};