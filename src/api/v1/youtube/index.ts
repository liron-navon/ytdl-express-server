import { Router } from 'express';
import autocomplete from './autocomplete';

const router = Router();

router.use(autocomplete);

export default router;