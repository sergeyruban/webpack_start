const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let conf = {
    context: path.resolve(__dirname, 'src'),

    entry: {
        app: ['@babel/polyfill', './index.js']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.js'
    },
    resolve: {
        extensions: [' ', '.js']
    },

    resolveLoader: {
        modules: ['node_modules'],
        moduleExtensions: ['-loader'],
        extensions: [' ', '.js']
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract([
                    'css',
                    {
                        loader: 'postcss',
                        options: {
                            ident: 'postcss',
                            plugins: [require('autoprefixer')]
                        }
                    },
                    'less'
                ])
            },
            {
                test: /\.pug$/,
                loader: 'pug'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['build']),

        new webpack.NoEmitOnErrorsPlugin(),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            favicon: 'favicon.ico',
            template: 'template.html',
            inject: 'body'
        }),

        new ExtractTextPlugin('styles.css')
    ],
    devServer: {
        host: 'localhost',
        port: 8088,
        contentBase: path.resolve(__dirname, 'build'),
        overlay: true,
        open: true
    }
};

module.exports = (env, options) => {
    let mode = options.mode;

    conf.devtool = mode === 'development' ? 'eval' : false;

    return conf;
};
