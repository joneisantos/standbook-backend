import { Router } from 'express';
import { getAllservices, registerService } from '../controllers/serviceController';

const router = Router();

router.post('', registerService);
router.get('', getAllservices);

export default router;
