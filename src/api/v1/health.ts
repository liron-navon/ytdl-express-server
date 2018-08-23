import * as express from 'express';
import { PORT } from '../../config';

const router = express.Router();

// show that the server is healthy
router.get('/health', (req, res) => {
    res.json({
        os: process.platform,
        port: PORT,
        healthy: true
    });
});

export default router;