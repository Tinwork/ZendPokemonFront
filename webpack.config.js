const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    context : path.resolve(__dirname, './app'),
    module : {
        rules : [{
            test : /\.(css|scss)$/,
            use  : ExtractTextPlugin.extract({
                fallback : 'style-loader',
                use : ['css-loader', 'sass-loader']
            })
        },{
            test: /\.(jsx|js)?$/,
            exclude: /(node_modules)/,
            use : [{
                loader : 'react-hot-loader'
            },{
                loader : 'babel-loader',
                options : {
                    presets: ['react']
                }
            }]
        },{
            test : /\.js$/,
            exclude: /(node_modules)/,
            loader: 'eslint-loader'
        }]
    },
    entry : {
        index: './index.js'
    },
    output : {
        filename : 'bundle.js',
        path : path.resolve(__dirname, './app/dist'),
        publicPath: path.resolve(__dirname, './app/dist')
    },
    resolve : {
        extensions : ['.js', '.jsx']
    },
    devServer : {
        contentBase : ['app', 'dist'],
        hotOnly : true,
        watchContentBase : true,
        compress : true,
        port : 8080,
        watchOptions: {
            poll: true
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'commons.js',
            minChunks: 2,
        }),
        new ExtractTextPlugin('style.css')
  ],
};
