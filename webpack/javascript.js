import webpack from 'webpack'
import path from 'path'
import { ROOT_PATH } from '../env'

const javascript = {
  context: path.resolve(ROOT_PATH, 'src'),
  resolve: {
    alias: {
      '~': path.join(ROOT_PATH, 'src/javascripts')
    }
  },
  entry: {
    'javascripts/commons/chunk': [ 'babel-polyfill' ],
    'javascripts/components/index': './javascripts/applications/index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  output: {
    path: path.resolve(ROOT_PATH, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      'React': 'react'
    })
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: './dist/',
    port: 50000,
    inline: true,
    historyApiFallback: true,
    clientLogLevel: 'info',
    stats: { colors: true }
  }
}

export { javascript }
