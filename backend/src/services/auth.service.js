import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import User from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';

function signToken(userId) {
  return jwt.sign({ sub: userId }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
}

function buildAuthPayload(user) {
  return {
    access_token: signToken(user._id.toString()),
    token_type: 'bearer',
    user: {
      id: user._id.toString(),
      role: user.role,
      full_name: user.fullName,
      email: user.email,
      hospital_slug: user.hospitalSlug || null,
      hospital_name: user.hospitalName || null,
    },
  };
}

export async function registerUser({ email, password, fullName, role = 'doctor', phone, hospitalSlug }) {
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    throw ApiError.conflict('An account with this email already exists');
  }

  const passwordHash = await User.hashPassword(password);
  const user = await User.create({
    email: email.toLowerCase(),
    passwordHash,
    fullName,
    role,
    phone: phone || '',
    hospitalSlug: hospitalSlug || null,
  });

  return buildAuthPayload(user);
}

export async function loginUser({ email, password }) {
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  const valid = await user.comparePassword(password);
  if (!valid) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  if (user.status === 'disabled') {
    throw ApiError.forbidden('Account disabled. Contact an administrator.');
  }

  let hospitalName = null;
  if (user.hospitalSlug) {
    const { default: Hospital } = await import('../models/Hospital.js');
    const hospital = await Hospital.findOne({ slug: user.hospitalSlug }).lean();
    hospitalName = hospital ? hospital.name : null;
  }

  const payload = buildAuthPayload(user);
  payload.user.hospital_name = hospitalName;
  return payload;
}

export async function getMe(userId) {
  const user = await User.findById(userId);
  if (!user) throw ApiError.notFound('User not found');
  return user.toSafeJSON();
}
