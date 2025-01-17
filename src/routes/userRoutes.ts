import express from 'express';
import { deleteUser, getAllUsers, getUserById, registerUser, updateUser } from '../controllers/userController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('', authenticate, registerUser);
router.get('', authenticate, getAllUsers);
router.get('/:id', authenticate, getUserById);
router.put('/:id', authenticate, updateUser);
router.delete('/:id', authenticate, deleteUser);

export default router;
