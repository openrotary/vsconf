const config = require('./config.js')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config.js')

function setProxy() {
    const _Proxy = {
        [`/${config.api}`]: {
            target: config.dev.proxy,
            pathRewrite: {
                [`^/${config.api}`]: '/'
            },
            secure: false
        },
        '/websocket/': { target: config.dev.proxy.replace(/https?/, 'wss'), ws: true, secure: false }
    }
    return _Proxy
}

module.exports = merge(webpackBaseConfig, {
    mode: 'development',
    // devtool: '#source-map',
    // devtool: 'cheap-module-eval-source-map',
    output: {
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                options: {
                    fix: true,
                    quiet: true // 仅报告error, 忽略warning
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            WEB_PATH: JSON.stringify(config.api)
        }),
        new webpack.HotModuleReplacementPlugin(), //启用热替换模块(HMR)
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new HtmlWebpackPlugin({
            favicon: './src/images/favicon.ico',
            filename: './index.html',
            template: './index.html',
            inject: true,
            chunksSortMode: 'none'
        })
    ],
    devServer: {
        open: true,
        // openPage: 'web/#/',
        overlay: {
            //当出现编译器错误或警告时，在浏览器中显示全屏叠加
            warnings: true,
            errors: true
        },
        inline: true,
        hot: true,
        host: config.dev.host,
        port: config.dev.port,
        proxy: setProxy(),
        https: true
    }
})
