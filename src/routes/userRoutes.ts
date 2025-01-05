import { Router } from 'express';
import { getAllUsers, getUserById, registerUser } from '../controllers/userController';

const router = Router();

router.post('/register', registerUser);
router.get('', getAllUsers);
router.get('/:id', getUserById);

export default router;
