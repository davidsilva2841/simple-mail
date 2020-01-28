// Webpack loaders: https://webpack.js.org/loaders/
// Starter kits:    https://webpack.js.org/starter-kits/
// Webpack environment variables: https://webpack.js.org/guides/environment-variables/
// Choose a specific webpack.config.js file
// npx webpack --config {config_name}

// Environment variables
// webpack --env.NODE_ENV=local --env.production
//module.exports = env => {
//   // Use env.<YOUR VARIABLE> here:
//   console.log('NODE_ENV: ', env.NODE_ENV); // 'local'
//   console.log('Production: ', env.production); // true

// --------------------------------------------------------------------------------------------------

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const path = require('path');

// --------------------------------------------------------------------------------------------------


const OUTPUT_FILE_NAME = 'bundle.js';
const PUBLIC_PATH = path.resolve(__dirname, 'public');
const ENTRY_FILE = './src/index.jsx';

// --------------------------------------------------------------------------------------------------

module.exports = {
  
  entry: ENTRY_FILE,
  output: {
    publicPath: "/",
    filename: OUTPUT_FILE_NAME,
    path: PUBLIC_PATH,
  },
  
  // plugins: [
  //   new BundleAnalyzerPlugin()
  // ],
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    rules: [
      
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-transform-runtime'
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader"
      },
      
      {
        test: /\.(png|jpg|gif|woff|ttf|woff2|eot)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              limit: 1024,
              name: "bundle/[path][name].[ext]",
              context: "src/"
            }
          },
        ]
      },
      
      
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader"
        ]
      }
    ]
  }
};
  


