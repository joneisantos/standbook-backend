import mongoose, { Schema, Document } from 'mongoose';

interface IService extends Document {
  name: string;
  price: string;
  duration: number;
  idStore: string;
  status: boolean;
}

const ServiceSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    duration: { type: String, required: true },
    idStore: { type: String, required: true },  
    status: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IService>('Service', ServiceSchema);
