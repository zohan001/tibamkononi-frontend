import mongoose from 'mongoose';

export async function clearDB() {
  const collections = await mongoose.connection.db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
}

export async function connectDB(uri = process.env.MONGO_URI) {
  await mongoose.connect(uri);
}

export async function closeDB() {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
}
