import { Router } from 'express';
import { registerStore } from '../controllers/storeController';

const router = Router();

router.post('/register', registerStore);

export default router;
