
const carsearch = require("./routes/carsearch.js");
const express = require('express');
const webpack = require('webpack');
const path = require('path');
//import webpackDevMiddleware from 'webpack-dev-middleware';
const cors = require("cors");
//import config from './webpack.config.js';

const app = express();

//const compiler = webpack(config);
const DIST_DIR = path.join(__dirname, 'dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');
app.use(express.static(DIST_DIR));

app.use(cors());
app.use("/carsearch",carsearch);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
/*
app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
    })
);
*/

// Serve the files on port 3000.
app.listen(3000, function() {
    console.log('Example app listening on port 3000!\n');
});