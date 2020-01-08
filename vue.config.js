const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const resolve = dir => {
  return path.join(__dirname, dir)
}

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
const BASE_URL = process.env.NODE_ENV === 'development' ? '/' : '/tmsBill/'
module.exports = {
  transpileDependencies: [
    'iview'
  ],
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'development') {
      config.optimization.minimizer = [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_console: true
            }
          }
        })
      ];
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.css$|\.html/,
            threshold: 1024,
            deleteOriginalAssets: false
          })
        ]
      }
    }
    return {
      module: {
        rules: [
          {
            test: /\.js$/,
            include: path.resolve("src"),
            use: [
              {
                loader: "thread-loader",
                // loaders with equal options will share worker pools
                options: {
                  // the number of spawned workers, defaults to (number of cpus - 1) or
                  // fallback to 1 when require('os').cpus() is undefined
                  workers: 2,

                  // number of jobs a worker processes in parallel
                  // defaults to 20
                  workerParallelJobs: 50,

                  // additional node.js arguments
                  workerNodeArgs: ['--max-old-space-size=1024'],

                  // Allow to respawn a dead worker pool
                  // respawning slows down the entire compilation
                  // and should be set to false for development
                  poolRespawn: false,

                  // timeout for killing the worker processes when idle
                  // defaults to 500 (ms)
                  // can be set to Infinity for watching builds to keep workers alive
                  poolTimeout: 2000,

                  // number of jobs the poll distributes to the workers
                  // defaults to 200
                  // decrease of less efficient but more fair distribution
                  poolParallelJobs: 50,

                  // name of the pool
                  // can be used to create different pools with elsewise identical options
                  name: "my-pool"
                }
              }
            ]
          },
          {
            test: /iview.src.*?js$/,
            include: [
              resolve('node_modules/iview/src')
            ],
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
          // 'transform-runtime' 插件告诉 Babel
          // 要引用 runtime 来代替注入。
          {
            test: /\.*?js$/,
            //exclude用上面配置的话，默认是过滤不编译node_modules 路径下的文件
            //exclude: /(node_modules|bower_components)/,
            //include 指定需要编译的文件路径
            include: [
              resolve('src'),
              resolve('node_modules/iview/src')
            ],
            //exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#ffc527',
          'error-color': '#f14134',
          'link-color': '#3584ff',
          'border-color-split': '#eeeeee',
          'table-thead-bg': '#f5f5f5',
          'table-td-stripe-bg': '#f5f5f5',
          'table-td-hover-bg': '#fff8e9',
          'background-color-select-hover': '#fff8e9',
          'btn-ghost-color': '#ffc527',
          'btn-ghost-bg': '#fff8e9',
          'text-color': '#333333'
        },
        javascriptEnabled: true
      }
    }
  },
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  publicPath: BASE_URL,
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
      .set('@@', resolve('public'))
  },
  runtimeCompiler: true,
  // 打包时不生成.map文件
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    port: 8888,
    disableHostCheck: true,
    proxy: {
      '/server': {
        target: '',
        changeOrigin: true,
        pathRewrite: {
          '/server': ''
        }
      }
    }
  }
}
