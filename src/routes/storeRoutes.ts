import { Router } from 'express';
import { deleteStore, getAllStores, getStoreById, registerStore, updateStore } from '../controllers/storeController';

const router = Router();

router.post('', registerStore);
router.get('', getAllStores);
router.get('/:id', getStoreById);
router.put('/:id', updateStore);
router.delete('/:id', deleteStore);

export default router;
