"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        // Validação simples
        if (!name || !email || !password) {
            res.status(400).json({ error: 'Todos os campos são obrigatórios' });
            return;
        }
        // Checa se o usuário já existe
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ error: 'Email já está em uso' });
            return;
        }
        // Cria o usuário
        const user = new User_1.default({ name, email, password });
        yield user.save();
        res.status(201).json({ message: 'Usuário registrado com sucesso', user });
    }
    catch (error) {
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
});
exports.registerUser = registerUser;
