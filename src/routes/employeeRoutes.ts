import { Router } from 'express';
import { getAllEmployees, getEmployeeById, registerEmployee } from '../controllers/employeeController';

const router = Router();

router.post('', registerEmployee);
router.get('', getAllEmployees);
router.get('/:id', getEmployeeById);

export default router;