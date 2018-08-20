const express = require('express');
const app = express();
const ytdl = require('youtube-dl');
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());

// show that the server is healthy
app.get('/', (req, res) => {
    res.json({
        os: process.platform,
        port,
        healthy: true
    });
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
function getInfo(videoURL, flags = ['--youtube-skip-dash-manifest']) {
    return new Promise((resolve, reject) => {
        ytdl.getInfo(videoURL, flags, (err, info) => {
            err ? reject(err) : resolve(info);
        })
    })
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));