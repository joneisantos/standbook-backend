import { Request, Response } from 'express';
import Employee from '../models/Employee';
import Store from '../models/Store';

export const registerEmployee = async (req: Request, res: Response): Promise<void> => {
  try {    
    const { name, document, email, password, idStore } = req.body;

    // Validação simples
    if (!name || !document|| !email || !password || !idStore) {
      res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      return;
    }
    

    // Checar se o colaborador já existe
    const existingUser_ = await Employee.findOne({ document });
    if (existingUser_) {
      res.status(400).json({ error: 'Document já está em uso' });
      return;
    }

    const existingUser = await Employee.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: 'Email já está em uso' });
      return;
    }    
    
    // Verificar se o estabelecimento é válido  
    const existingStore = await Store.findOne({ document: idStore });
    if (!existingStore) {
      res.status(400).json({ error: 'Favor utilizar um estabelecimento já cadastrado' });
      return;
    } 

    // Criar e salvar o colaborador no MongoDB
    const newEmployee = new Employee({ name, document, email, password, idStore });
    const savedEmployee = await newEmployee.save();

    res.status(201).json({
      message: 'Colaborador registrado com sucesso',
      Employee: savedEmployee,
    });
  } catch (error) {
    console.error('Erro ao registrar colaborador:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};