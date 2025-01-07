import { Router } from 'express';
import { registerEmployee } from '../controllers/employeeController';

const router = Router();

router.post('', registerEmployee);

export default router;