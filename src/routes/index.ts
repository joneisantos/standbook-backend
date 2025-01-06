import { Router } from 'express';
import userRoutes from './userRoutes';
import storeRoutes from './storeRoutes';

const router: Router = Router();

// Sub-rotas
router.use('/users', userRoutes); 
router.use('/stores', storeRoutes);

export default router;
