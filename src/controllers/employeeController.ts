import { Request, Response } from 'express';
import Employee from '../models/Employee';
import Store from '../models/Store';
import mongoose from 'mongoose';

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

export const getAllEmployees = async (req: Request, res: Response): Promise<void> => {
  try {
    const employees = await Employee.find(); 
    res.status(200).json(employees);
  } catch (error) {
    console.error('Erro ao listar colaboradores:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

export const getEmployeeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    const employee = await Employee.findById(id);
    if (!employee) {
      res.status(404).json({ error: 'Colaborador não encontrado' });
      return;
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error('Erro ao obter colaborador:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

export const getEmployeeByStoreId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const employee = await Employee.find({ idStore: id });
    if (!employee) {
      res.status(404).json({ error: 'Colaborador não encontrado' });
      return;
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error('Erro ao obter colaborador:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const { email, idStore } = req.body;

    // Validação para garantir que o ID é válido
    if (!id) {
      res.status(400).json({ error: 'ID do colaborador é obrigatório' });
      return;
    }

    // Verificar se o e-mail já está sendo usado por outro colaborador
    if (email) {
      const existingUser = await Employee.findOne({ email });
      if (existingUser && existingUser.id.toString() !== id) {
        res.status(400).json({ error: 'Favor utilizar outro e-mail válido' });
        return;
      }
    }
    
    // Verificar se o estabelecimento é válido  
    const existingStore = await Store.findOne({ document: idStore });
    if (!existingStore) {
      res.status(400).json({ error: 'Favor utilizar um estabelecimento já cadastrado' });
      return;
    } 

    const allowedFields = ['name', 'document', 'email', 'idStore' ];
    const filteredUpdates = Object.keys(updates).reduce((obj, key) => {
      if (allowedFields.includes(key)) {
        obj[key] = updates[key];
      }
      return obj;
    }, {} as Record<string, any>);

    // Atualizar o colaborador no banco de dados
    const updatedEmployee = await Employee.findByIdAndUpdate(id, filteredUpdates, {
      new: true, // Retorna o colaborador atualizado
      runValidators: true, // Aplica validações do schema
    }).select('-password'); // Exclui o campo password da resposta

    if (!updatedEmployee) {
      res.status(404).json({ error: 'Colaborador não encontrado' });
      return;
    }

    res.status(200).json({
      message: 'Colaborador atualizado com sucesso',
      user: updatedEmployee,
    });
  } catch (error) {
    console.error('Erro ao atualizar colaborador:', error);  
  }
};
