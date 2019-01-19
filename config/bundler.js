const webpack = require('webpack');
const path = require('path');

module.exports = {
    context: path.resolve(__dirname, './'),
    entry: {
        main: '../src/js/main.js'
    },
    output: {
        path: path.resolve(__dirname, './../dist/js'),
        filename: '[name].js',
        // library: 'main',
        // libraryTarget: 'umd',
        // umdNamedDefine: true
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
            loader: 'babel-loader',
            options: {
                presets: ['es2015'],
                plugins: ['babel-plugin-add-module-exports']
            }
        }]
    },
    optimization: {
        minimize: true
    },
    watch: false,
    devtool: 'source-map',
    mode: 'production',
};