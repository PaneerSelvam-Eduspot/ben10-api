import mongoose from 'mongoose';
import 'dotenv/config'; 

const connectDB = async () => {
  try{
    
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
    console.error("❌ Error: MONGO_URI is not defined in the environment variables!");
    process.exit(1); 
  }
    await mongoose.connect(mongoURI);
  console.log('MongoDB connected successfully');
 } catch (error) {
  console.error('❌ MongoDB connection failed:', error.message);
  process.exit(1);
 }
};
export default connectDB;
