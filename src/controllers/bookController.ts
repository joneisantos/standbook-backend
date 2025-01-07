import { Request, Response } from 'express';
import Book from '../models/Book';
import { validateDateBook } from '../validators/bookValidator';

export const registerBook = async (req: Request, res: Response): Promise<void> => {
  try {

    const { employeeId, datetime, userId, services, description, status } = req.body;

    // Validação simples
    if (!employeeId || !datetime || !userId || !services || !status) {
      res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      return;
    }

    // Checar se já existe agendamento para a mesma data e horário
    const existingBookDate = await validateDateBook(datetime);
    if (existingBookDate) {
      res.status(400).json({ error: 'Horário não disponível, favor selecionar outro horário' });
      return;
    }

    const newBooking = new Book({
      employeeId: employeeId,
      datetime: datetime, //new Date('2025-01-05T14:00:00Z')
      userId: userId,
      services: services,
      description: description,
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
