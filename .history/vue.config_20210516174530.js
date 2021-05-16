'use strict'
const path = require('path')
const pkg = require('./package.json')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = pkg.name || 'bank-admin' //包名
const port = 9528 //开发端口

module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        open: true,//自启动浏览器
        port: port,
        //mock-serve配置
        proxy: {
            // xxx-api/login => mock/login
            [process.env.VUE_APP_BASE_API]: {
                target: `http://localhost:${port}/mock`,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        },
        after: require('./mock/mock-server.js')//自动读取mock文件

    },
    configureWebpack: {
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    chainWebpack(config) {
        //config.plugins.delete('preload') 
        //config.plugins.delete('prefetch')

        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.compilerOptions.preserveWhitespace = true
                return options
            })
            .end()

        config
            .when(process.env.NODE_ENV === 'development',
                config => config.devtool('cheap-source-map')
            )

        config
            .when(process.env.NODE_ENV !== 'development',
                config => {
                    config
                        .plugin('ScriptExtHtmlWebpackPlugin')
                        .after('html')
                        .use('script-ext-html-webpack-plugin', [{
                            // `runtime` must same as runtimeChunk name. default is `runtime`
                            inline: /runtime\..*\.js$/
                        }])
                        .end()
                    config
                        .optimization.splitChunks({
                            chunks: 'all',
                            cacheGroups: {
                                libs: {
                                    name: 'chunk-libs',
                                    test: /[\\/]node_modules[\\/]/,
                                    priority: 10,
                                    chunks: 'initial' // only package third parties that are initially dependent
                                },
                                elementUI: {
                                    name: 'chunk-elementUI', // split elementUI into a single package
                                    priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                                    test: /[\\/]node_modules[\\/]element-ui[\\/]/
                                },
                                commons: {
                                    name: 'chunk-commons',
                                    test: resolve('src/components'), // can customize your rules
                                    minChunks: 3, //  minimum common number
                                    priority: 5,
                                    reuseExistingChunk: true
                                }
                            }
                        })
                    config.optimization.runtimeChunk('single')
                }
            )
    }
}
