import { Schema, model, Document } from 'mongoose';

interface IService {
  nameService: string;
  priceService: number;
}

interface IBook extends Document {
  employeeId: Schema.Types.ObjectId; // ID do funcionário/barbeiro
  start: Date; // Data e hora inicial do agendamento
  end: Date; // Data e hora inicial do agendamento
  userId: Schema.Types.ObjectId; // ID do usuário/cliente
  services: IService[]; // Array de serviços (nome e preço)
  title?: string; // Título do agendamento
  status: 'pendente' | 'confirmado' | 'finalizado' | 'cancelado'; // Status do agendamento
}

const ServiceSchema = new Schema<IService>({
  nameService: { type: String, required: true },
  priceService: { type: Number, required: true },
});

const BookSchema = new Schema<IBook>(
  {
    employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    services: { type: [ServiceSchema], required: true },
    title: { type: String, default: '' },
    status: {
      type: String,
      enum: ['pendente', 'confirmado', 'finalizado', 'cancelado'],
      default: 'pendente',
    },
  },
  {
    timestamps: true,
  }
);

export default model<IBook>('Book', BookSchema);
