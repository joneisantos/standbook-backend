import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToDatabase from './config/db';

// Carregar variáveis de ambiente
dotenv.config();

export const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
import routes from './routes';
import userRoutes from './routes/userRoutes';
import storeRoutes from './routes/storeRoutes';
import employeeRoutes from './routes/employeeRoutes';
app.use('/api', routes);
app.use('/users', userRoutes); 
app.use('/stores', storeRoutes); 
app.use('/employee', employeeRoutes); 

// Conecte-se ao MongoDB
connectToDatabase();

// Inicialização do servidor
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
