import mongoose from 'mongoose';

let client = null;

export const getMongooseClient = async () => {
  if (!client || !mongoose.connection.readyState) {
    client = await mongoose.connect(
      process.env.MONGODB_URI, { dbName: process.env.MONGODB_DB }
    );
  };
  return client;
}
