import mongoose from 'mongoose';

export async function connectDB(uri) {
  mongoose.connection.on('error', (err) => {
    console.error(`[db] connection error: ${err.message}`);
  });

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });
  }

  return mongoose.connection;
}

export async function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}
