import * as express from 'express';
import * as corsAnywhere from 'cors-anywhere';
const router = express.Router();

// used to make proxy to youtube's internal api (where we can stream media from)
const proxy = corsAnywhere.createServer({
    originWhitelist: [],
    requireHeaders: [],
    removeHeaders: []
});

// allow proxy calls
router.all('/proxy/:proxyUrl*', (req, res) => {
    // strip the proxy path
    req.url = req.url.replace('/proxy/', '/');
    proxy.emit('request', req, res);
});

export default router;