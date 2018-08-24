import * as express from 'express';
import * as ytdl from 'youtube-dl';
import { processYTDLInfo } from 'api/v1/ytdl/helpers/processYTDLInfo';

const router = express.Router();


// return info for specified video
router.get('/info', (req, res) => {
    const inputFlags = req.query.flags;
    const videoUrl = req.query.url;
    const type = req.query.type || 'all';
    const skipConversion = Boolean(req.query.skipConversion);

    getInfo(videoUrl, inputFlags)
        .then((info: any) => {

            if (skipConversion) {
                return res.json(info);
            }

            res.json(processYTDLInfo(req, info, type));
        })
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