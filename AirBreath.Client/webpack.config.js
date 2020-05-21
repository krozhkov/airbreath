const HtmlWebpackPlugin = require("html-webpack-plugin");
const releaseConfig = require("./webpack.config.release");
const isProductionEnvironment = process.env.ASPNETCORE_ENVIRONMENT === "Production";
const path = require("path");
const merge = require("extendify")({ isDeep: true, arrays: "replace" });

let config = {
    mode: "development",
    entry: {
        main: path.join(__dirname, "boot.tsx")
    },
    output: {
        path: path.join(__dirname, "../AirBreath.Server/", "wwwroot"),
        filename: "[name].js",
        publicPath: "/"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".css"]
    },
    module: {
        rules: [
            { test: /\.ts(x?)$/, loaders: ["ts-loader"] },
            { test: /\.css/, loader: "style-loader!css-loader" },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: "url-loader?limit=100000"
            }
        ]
    },
    devtool: "inline-source-map",
    plugins: [
        // plugins should not be empty: https://github.com/aspnet/JavaScriptServices/tree/dev/src/Microsoft.AspNetCore.SpaServices'[
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "index.ejs"),
            inject: true
        })
        // new webpack.NamedModulesPlugin()
        // We do not use ExtractTextPlugin in development mode so that HMR will work with styles
    ]
};

if (isProductionEnvironment) {
    // Merge production config
    config = merge(config, releaseConfig);
}

module.exports = config;
