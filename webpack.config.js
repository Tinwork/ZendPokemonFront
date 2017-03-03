const path = require('path');
const webpack = require('webpack');

module.exports = {
    context : path.resolve(__dirname, './app'),
    module : {
        loaders : [{
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
        }]
    },
    entry : {
        index: './index.js'
    },
    output : {
        filename : 'bundle.js',
        path : path.resolve(__dirname, 'dist')
    },
    resolve : {
        extensions : ['.js', '.jsx']
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'commons.js',
            minChunks: 2,
        }),
  ],
};
