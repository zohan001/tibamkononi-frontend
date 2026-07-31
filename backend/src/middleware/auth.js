import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import User from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';

export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const [scheme, token] = header.split(' ');

    if (scheme !== 'Bearer' || !token) {
      return next(ApiError.unauthorized('Authentication required'));
    }

    let payload;
    try {
      payload = jwt.verify(token, env.jwtSecret);
    } catch (err) {
      return next(ApiError.unauthorized('Invalid or expired token'));
    }

    const user = await User.findById(payload.sub).lean();
    if (!user) {
      return next(ApiError.unauthorized('User no longer exists'));
    }
    if (user.status === 'disabled') {
      return next(ApiError.forbidden('Account disabled'));
    }

    req.user = user;
    return next();
  } catch (err) {
    return next(err);
  }
}

export function requireRoles(...roles) {
  const allowed = roles.flat();
  return (req, res, next) => {
    if (!req.user) {
      return next(ApiError.unauthorized('Authentication required'));
    }
    if (allowed.length > 0 && !allowed.includes(req.user.role)) {
      return next(ApiError.forbidden('You do not have permission to perform this action'));
    }
    return next();
  };
}
