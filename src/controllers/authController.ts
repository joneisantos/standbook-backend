import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User'; // Caminho do modelo User
import logger from '../config/logger';
import { sendEmail } from '../services/emailService';

const SECRET_KEY = process.env.JWT_SECRET || 'jonecester1910';

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      logger.error({ message: 'tentando autenticar com usuário não encontrado', email: email });
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }

    const correct = await bcrypt.compare(password, user.password);
    if (!correct) {
      logger.error({ message: 'token não gerado por senha incorreta', email: user.email });
      res.status(401).json({ message: 'Senha incorreta' });
      return;
    }


    // Gerar o token JWT
    const access_token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
      expiresIn: '1h', // Define o tempo de validade do token
    });


    try {
      await sendEmail(
        'jjonei.santos@gmail.com',
        'Assunto do E-mail',
        'Conteúdo do e-mail em texto simples',
        '<p>Conteúdo do e-mail em <strong>HTML</strong></p>'
      );
      console.log('E-mail enviado com sucesso!');
      logger.info({ message: 'E-mail enviado com sucesso' });
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      logger.error({ message: 'Erro ao enviar e-mail', error: error });
    }

    logger.info({ message: 'token gerado', email: user.email });
    res.status(200).json({ access_token });
  } catch (error) {
    logger.error({ message: 'Erro no login', error: error });
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};
