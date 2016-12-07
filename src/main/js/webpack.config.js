const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './index.js',
    output: { path: __dirname, filename: '../resources/static/bundle.js' },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: [ 'es2015', 'react' ]
                }
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    },
    plugins: [
            new webpack.DefinePlugin({
                BASE_API_URL: JSON.stringify("http://localhost:8081") //http://localhost:8081
            })
    ]
}
