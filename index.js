const express = require('express');
const app = express();
const ytdl = require('youtube-dl');
const port = process.env.PORT || 3000;
const cors = require('cors');
const corsAnywhere = require("cors-anywhere");
const axios = require('axios');
const trimStart = require('lodash/trimStart');
const trimEnd = require('lodash/trimEnd');
const trim = require('lodash/trim');

// used to make proxy to youtube's internal api (where we can stream media from)
const proxy = corsAnywhere.createServer({
    originWhitelist: [],
    requireHeaders: [],
    removeHeaders: []
});

// allow calls to this server
app.use(cors());

// show that the server is healthy
app.get('/', (req, res) => {
    res.json({
        os: process.platform,
        port,
        healthy: true
    });
});

// extract an array of data from a jsonP response
function extractArrayFromJsonP(jsonP) {
    const regexJsonpArray = /\(\[(.*?)\]\)/;
    const matches = regexJsonpArray.exec(jsonP);


    if (!matches || !matches.length) {
        return [];
    }

    let match = matches[0];
    match = trim(match, ' ');
    match = trimStart(match, '(');
    match = trimEnd(match, ')');

    return JSON.parse(match)
}

// reduces the response from youtube to a more readable format
function reduceYoutubeAutoCompleteData(data) {
    const [originalPhrase, phrasesData, key] = data;
    let phrases = phrasesData.map(p => {
        const [phrase, indicise] = p;
        return phrase;
    });
    phrases = phrases.filter(p => {
        return p !== originalPhrase;
    });
    return phrases;
}

// get autocomplete directly from youtube's services
app.get('/autocomplete', (req, res) => {
    const query = req.query.query;
    const url = `https://clients1.google.com/complete/search?client=youtube&q=${query}&callback=google.sbox.p50`

    axios.get(url)
        .then(response => response.data)
        .then(data => extractArrayFromJsonP(data))
        .then(data => reduceYoutubeAutoCompleteData(data))
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            res.send(error)
        });
});

// allow proxy calls
app.all('/proxy/:proxyUrl*', (req, res) => {
    // strip the proxy path
    req.url = req.url.replace('/proxy/', '/');
    proxy.emit('request', req, res)
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