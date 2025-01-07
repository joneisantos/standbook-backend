import mongoose, { Schema, Document } from 'mongoose';

interface IEmployee extends Document {
  name: string;
  document: string;
  email: string;
  password: string;
  idStore: string;
}

const EmployeeSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    document: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    idStore: { type: String, required: false }
  },
  { timestamps: true }
);

export default mongoose.model<IEmployee>('Employee', EmployeeSchema);
