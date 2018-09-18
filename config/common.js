const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractScss = new MiniCssExtractPlugin({
  filename: '[name]_[hash].css'
});

module.exports = {
  loaders: {
    babel: {
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    },

    scss: {
      development: {
        test: /\.(scss|css)/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      production: {
        test: /\.(scss|css)/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: {
                colormin: false
              }
            }
          },
          {loader: 'sass-loader'}
        ]
      }
    }
  },

  plugins: {
    options: new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),

    html: {
      development: new HtmlWebpackPlugin({
        template: './src/index.html',
        title: 'New Tab',
        cache: true,
        ENV: 'development'
      }),
      production: new HtmlWebpackPlugin({
        template: './src/index.html',
        title: 'New Tab',
        hash: true,
        ENV: 'production'
      })
    },

    css: extractScss,

    define: {
      development: new webpack.DefinePlugin({
        ENV: JSON.stringify('development')
      }),
      production: new webpack.DefinePlugin({
        ENV: JSON.stringify('production'),
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      })
    },

    concatModules: new webpack.optimize.ModuleConcatenationPlugin()
  }
};
