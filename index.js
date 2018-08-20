const express = require('express');
const app = express();
const ytdl = require('youtube-dl');
const port = process.env.PORT || 3000;
const cors = require('cors');
const httpProxy = require("http-proxy");
const corsAnywhere = require("cors-anywhere");
const URL = require('url');
const proxy = httpProxy.createProxyServer();
proxy.rejectUnauthorized = false;
const corsProxy = corsAnywhere.createServer({
    originWhitelist: [],
    requireHeaders: [],
    removeHeaders: []
});

app.use(cors());

// show that the server is healthy
app.get('/', (req, res) => {
    res.json({
        os: process.platform,
        port,
        healthy: true
    });
});

app.get('/proxy/:proxyUrl*', (req, res) => {
    // strip the proxy path
    req.url = req.url.replace('/proxy/', '/');
    corsProxy.emit('request', req, res)


    // const url = new URL(req.query.url);
    //
    // console.log('proxying to host: ', url.host)
    // proxy.web(req, res, { target: req.query.url });
    // proxy.proxyRequest(req, res, {
    //     host: url.host,
    //     port: 8081
    // });
});

//return info for specified video
app.get('/info', (req, res) => {
    const inputFlags = req.query.flags;
    const video = req.query.url;

    getInfo(video, inputFlags)
        .then(info => res.json(info))
        .catch(err => res.status(500).json(err));
});

// return the info using ytdl
function getInfo(videoURL, flags = []) {
    return new Promise((resolve, reject) => {
        ytdl.getInfo(videoURL, flags, (err, info) => {
            err ? reject(err) : resolve(info);
        })
    })
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));