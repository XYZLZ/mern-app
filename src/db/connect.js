import mongoose from 'mongoose';
import {config} from 'dotenv'
config();


const connectDB = async () => {
    mongoose.set('strictQuery', true);

   const db = await mongoose.connect(process.env.MONGODB_URI);

   if (db) {
    console.log('connected to database');
   }
}

connectDB();