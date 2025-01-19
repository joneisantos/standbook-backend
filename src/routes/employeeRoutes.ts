import { Router } from 'express';
import { deleteEmployee, getAllEmployees, getEmployeeById, getEmployeeByStoreId, registerEmployee, updateEmployee } from '../controllers/employeeController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.post('', authenticate, registerEmployee);
router.get('', authenticate, getAllEmployees);
router.get('/:id', authenticate, getEmployeeById);
router.get('/store/:id', authenticate, getEmployeeByStoreId);
router.put('/:id', authenticate, updateEmployee);
router.delete('/:id', authenticate, deleteEmployee);

export default router;