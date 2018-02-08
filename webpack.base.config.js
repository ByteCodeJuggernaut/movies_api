﻿import Config from 'webpack-config';

import HtmlWebpackPlugin from 'html-webpack-plugin';

const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ExtractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});


export default new Config().merge({
    entry: './index.js',
    output: {
        path: __dirname + '/public',
        publicPath: '/'
    },
    module: {
        rules:[
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: { loader: "babel-loader" }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: "css-loader"
                })
            },
            {
              test: /\.scss$/,
              use: ExtractSass.extract({
                use: [{
                  loader: "css-loader"
                }, {
                  loader: "sass-loader"
                }],
                fallback: "style-loader"
              })
            },
            // {
            //     test: /\.(png|jpg)$/,
            //     use: [{
            //         loader: 'file-loader',
            //         options: {
            //             name: '[path].[name].[ext]',
            //             publicPath: 'images/',
            //             useRelativePath: 'false'
            //         }
            //     }]
            //
            // },
        ],
    },

  plugins: [
    new ExtractTextPlugin("[name].bundle.[hash].css"),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: "body"
    })],

});
