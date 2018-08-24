import * as express from 'express';
import proxy from 'api/v1/proxy';
import ytdl from 'api/v1/ytdl';
import health from 'api/v1/health';
import youtube from 'api/v1/youtube/index';

const router = express.Router();

router.use(proxy);
router.use(health);
router.use('/youtube', youtube);
router.use('/ytdl', ytdl);

export default router;