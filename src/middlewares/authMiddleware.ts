import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' }); // Retorna diretamente
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Valida o token
    req.user = decoded; // Armazena o payload do token no objeto `req`
    return next(); // Passa o controle para o próximo middleware
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido ou expirado.' }); // Finaliza a resposta
  }
};
