import { Router, Response, Request } from 'express';
import Axios from 'axios';
import { createYoutubeSearchParams } from 'api/v1/youtube/helpers/createYoutubeSearchOptions';
import { normalizeVideoSearch } from 'api/v1/youtube/helpers/normalizeVideoSearch';
import { YOUTUBE_API_BASE_URL } from 'src/config';

const router = Router();

// get autocomplete directly from youtube's services
router.get('/most-popular', (req: Request, res: Response) => {
    const url = `${YOUTUBE_API_BASE_URL}/videos`;
    const axiosOptions = {
        params: createYoutubeSearchParams(null, {
            chart: 'mostPopular'
        })
    };

    Axios.get(url, axiosOptions)
        .then(response => normalizeVideoSearch(response.data))
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send(error.toString());
        });
});

export default router;