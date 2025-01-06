import { Router } from 'express';
import { getAllStores, getStoreById, registerStore } from '../controllers/storeController';

const router = Router();

router.post('', registerStore);
router.get('', getAllStores);
router.get('/:id', getStoreById);

export default router;
