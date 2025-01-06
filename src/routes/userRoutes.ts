import { Router } from 'express';
import { deleteUser, getAllUsers, getUserById, registerUser, updateUser } from '../controllers/userController';

const router = Router();

router.post('', registerUser);
router.get('', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
