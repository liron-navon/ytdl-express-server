import { Router, Response, Request } from 'express';
import Axios from 'axios';
import { youtubeAutocompleteResponseToArray } from 'api/v1/youtube/helpers/autocomplete';

const router = Router();

// get autocomplete directly from youtube's services
router.get('/autocomplete', (req: Request, res: Response) => {
    const query = req.query.query;
    const url = `https://clients1.google.com/complete/search?client=youtube&q=${query}&callback=google.sbox.p50`;

    Axios.get(url)
        .then(response => youtubeAutocompleteResponseToArray(response.data))
        .then(autocompletePhrases =>  res.send(autocompletePhrases))
        .catch(error => {
            res.status(500).send(error);
        });
});

export default router;