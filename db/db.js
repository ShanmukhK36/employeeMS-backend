import mongoose from 'mongoose';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to MongoDB Atlas, database: ${mongoose.connection.name}`);
  } catch (error) {
    console.error('MongoDB connection error:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
    throw error; // Throw instead of process.exit to allow caller to handle
  }
};

export default connectToDatabase;