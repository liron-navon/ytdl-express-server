import { Router, Response, Request } from 'express';
import Axios from 'axios';
import { youtubeAutocompleteResponseToArray } from 'helpers/youtube-api/autocomplete';

const router = Router();

// get autocomplete directly from youtube's services
router.get('/autocomplete', (req: Request, res: Response) => {
    const query = req.query.query;
    const url = `https://clients1.google.com/complete/search?client=youtube&q=${query}&callback=google.sbox.p50`;

    Axios.get(url)
        .then(response => response.data)
        .then(data => youtubeAutocompleteResponseToArray(data))
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

export default router;