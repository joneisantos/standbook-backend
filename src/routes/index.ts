import { Router } from 'express';
import userRoutes from './userRoutes';
//import barbershopRoutes from './barbershopRoutes';
//import appointmentRoutes from './appointmentRoutes';

const router: Router = Router();

// Sub-rotas
router.use('/users', userRoutes); // Rotas relacionadas a usuários
//router.use('/barbershops', barbershopRoutes); // Rotas relacionadas a barbearias
//router.use('/appointments', appointmentRoutes); // Rotas relacionadas a agendamentos

export default router;
