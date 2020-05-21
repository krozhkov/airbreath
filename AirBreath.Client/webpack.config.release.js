const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const config = {
    mode: "production",
    module: {
        rules: [
            // Use react-hot for HMR and then ts-loader to transpile TS (pass path to tsconfig because it is not in root (cwd) path)
            { test: /\.ts(x?)$/, use: ['ts-loader'] },
            { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
        ]
    },
    devtool: '',
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM'
    },
    plugins: [
        new HtmlWebpackPlugin({
            release: true,
            template: path.join(__dirname, 'index.ejs'),
            useCdn: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
    ]
};

module.exports = config;
