import { Router } from 'express';
import info from 'api/v1/ytdl/info';


const router = Router();

router.use(info);

export default router;