import { Request, Response } from 'express';
import Store from '../models/Store';

export const registerStore = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, document, zipcode, addrees, neighborhood, city, state, logo64, status } = req.body;

    // Validação simples
    if (!name || !document || !zipcode || !addrees || !neighborhood || !city || !state || !status) {
      res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      return;
    }

    // Checar se o estabelecimento já existe
    const existingStore = await Store.findOne({ document });
    if (existingStore) {
      res.status(400).json({ error: 'Documento já está em uso' });
      return;
    }

    // Criar e salvar o estabelecimento no MongoDB
    const newStore = new Store({ name, document, zipcode, addrees, neighborhood, city, state, logo64, status });
    const savedStore = await newStore.save();

    res.status(201).json({
      message: 'Estabelecimento comercial registrado com sucesso',
      user: savedStore,
    });
  } catch (error) {
    console.error('Erro ao registrar estabelecimento:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

export const getAllStores = async (req: Request, res: Response): Promise<void> => {
  try {
    const stores = await Store.find(); 
    res.status(200).json(stores);
  } catch (error) {
    console.error('Erro ao listar estabelecimentos:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};
