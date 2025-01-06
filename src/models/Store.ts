import mongoose, { Schema, Document } from 'mongoose';

interface IStore extends Document {
  name: string;
  document: string;
  zipcode: string;
  addrees: string;
  neighborhood: string;
  city: string;
  state: string;
  logo64: string;
  status: boolean;
}

const StoreSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    document: { type: String, required: true, unique: true },
    zipcode: { type: String, required: true },
    addrees: { type: String, required: true },
    neighborhood: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    logo64: { type: String, required: false },
    status: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IStore>('Store', StoreSchema);
