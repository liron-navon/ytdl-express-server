const express = require('express');
const app = express();
const ytdl = require('youtube-dl');

app.get('/', (req, res) => {
    res.send('Hello')
})

app.get('/video/:video', (req, res) => {
    const video = req.params.video;
    const url = `https://www.youtube.com/watch?v=${video}`;
    ytdl.getInfo(url, ['--youtube-skip-dash-manifest'], function (err, info) {
        if(err) {
           return res.status(500).send(err);
        };
        return res.send(info);
    })

    res.send('Hello World!');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));