import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToDatabase from './config/db';

// Carregar variáveis de ambiente
dotenv.config();

const app: Application = express();

// Middlewares
//app.use(cors());
//app.use(express.json());

// Rotas
import routes from './routes';
import userRoutes from './routes/userRoutes';
app.use('/api', routes);
app.use('/users', userRoutes); // Todas as rotas relacionadas a usuários

// Conecte-se ao MongoDB
connectToDatabase();

// Inicialização do servidor
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
