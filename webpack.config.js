const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const env = process.env.NODE_ENV;
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: '[name].[hash].js',
    },
    // devServer:{
    //     proxy:{
    //         '/api':{
    //             target:'http://localhost:3000',
    //             ws:true,
    //             changeOrigin:true,
    //             pathRewrite: {  // 替换，通配/api的替换成/
    //                 '^/api': '/'
    //             }
    //         }
    //     }
    // },
    module: {
        rules: [
            {
                test:/\.js$/,
                //loader:'babel-loader',
                use:[
                    // {
                    //     loader: "./removeConsole"
                    // },
                    {
                        loader: "babel-loader"
                    }
                ],
                exclude:/node_modules/
            },
            {
                test:/\.vue$/,
                loader:'vue-loader',
                options:{
                    extractCSS: true,
                    loaders:{
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader!sass-loader',
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            {
                test: /\.css$/,
                loader:ExtractTextPlugin.extract({
                    use:['style-loader','css-loader'],
                }),
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loader:ExtractTextPlugin.extract({
                    use:'css-loader?minimize!sass-loader'
                }),
                exclude: /node_modules/
            },
            {
                test:/\.(png|jpe?j|gif|svg|jpg)(\?.*)?$/,
                use: [
                    {
                        loader:'url-loader',
                        options:{
                            limit:8192,
                            outputPath:'img/'
                        }
                    }
                ]
            },
            {
                test:/\.(eot|svg|ttf|woff|woff2)$/,
                use: "file-loader?name=[name].[ext]"
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./index.html',
            hash:false,
        }),
        new ExtractTextPlugin("style.css"),
    ],
    resolve:{
        //引入路径是不用写对应的后缀名
        extensions: ['.js', '.vue', '.json','.scss','.css'],
        //缩写扩展
        alias:{
            'vue$':'vue/dist/vue.esm.js',
            //用@直接指引到src目录下，如：'./src/main'可以写成、'@/main'
            '@': path.resolve(__dirname,'./src'),
        }
    },
};
module.exports = config;