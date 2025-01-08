import { Request, Response } from 'express';
import Service from '../models/Services';

export const registerService = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, price, duration, idStore, status } = req.body;

        // Validação simples
        if (!name || !price || !duration || !idStore || !status) {
            res.status(400).json({ error: 'Todos os campos são obrigatórios' });
            return;
        }

        // Criar e salvar o servico no MongoDB
        const newService = new Service({ name, price, duration, idStore, status });
        const savedService = await newService.save();

        res.status(201).json({
            message: 'Serviço registrado com sucesso',
            user: savedService,
        });
    } catch (error) {
        console.error('Erro ao registrar serviço:', error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
};

export const getAllservices = async (req: Request, res: Response): Promise<void> => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        console.error('Erro ao listar serviços:', error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
};
