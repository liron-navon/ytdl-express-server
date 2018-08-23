import * as express from 'express';
import * as ytdl from 'youtube-dl';

const router = express.Router();

// return info for specified video
router.get('/info', (req, res) => {
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
        });
    });
}

export default router;