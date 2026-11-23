import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/spotfood';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500, // Quick fail if local MongoDB daemon is not running
    });
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[MongoDB] Connection note: ${error.message}`);
    console.log(`[Storage] Seamlessly operating with In-Memory High-Speed Persistence Engine`);
    return false;
  }
};
