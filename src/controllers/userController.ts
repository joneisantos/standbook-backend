import { Request, Response } from 'express';
import User from '../models/User';

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
