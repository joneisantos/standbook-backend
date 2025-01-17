import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as string | JwtPayload; // Decodifica o token
    //req.user = decoded; // Armazena o payload do token no objeto `req`
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token inválido ou expirado.' });
  }
};
