const express = require('express');
const app = express();
const ytdl = require('youtube-dl');

app.get('/', (req, res) => {
    res.send('Hello ' + process.platform)
})

app.get('/video/:video', (req, res) => {
    const video = req.params.video;
    const url = `https://www.youtube.com/watch?v=${video}`;
    ytdl.getInfo(url, ['--youtube-skip-dash-manifest'], function (err, info) {
        if(err) {
            console.log('failed')
           res.send(err);
        } else {
            console.log('yays')
            console.log(info.formats)
           res.send(info.formats)
        }
    })

    // res.send('Hello World!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));