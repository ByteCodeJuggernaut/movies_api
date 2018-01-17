import Config from 'webpack-config';
import path from 'path';

export default new Config().extend('webpack.base.config.js').merge({
  output: {
    publicPath: '/',
    filename: '[name].bundle.[hash].js',
      path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    open: true,
    historyApiFallback: true
  }
});
