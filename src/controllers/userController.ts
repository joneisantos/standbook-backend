import { Request, Response } from 'express';
import User from '../models/User';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, password } = req.body;

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

    // Encripta a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar e salvar o usuário no MongoDB
    const newUser = new User({ name, email, phone, password: hashedPassword });
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

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const { email } = req.body;

    // Validação para garantir que o ID é válido
    if (!id) {
      res.status(400).json({ error: 'ID do usuário é obrigatório' });
      return;
    }

    // Verificar se o e-mail já está sendo usado por outro usuário
    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser.id.toString() !== id) {
        res.status(400).json({ error: 'Favor utilizar outro e-mail válido' });
        return;
      }
    }

    const allowedFields = ['name', 'email','phone']; 
    const filteredUpdates = Object.keys(updates).reduce((obj, key) => {
      if (allowedFields.includes(key)) {
        obj[key] = updates[key];
      }
      return obj;
    }, {} as Record<string, any>);

    // Atualizar o usuário no banco de dados
    const updatedUser = await User.findByIdAndUpdate(id, filteredUpdates, {
      new: true, // Retorna o usuário atualizado
      runValidators: true, // Aplica validações do schema
    }).select('-password'); // Exclui o campo password da resposta

    if (!updatedUser) {
      res.status(404).json({ error: 'Usuário não encontrado' });
      return;
    }

    res.status(200).json({
      message: 'Usuário atualizado com sucesso',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Validação para garantir que o ID é válido
    if (!id) {
      res.status(400).json({ error: 'ID do usuário é obrigatório' });
      return;
    }

    // Remover o usuário pelo ID
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      res.status(404).json({ error: 'Usuário não encontrado' });
      return;
    }

    res.status(200).json({
      message: 'Usuário deletado com sucesso',
      user: deletedUser,
    });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
  }
};
