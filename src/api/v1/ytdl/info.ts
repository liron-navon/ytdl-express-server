import * as express from 'express';
import * as ytdl from 'youtube-dl';

const router = express.Router();

const AUDIO_FILE_NOTE = 'DASH audio';
const VIDEO_FILE_NOTE = 'DASH video';

// return info for specified video
router.get('/info', (req, res) => {
    const inputFlags = req.query.flags;
    const videoUrl = req.query.url;
    const type = req.query.type || 'all';

    getInfo(videoUrl, inputFlags)
        .then((info: any) => {
            // let formats = info.formats;
            // if (type !== 'all') {
            //     // filter to get audio/ video only
            //     const formatNoteFilter = type === 'audio' ? AUDIO_FILE_NOTE : VIDEO_FILE_NOTE;
            //     formats = formats.filter(f => {
            //         return f.format_note === (type === formatNoteFilter);
            //     });
            // };
            //
            // // map the formats to get only what we need
            // formats = formats.map(f => {
            //     return {
            //         link: f.url,
            //         type: 'audio/' + f.ext
            //     };
            // });
            //
            // const responseData = {
            //     uploader: info.uploader,
            //     id: info.videoId,
            //     formats: formats,
            //     title: info.fulltitle,
            //     description: info.description,
            //     tags: info.tags,
            // }

            res.json(info);
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