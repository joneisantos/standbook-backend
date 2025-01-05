"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
// Carregar variáveis de ambiente
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middlewares
//app.use(cors());
//app.use(express.json());
// Rotas
const routes_1 = __importDefault(require("./routes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
app.use('/api', routes_1.default);
app.use('/users', userRoutes_1.default); // Todas as rotas relacionadas a usuários
// Conecte-se ao MongoDB
(0, db_1.default)();
// Inicialização do servidor
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
