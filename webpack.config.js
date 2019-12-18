/*global require __dirname module*/
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


let conf = {
    entry:
        ["@babel/polyfill",`./index.js`],
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: '[name].js',
        publicPath: 'dist/'
    },
    devServer: {
        overlay:true,
        historyApiFallback:true,
        disableHostCheck: true,
        port:9000,
        proxy: {
            '/serv/**': {
                target: 'http://localhost:3000/',
                secure: false,
                changeOrigin: true
            }
        }
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: `chunk-vendors`,
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: 'initial'
                },
                common: {
                    name: `chunk-common`,
                    minChunks: 2,
                    priority: -20,
                    chunks: 'initial',
                    reuseExistingChunk: true
                }
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            "@babel/plugin-transform-react-jsx",
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            ["@babel/plugin-proposal-class-properties", { "loose": true }]
                        ]
                    }
                }
            },
            {
                test: /\.module\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[local]__[sha1:hash:hex:7]'
                            }
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: { sourceMap: true, config: { path: `./postcss.config.js` } }
                    }
                ]
            },
            {
                test: /^((?!\.module).)*css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                        }
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: true, config: { path: `./postcss.config.js` } }
                    }
                ]
            }
        ]
    },
   /* resolve:{
        alias:{
            '~':path.resolve(__dirname,'src')
        }
    }*/

};
module.exports = (env,options)=>{
    conf.devtool = options.mode ==="production"?
        "source-map":
        "cheap-module-eval-source-map";
    console.log(options.mode);
    return conf
};
