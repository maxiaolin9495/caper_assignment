const { join } = require('path');
const path = require('path');
const { HotModuleReplacementPlugin } = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MinCssExtractPlugin = require( "mini-css-extract-plugin" );
const webpack = require("webpack");

module.exports = {
    entry: join(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'scripts/[name].js'
    },
    devServer: {
        contentBase: join(__dirname, 'dist'),
        compress: true,
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.js$|\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
                resolve: {
                    extensions: [".js", ".jsx"],
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MinCssExtractPlugin.loader,
                        options: {
                            publicPath: ''
                        }
                    },
                    'css-loader'
                ],
            },
            {
                test: /\.less$/,
                exclude: '/node_modules',
                use: [{
                    loader: 'style-loader'
                },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                //strictMath: true,
                                javascriptEnabled: true,
                            },
                        },
                    },
                ]
            }, {
                test: /\.xml$/,
                loader: 'raw-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.json']
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new MinCssExtractPlugin( {
            filename: "css/[name].css"
        } ),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new HTMLWebpackPlugin({
            showErrors: true,
            cache: true,
            template: join(__dirname, 'src/index.html')
        }),
        new webpack.EvalSourceMapDevToolPlugin({})
    ]
};
