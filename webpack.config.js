const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './scripts/index.js',
    output: {
        filename: 'super.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        esModule: true,
                    },
                },
                    'css-loader',]
            }
        ]
    },
    plugins: [new MiniCssExtractPlugin()],
    optimization: {
        minimizer: [new TerserPlugin({}), new CssMinimizerPlugin()],
        minimize: true,
    }
};