import { Router } from 'express';
import { deleteStore, getAllStores, getStoreById, registerStore, updateStore } from '../controllers/storeController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.post('', authenticate, registerStore);
router.get('', authenticate, getAllStores);
router.get('/:id', authenticate, getStoreById);
router.put('/:id', authenticate, updateStore);
router.delete('/:id', authenticate, deleteStore);

export default router;
