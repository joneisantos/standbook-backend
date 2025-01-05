import mongoose from 'mongoose';


const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1); // Finaliza o processo em caso de erro na conexão
  }
};

export default connectToDatabase;
