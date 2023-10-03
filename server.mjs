
import carsearch from "./routes/carsearch.mjs";
import express from 'express';
import webpack from 'webpack';
import path from 'path';
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));


//import webpackDevMiddleware from 'webpack-dev-middleware';
import cors from "cors";
//import config from './webpack.config.js';

const app = express();

//const compiler = webpack(config);
const DIST_DIR = path.join(__dirname, 'dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');
app.use(express.static(DIST_DIR));

app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(HTML_FILE)
})


app.use("/api/carsearch",carsearch);

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