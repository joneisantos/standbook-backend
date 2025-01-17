import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload; // Adiciona a propriedade `user` ao Request
    }
  }
}
