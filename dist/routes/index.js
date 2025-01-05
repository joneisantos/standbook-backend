"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_1 = __importDefault(require("./userRoutes"));
//import barbershopRoutes from './barbershopRoutes';
//import appointmentRoutes from './appointmentRoutes';
const router = (0, express_1.Router)();
// Sub-rotas
router.use('/users', userRoutes_1.default); // Rotas relacionadas a usuários
//router.use('/barbershops', barbershopRoutes); // Rotas relacionadas a barbearias
//router.use('/appointments', appointmentRoutes); // Rotas relacionadas a agendamentos
exports.default = router;
