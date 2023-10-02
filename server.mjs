
import carsearch from "./routes/carsearch.mjs";
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import cors from "cors";
import config from './webpack.config.js';


const app = express();
app.use(cors());

const compiler = webpack(config);

app.use("/carsearch",carsearch);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
    })
);

// Serve the files on port 3000.
app.listen(3000, function() {
    console.log('Example app listening on port 3000!\n');
});