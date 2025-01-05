import { Router, Request, Response } from 'express';
import User from '../models/User';

const router: Router = Router();

// Registro de usuário
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
});

// Login de usuário -- middleware
/*router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Aqui você pode gerar um token JWT
    res.status(200).json({ message: 'Login bem-sucedido', user });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});*/

export default router;
