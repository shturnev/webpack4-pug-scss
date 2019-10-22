const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function getConfig(mode = "development"){
  let HTMLMinifierOptions = {
    collapseWhitespace: mode === "production",
    collapseInlineTagWhitespace: mode === "production",
    sortAttributes: true,
    removeComments: mode === "production",
  };

  return {
    entry: [
      './src/js/index.js',
      './src/styles/style.scss'
    ],
    output: {
      filename: 'js/main.js',
      path: path.resolve(__dirname, 'dist'),
      // publicPath: "/"
    },
    module: {
      rules: [
        {
          test: /\.pug$/,
          use: [
            "html-loader",
            {
              loader: 'pug-html-loader',
              options: {
                pretty: true,
              }
            }
          ],
        },
        {
          test: /\.scss$/i,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
              },
            },
          ],
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
/*            {
              loader: "url-loader",
              options: {
                limit: 30000
              }
            },*/
            {
              loader: "file-loader",
              options: {
                outputPath: "images",
                name: "[contenthash]-[name].[ext]"
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                bypassOnDebug: true,
              }
            }
          ]
        },
        {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        chunks: 'all',
        template: './src/views/index.pug',
        minify: HTMLMinifierOptions,
        favicon: "./src/img/favicon.png"
      }),
    ]
  }
}

module.exports = (env, argv) => {
  return getConfig(argv.mode)
}


