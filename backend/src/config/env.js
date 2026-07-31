import 'dotenv/config';

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  mongoUri:
    process.env.MONGO_URI ||
    (process.env.NODE_ENV === 'test'
      ? 'mongodb://127.0.0.1:27017/tibamkononi_test'
      : 'mongodb://127.0.0.1:27017/tibamkononi'),
  jwtSecret: process.env.JWT_SECRET || 'dev_secret_change_me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  clientOrigins: (process.env.CORS_ORIGINS || '*')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  geminiModel: process.env.GEMINI_MODEL || 'gemma-4-26b-a4b-it',
};

export default env;
