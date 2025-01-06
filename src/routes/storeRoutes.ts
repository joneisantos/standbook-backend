import { Router } from 'express';
import { getAllStores, registerStore } from '../controllers/storeController';

const router = Router();

router.post('', registerStore);
router.get('', getAllStores);

export default router;
