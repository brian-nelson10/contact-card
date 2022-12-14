const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const WorkboxPlugin = require('workbox-webpack-plugin');
const {InjectManifest} = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = {
  mode: 'production',
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'Webpack Plugin',
    }),
    new InjectManifest({
      swSrc: './src/sw.js',
      swDest: 'service-worker.js',
    }),
    new WebpackPwaManifest({
      name: 'Contact Cards Application',
      short_name: 'Contact Cards',
      description: 'Keep track of contacts!',
      background_color: '#7eb4e2',
      theme_color: '#7eb4e2',
      start_url: './',
      publicPath: './',
      icons: [
        {
          src: path.resolve('src/images/icon-manifest.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        },
        {
          src: path.resolve('src/images/icon-manifest.png'),
          size: '1024x1024',
          destination: path.join('assets', 'icons'),
          purpose: 'maskable'
        }
      ],
    }),
    // new WorkboxPlugin.GenerateSW({
    //    // Do not precache images
    // exclude: [/\.(?:png|jpg|jpeg|svg)$/],

    // // Define runtime caching rules.
    // runtimeCaching: [{
    //   // Match any request that ends with .png, .jpg, .jpeg or .svg.
    //   urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

    //   // Apply a cache-first strategy.
    //   handler: 'CacheFirst',

    //   options: {
    //     // Use a custom cache name.
    //     cacheName: 'images',

    //     // Only cache 1 images
    //     expiration: {
    //       maxEntries: 1,
    //     },
    //   },
    // }],
    // })
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
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
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      }

    ]
  }
};
