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
app.get('/info/:video', (req, res) => {
    const video = req.params.video;
    const inputFlags = req.query.flags;

    getInfo(video, inputFlags)
        .then(info => res.json(info))
        .catch(err => res.status(500).json(err));
});

// return the info using ytdl
function getInfo(videoId, flags = ['--youtube-skip-dash-manifest']) {
    return new Promise((resolve, reject) => {
        const url = `https://www.youtube.com/watch?v=${videoId}`;
        ytdl.getInfo(url, flags, (err, info) => {
            err ? reject(err) : resolve(info);
        })
    })
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));