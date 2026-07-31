import mongoose from 'mongoose';
import app from './app.js';
import env from './config/env.js';
import { connectDB } from './config/db.js';

const start = async () => {
  try {
    await connectDB(env.mongoUri);
    app.listen(env.port, () => {
      console.log(`Tibamkononi API listening on http://localhost:${env.port}/v1`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
};

const shutdown = async () => {
  console.log('Shutting down gracefully...');
  await mongoose.disconnect();
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

if (process.env.NODE_ENV !== 'test') {
  start();
}

export default start;
