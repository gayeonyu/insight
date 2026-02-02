/* DB 연결 담당 */

import mongoose from 'mongoose';

const connectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🟢 MongoDB connected');
  } catch (error) {
    console.error('🔴 MongoDB connection failed');
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;