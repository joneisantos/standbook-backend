import { Schema, model, Document } from 'mongoose';

interface IService {
  nameService: string;
  priceService: number;
}

interface IBook extends Document {
  employeeId: Schema.Types.ObjectId; // ID do funcionário/barbeiro
  datetime: Date; // Data e hora do agendamento
  userId: Schema.Types.ObjectId; // ID do usuário/cliente
  services: IService[]; // Array de serviços (nome e preço)
  description?: string; // Descrição opcional do agendamento
  status: 'pendente' | 'confirmado' | 'finalizado' | 'cancelado'; // Status do agendamento
}

const ServiceSchema = new Schema<IService>({
  nameService: { type: String, required: true },
  priceService: { type: Number, required: true },
});

const BookSchema = new Schema<IBook>(
  {
    employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
    datetime: { type: Date, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    services: { type: [ServiceSchema], required: true }, // Campo com subdocumentos
    description: { type: String, default: '' },
    status: {
      type: String,
      enum: ['pendente', 'confirmado', 'finalizado', 'cancelado'],
      default: 'pendente',
    },
  },
  {
    timestamps: true, // Inclui campos createdAt e updatedAt automaticamente
  }
);

export default model<IBook>('Book', BookSchema);
