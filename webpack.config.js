const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
        carousel: './src/components/carousel.jsx',
        display: './src/components/display.jsx'
    },
    devtool: 'inline-source-map',
    devServer: {
        port:8000,
        hot: true,
        open: true,
        proxy: {
            '/api': {
                 target: 'http://localhost:8000',
                 router: () => 'http://localhost:3000',
                 logLevel: 'debug' /*optional*/
            }
         }
    },
    module: {

        rules: [
    
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader", 
              options: { 
                presets: ["@babel/preset-env", "@babel/preset-react"], 
              },
            },          
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
          }
    
        ]
    
    },    
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack React',
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: '/',
    },
};