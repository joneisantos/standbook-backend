import { Request, Response } from 'express';
import Book from '../models/Book';
import { validateDateBook } from '../validators/bookValidator';

export const registerBook = async (req: Request, res: Response): Promise<void> => {
  try {

    const { employeeId, start, end, userId, services, title, status } = req.body;

    // Validação simples
    if (!employeeId || !start|| !end || !userId || !services || !status) {
      res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      return;
    }

    // Checar se já existe agendamento para a mesma data e horário
    const existingBookDate = await validateDateBook(start);
    if (existingBookDate) {
      res.status(400).json({ error: 'Horário não disponível, favor selecionar outro horário' });
      return;
    }

    const newBooking = new Book({
      employeeId: employeeId,
      start: start, //new Date('2025-01-05T14:00:00Z')
      end: end, //new Date('2025-01-05T14:30:00Z')
      userId: userId,
      services: services,
      title: title,
      status: status,
    });

    const savedBook = await newBooking.save();

    res.status(201).json({
      message: 'Agendamento realizado com sucesso',
      Employee: savedBook,
    });
  } catch (error) {
    console.error('Erro ao realizar agendamento:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const books = await Book.find(); 
    res.status(200).json(books);
  } catch (error) {
    console.error('Erro ao listar agendamentos:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

export const getBookByEmployeeId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const book = await Book.find({ employeeId: id });
    if (!book) {
      res.status(404).json({ error: 'Agendamentos não encontrados' });
      return;
    }

    res.status(200).json(book);
  } catch (error) {
    console.error('Erro ao obter agendamentos:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

export const getBookByUserId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const book = await Book.find({ userId: id });
    if (!book) {
      res.status(404).json({ error: 'Agendamentos não encontrados' });
      return;
    }

    res.status(200).json(book);
  } catch (error) {
    console.error('Erro ao obter agendamentos:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

export const updateBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validação para garantir que o ID é válido
    if (!id) {
      res.status(400).json({ error: 'ID do agendamento é obrigatório' });
      return;
    }
 
    const allowedFields = ['services', 'description','status'];
    const filteredUpdates = Object.keys(updates).reduce((obj, key) => {
      if (allowedFields.includes(key)) {
        obj[key] = updates[key];
      }
      return obj;
    }, {} as Record<string, any>);

    if(filteredUpdates.status != "cancelado" && filteredUpdates.status != "confirmado" && filteredUpdates.status != "pendente"){
      res.status(400).json({ error: 'Status deve ser um dos valores [cancelado,confirmado,pendente]' });
      return;
    }    

    // Atualizar o agendamento no banco de dados
    const updatedBook = await Book.findByIdAndUpdate(id, filteredUpdates, {
      new: true, // Retorna o agendamento atualizado
      runValidators: true, // Aplica validações do schema
    });

    if (!updatedBook) {
      res.status(404).json({ error: 'Agendamento não encontrado' });
      return;
    }

    res.status(200).json({
      message: 'Agendamento atualizado com sucesso',
      book: updatedBook,
    });
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error);
  }
};
