const config = require('./config.js');
const path = require('path');
const os = require('os');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
});
const devMode = process.env.NODE_ENV !== 'production'

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}
module.exports = {
    entry: {
        main: config.entry
    },
    output: {
        path: path.resolve(__dirname, config.outputRoot)
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            include: [
                resolve('src'), 
                // resolve('node_modules/vue-echarts'),
                // resolve('node_modules/resize-detector')
            ],
        }, {
            test: /\.js$/,
            include: [
                resolve('src'),
                resolve('node_modules/vue-echarts'),
                resolve('node_modules/resize-detector')
            ],
            loader: 'happypack/loader?id=happybabel'
        }, {
            test: /\.css$/,
            use: [
                'css-hot-loader',
                devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                'css-loader?{"sourceMap":true}', 'postcss-loader'
            ]
        }, {
            test: /\.less$/,
            use: [
                'css-hot-loader',
                devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                'css-loader?{"sourceMap":true}', 'postcss-loader', {
                    loader: 'less-loader',
                    options: {
                        javascriptEnabled: true
                    }
                }, {
                    loader: 'sass-resources-loader',
                    options: {
                        resources: [
                            resolve('src/styles/color.less'),
                        ]
                    }
                }
            ]
        }, {
            test: /\.(gif|jpe?g|png|woff|svg|eot|ttf|webp)\??.*$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: 'static/img/[hash:8].[ext]'
                }
            }]
        }, {
            test: /\.(html|tpl)$/,
            loader: 'html-loader'
        }]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DllReferencePlugin({
            context: resolve('/'),
            manifest: 'dll/manifest.base.json'
        }),
        new webpack.DllReferencePlugin({
            context: resolve('/'),
            manifest: 'dll/manifest.exten.json'
        }),
        new webpack.DllReferencePlugin({
            context: resolve('/'),
            manifest: 'dll/manifest.others.json'
        }),
        new HappyPack({
            id: 'happybabel',
            loaders: ['babel-loader'],
            threadPool: happyThreadPool,
            verbose: true
        })
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        modules: [
            resolve('src'),
            resolve('node_modules')
        ],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            'util$': resolve('src/libs/util.js'),
            'package$': resolve('package.json')
        }
    }
};