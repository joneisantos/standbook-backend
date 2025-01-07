import { Router } from 'express';
import userRoutes from './userRoutes';
import storeRoutes from './storeRoutes';
import employeeRoutes from './employeeRoutes';
import bookRoutes from './bookRoutes';

const router: Router = Router();

// Sub-rotas
router.use('/users', userRoutes); 
router.use('/stores', storeRoutes);
router.use('/employee', employeeRoutes);
router.use('/book', bookRoutes);

export default router;
