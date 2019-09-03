const webpack = require('webpack')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}
module.exports = {
    mode: 'production',
    output: {
        path: resolve('static'),
        filename: 'dll.[name].js', // 注意：filename指定为dll.[name].js，不加chunkhash值可以命中缓存
        library: '[name]',
    },
    entry: {
        'base': ['vue', 'vue-router', 'vuex', 'axios', 'md5'],
        'exten': ['iview'],
        'others': ['countup.js', 'echarts', 'photoswipe', 'quill', 'sortablejs', 'vue-cropper', 'qrcode', 'vue-amap']
    },
    module: {
        // rules: [{
        //     test: /\.vue$/,
        //     loader: 'vue-loader',
        //     include: [
        //         resolve('node_modules/vue-echarts')
        //     ],
        // }, {
        //     test: /\.js$/,
        //     include: [
        //         resolve('node_modules/vue-echarts'),
        //         resolve('node_modules/resize-detector')
        //     ]
        // }, {
        //     test: /\.css$/,
        //     use: [
        //         MiniCssExtractPlugin.loader, 'css-loader?{"sourceMap":true}', 'postcss-loader'
        //     ]
        // }, {
        //     test: /\.less$/,
        //     use: [
        //         MiniCssExtractPlugin.loader,
        //         'css-loader?{"sourceMap":true}', 'postcss-loader', {
        //             loader: 'less-loader',
        //             options: {
        //                 javascriptEnabled: true
        //             }
        //         }
        //     ]
        // }]
    },
    optimization: {
        minimize: true, // [new UglifyJsPlugin({...})]
        minimizer: [
            new UglifyJsPlugin({
                parallel: 4, // 并发 默认并发运行数：os.cpus().length - 1
                sourceMap: false,
                uglifyOptions: {
                    output: {
                        comments: false, // 注释
                        beautify: false // 美化
                    },
                    compress: {
                        warnings: false
                    }
                },
                cache: true
            })
        ]
    },
    plugins: [
        // new VueLoaderPlugin(),
        new webpack.DllPlugin({
            path: 'dll/manifest.[name].json',
            name: '[name]', // 要与output的library一致
            context: resolve('/')
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    }
}