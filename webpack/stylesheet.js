import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import { ROOT_PATH } from '../env'

const stylesheet = {
  context: path.resolve(ROOT_PATH, 'src'),
  entry: {
    'stylesheets/components/index': './stylesheets/components/index.scss'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  },
  output: {
    path: path.resolve(ROOT_PATH, 'dist'),
    filename: '[name].css'
  },
  plugins: [
    new ExtractTextPlugin({
      filename: getPath => getPath('[name].css')
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

export { stylesheet }
