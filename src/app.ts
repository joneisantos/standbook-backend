import express, { Application } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
/*mongoose
  .connect(process.env.MONGO_URI || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB', err));
*/
// Rotas
import routes from './routes';
app.use('/api', routes);

// Inicialização do servidor
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
