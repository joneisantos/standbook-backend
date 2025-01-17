import { Router } from 'express';
import userRoutes from './userRoutes';
import storeRoutes from './storeRoutes';
import employeeRoutes from './employeeRoutes';
import bookRoutes from './bookRoutes';
import serviceRoutes from './serviceRoutes';
import authRoutes from './authRoutes';

const router: Router = Router();

// Sub-rotas
router.use('/users', userRoutes); 
router.use('/stores', storeRoutes);
router.use('/employee', employeeRoutes);
router.use('/book', bookRoutes);
router.use('/service', serviceRoutes);
router.use('/auth', authRoutes); 

export default router;
