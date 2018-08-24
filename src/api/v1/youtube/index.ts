import { Router } from 'express';
import autocomplete from 'api/v1/youtube/autocomplete';
import search from 'api/v1/youtube/search';
import mostPopular from 'api/v1/youtube/most-popular';

const router = Router();

router.use(autocomplete);
router.use(search);
router.use(mostPopular);

export default router;