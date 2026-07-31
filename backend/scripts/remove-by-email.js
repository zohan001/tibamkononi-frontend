import mongoose from 'mongoose';
import env from '../src/config/env.js';
import Hospital from '../src/models/Hospital.js';
import User from '../src/models/User.js';

const targetEmail = process.argv[2];

if (!targetEmail) {
  console.error('Usage: node scripts/remove-by-email.js <email>');
  process.exit(1);
}

try {
  await mongoose.connect(env.mongoUri);
  const hospitals = await Hospital.deleteMany({ email: targetEmail });
  const users = await User.deleteMany({ email: targetEmail });
  console.log(`Removed ${hospitals.deletedCount} hospital(s) and ${users.deletedCount} user(s) for ${targetEmail}`);
  await mongoose.disconnect();
  process.exit(0);
} catch (err) {
  console.error('Cleanup failed:', err.message);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
}
