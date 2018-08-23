import * as express from 'express';
import proxy from './proxy';
import info from './info';
import health from './health';
import youtube from './youtube/index';

const router = express.Router();

router.use(proxy);
router.use(info);
router.use(health);
router.use('/youtube', youtube);

export default router;