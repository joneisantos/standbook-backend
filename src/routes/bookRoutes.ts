import { Router } from 'express';
import { getAllBooks, getBookByEmployeeId, getBookByUserId, registerBook, updateBook } from '../controllers/bookController';

const router = Router();

router.post('', registerBook);
router.get('', getAllBooks);
router.get('/:id', getBookByEmployeeId);
router.get('/user/:id', getBookByUserId);
router.put('/:id', updateBook);

export default router;