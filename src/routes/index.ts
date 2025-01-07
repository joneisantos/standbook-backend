import { Router } from 'express';
import userRoutes from './userRoutes';
import storeRoutes from './storeRoutes';
import employeeRoutes from './employeeRoutes';

const router: Router = Router();

// Sub-rotas
router.use('/users', userRoutes); 
router.use('/stores', storeRoutes);
router.use('/employee', employeeRoutes);

export default router;
