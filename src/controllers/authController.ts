import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User'; // Caminho do modelo User

const SECRET_KEY = process.env.JWT_SECRET || 'jonecester1910';

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(`password: ${password} -----${isPasswordValid}---- user.password: ${user.password}`);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Senha incorreta' });
      return;      
    }

    // Gerar o token JWT
    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
      expiresIn: '1h', // Define o tempo de validade do token
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};
