import { Router } from 'express';
import { getAllBooks, getBookByEmployeeId, getBookByUserId, registerBook, updateBook } from '../controllers/bookController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.post('', authenticate, registerBook);
router.get('', authenticate, getAllBooks);
router.get('/:id', authenticate, getBookByEmployeeId);
router.get('/user/:id', authenticate, getBookByUserId);
router.put('/:id', authenticate, updateBook);

export default router;