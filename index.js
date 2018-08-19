const express = require('express');
const isArray = require('lodash/isArray');
const app = express();
const ytdl = require('youtube-dl');
const port = process.env.PORT || 3000;

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
    const inputFlags = req.params.flags;
    const filters = req.params.filters;

    console.log('filters', filters)
    console.log('inputFlags', inputFlags)

    getInfo(video, inputFlags)
        .then(info => {
            if (isArray(filters)) {
                info.formats = filterFormats(filters, info.formats);
            }
            res.json(info)
        })
        .catch(err => res.status(500).json(err));
});

// filter to only keep specific formats
function filterFormats(formatsToKeep, formats) {
    return formats.filter(format => {
        console.log('**********')
        console.log(JSON.stringify(format))
        console.log('**********')
        return formatsToKeep.includes(format.ext);
    })
}

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