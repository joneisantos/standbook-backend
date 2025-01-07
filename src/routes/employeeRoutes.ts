import { Router } from 'express';
import { getAllEmployees, getEmployeeById, getEmployeeByStoreId, registerEmployee } from '../controllers/employeeController';

const router = Router();

router.post('', registerEmployee);
router.get('', getAllEmployees);
router.get('/:id', getEmployeeById);
router.get('/store/:id', getEmployeeByStoreId);

export default router;