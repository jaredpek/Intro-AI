import mongoose from 'mongoose';

mongoose.connect(
  process.env.MONGO_URI, 
  { useNewUrlParser: true, dbName: process.env.MONGO_DB }
);
