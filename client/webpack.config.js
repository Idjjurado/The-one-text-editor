const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',
      }),

      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),

      new WebpackPwaManifest({
        fingerprints: false,
        // inject: true,
        name: 'The One Text Editor',
        short_name: 'Text Editor',
        description: "This is a simple text editor that allows for the creation and manipulation of text. Also, you are able to use it's full functionality offline as well!",
        background_color: '#E15D44',
        theme_color: '#E15D44',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/totelogo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [ '@babel/preset-env' ],
                plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
              },
            },
          },
      ],
    },
  };
};
