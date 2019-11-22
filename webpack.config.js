let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
let webpack = require('webpack')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const PublicPath = 'http://localhost:3000/'

module.exports = {
  mode:'development',
  entry:'./src/index.js',
  output:{
    path:path.resolve(__dirname,'build'),
    filename:'bundle.js',
    publicPath: PublicPath,
  },
  devServer:{ //本地开发服务环境
    hot: true,
    port:3000,
    progress:true,
    contentBase:'./build',  //根目录
  },
  module:{
    rules:[
      {
        test: /\.less$/,     // 解析less
        use: ExtractTextWebpackPlugin.extract({ //把<style> 标签 换成 <Link> 标签
            fallback: "style-loader",
            use: ['css-loader', 'less-loader'], // 从右向左解析
        })
      },
      {
        test: /\.css$/,     // 解析css
        use: ExtractTextWebpackPlugin.extract({
            fallback: "style-loader",
            use: ['css-loader'],
        }),
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 8192,    // 小于8k的图片自动转成base64格式，并且不会存在实体图片
                    outputPath: 'images/', // 图片打包后存放的目
                    publicPath:PublicPath + 'images',
                    name:'[name]-[hash:4].[ext]'
                }
            }
        ]
      },
      {
        test: /\.(htm|html)$/,
        use: 'html-withimg-loader'
      }
    ]
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template:'./public/index.html', //模板文件位置
      filename:'index.html', //输出文件名字，默认index.html
      minify:{
        // removeAttributeQuotes:true, // 移除HTML属性的双引号
        // collapseWhitespace:true,  //折叠html为一行
      },
      hash:true  //文件后加上hash
    }),
    new ExtractTextWebpackPlugin({filename:'css/style.css'})
  ]
}