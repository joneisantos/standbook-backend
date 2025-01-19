import { Router } from 'express';
import { getAllservices, registerService } from '../controllers/serviceController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.post('', authenticate, registerService);
router.get('', authenticate, getAllservices);

export default router;
