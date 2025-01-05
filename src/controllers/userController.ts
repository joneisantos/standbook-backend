import { Request, Response } from 'express';
import User from '../models/User';
import mongoose from 'mongoose';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    //console.log(`log kkkk>>> ${JSON.stringify(req.body)}`);
    const { name, email, password } = req.body;

    // Validação simples
    if (!name || !email || !password) {
      res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      return;
    }

    // Checar se o usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: 'Email já está em uso' });
      return;
    }

    // Criar e salvar o usuário no MongoDB
    const newUser = new User({ name, email, password });
    const savedUser = await newUser.save();

    res.status(201).json({
      message: 'Usuário registrado com sucesso',
      user: savedUser,
    });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().select('-password'); // Busca todos os usuários no banco de dados
    res.status(200).json(users);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    const user = await User.findById(id).select('-password');
    if (!user) {
      res.status(404).json({ error: 'Usuário não encontrado' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};
