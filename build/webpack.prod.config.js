const config = require('./config.js');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const path = require('path');
module.exports = merge(webpackBaseConfig, {
    mode: 'production',
    output: {
        publicPath: '',
        filename: 'static/js/[name].[hash].js',
        chunkFilename: 'static/js/[name].[hash].chunk.js'
    },
    optimization: {
        minimize: true, // [new UglifyJsPlugin({...})]
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true, // 并发 默认并发运行数：os.cpus().length - 1
                uglifyOptions: {
                    compress: {
                        // warnings: false, //警告信息
                        drop_debugger: true, //清除 debugger
                        drop_console: true, //清除 console
                    }
                },
            }),
        ],
        splitChunks: {
            chunks: 'async', // 代码块类型 必须三选一： "initial"（初始化） | "all"(默认就是all) | "async"（动态加载）
            minSize: 30000, // 最小尺寸必须大于此值，默认30000B
            minChunks: 1, // 其他entry引用次数大于此值，默认1
            maxAsyncRequests: 5, // entry文件请求的chunks不应该超过此值（请求过多，耗时）
            maxInitialRequests: 3, // 异步请求的chunks不应该超过此值
            name: true,
            cacheGroups: { // 自定义配置主要使用它来决定生成的文件
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                },
                vendor: {
                    name: 'vendor',
                    chunks: 'initial',
                    priority: -10, // 优先级
                    test: /node_modules\/(.*)\.js/,
                    enforce: true
                },
                styles: {
                    name: 'styles', // 生成文件名
                    test: /\.(scss|css)$/, // 限制范围，可以是正则，匹配文件夹或文件
                    chunks: 'all',
                    minChunks: 1,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            WEB_PATH: JSON.stringify(config.api)
        }),
        new cleanWebpackPlugin([
            '*',
        ], {
            root: path.resolve(__dirname, config.outputRoot)
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: "[id].css"
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static/dll.base.js'),
            to: path.resolve(__dirname, config.outputRoot + '/static/dll.base.js')
        }, {
            from: path.resolve(__dirname, '../static/dll.exten.js'),
            to: path.resolve(__dirname, config.outputRoot + '/static/dll.exten.js')
        }, {
            from: path.resolve(__dirname, '../static/dll.others.js'),
            to: path.resolve(__dirname, config.outputRoot + '/static/dll.others.js')
        }]),
        new HtmlWebpackPlugin({
            favicon: './src/images/favicon.ico',
            filename: './index.html',
            template: './index.html',
            inject: true,
            chunksSortMode: 'none'
        })
    ]
});