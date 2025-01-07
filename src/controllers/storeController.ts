import { Request, Response } from 'express';
import Store from '../models/Store';
import mongoose from 'mongoose';

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

export const getStoreById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    const store = await Store.findById(id);
    if (!store) {
      res.status(404).json({ error: 'Estabelecimento não encontrado' });
      return;
    }

    res.status(200).json(store);
  } catch (error) {
    console.error('Erro ao obter Estabelecimento:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

export const updateStore = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const { document } = req.body;

    // Validação para garantir que o ID é válido
    if (!id) {
      res.status(400).json({ error: 'ID do estabelecimento é obrigatório' });
      return;
    }

    // Verificar se o document já está sendo usado por outro estabelecimento
    if (document) {
      const existingStore = await Store.findOne({ document });
      if (existingStore && existingStore.id.toString() !== id) {
        res.status(400).json({ error: 'Favor utilizar outro document válido' });
        return;
      }
    }
    
    const allowedFields = ['name', 'Store', 'zipcode', 'addrees', 'neighborhood', 'city', 'state', 'logo64', 'status'];
    const filteredUpdates = Object.keys(updates).reduce((obj, key) => {
      if (allowedFields.includes(key)) {
        obj[key] = updates[key];
      }
      return obj;
    }, {} as Record<string, any>);

    // Atualizar o estabelecimento no banco de dados
    const updatedStore = await Store.findByIdAndUpdate(id, filteredUpdates, {
      new: true, // Retorna o estabelecimento atualizado
      runValidators: true, // Aplica validações do schema
    });

    if (!updatedStore) {
      res.status(404).json({ error: 'Estabelecimento não encontrado' });
      return;
    }

    res.status(200).json({
      message: 'Estabelecimento atualizado com sucesso',
      user: updatedStore,
    });
  } catch (error) {
    console.error('Erro ao atualizar estabelecimento:', error);  
  }
};

export const deleteStore = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Validação para garantir que o ID é válido
    if (!id) {
      res.status(400).json({ error: 'ID do estabelecimento é obrigatório' });
      return;
    }

    // Remover o estabelecimento pelo ID
    const deletedStore = await Store.findByIdAndDelete(id);

    if (!deletedStore) {
      res.status(404).json({ error: 'Estabelecimento não encontrado' });
      return;
    }

    res.status(200).json({
      message: 'Estabelecimento deletado com sucesso',
      user: deletedStore,
    });
  } catch (error) {
    console.error('Erro ao deletar estabelecimento:', error);   
  }
};
