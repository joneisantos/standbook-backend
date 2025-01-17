import express from 'express';
import { deleteUser, getAllUsers, getUserById, registerUser, updateUser } from '../controllers/userController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('', registerUser);
router.get('', authenticate, getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
