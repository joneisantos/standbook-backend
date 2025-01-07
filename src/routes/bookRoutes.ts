import { Router } from 'express';
import { registerBook } from '../controllers/bookController';

const router = Router();

router.post('', registerBook);

export default router;