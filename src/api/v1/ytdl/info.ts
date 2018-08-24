import * as express from 'express';
import * as ytdl from 'youtube-dl';

const router = express.Router();

const AUDIO_FILE_NOTE = 'DASH audio';
const VIDEO_FILE_NOTE = 'DASH video';
const DEFAULT_IMAGE = 'https://dc-cdn.s3-ap-southeast-1.amazonaws.com/dc-Cover-kjf3fen2qi100no5fni8t20ll0-20160709115754.Medi.jpeg';

// return info for specified video
router.get('/info', (req, res) => {
    const inputFlags = req.query.flags;
    const videoUrl = req.query.url;
    const type = req.query.type || 'all';

    getInfo(videoUrl, inputFlags)
        .then((info: any) => {
            let formats = info.formats;
            if (type !== 'all') {
                // filter to get audio/ video only
                const formatNoteFilter = type === 'audio' ? AUDIO_FILE_NOTE : VIDEO_FILE_NOTE;
                formats = formats.filter(f => {
                    return f.format_note === (type === formatNoteFilter);
                });
            }

            // map the formats to get only what we need
            formats = formats.map(f => {
                return {
                    link: f.url,
                    extension: f.ext
                };
            });

            const previewImage = info.thumbnails && info.thumbnails.length ? info.thumbnails[0].url : DEFAULT_IMAGE;

            const responseData = {
                uploader: info.uploader,
                id: info.display_id,
                format: info.format_id,
                formats: formats,
                title: info.fulltitle,
                description: info.description,
                tags: info.tags,
                categories: info.categories,
                image: previewImage,
                sourcePage: info.webpage_url,
                duration: info._duration_raw,
                views: info.view_count,
                likes: info.like_count,
                dislikes: info.dislike_count,
                rating: info.average_rating,
                uploadTime: info.upload_date,
                height: info.height,
                width: info.width,
                fileName: info._filename,
                extension: info.ext,
                sourceUrl: info.url,
                codec: info.acodec,
                extractor: info.extractor
            };

            res.json(responseData);
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