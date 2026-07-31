import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app.js';
import { connectDB, closeDB, clearDB } from './helpers.js';

describe('Auth', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterEach(async () => {
    await clearDB();
  });

  afterAll(async () => {
    await closeDB();
  });

  test('registers a new user', async () => {
    const res = await request(app).post('/v1/auth/register').send({
      email: 'doctor@tibamkononi.co.ke',
      password: 'doctor123',
      fullName: 'Test Doctor',
      role: 'doctor',
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('access_token');
    expect(res.body.token_type).toBe('bearer');
    expect(res.body.user.email).toBe('doctor@tibamkononi.co.ke');
    expect(res.body.user.role).toBe('doctor');
  });

  test('rejects duplicate email registration', async () => {
    const payload = {
      email: 'dup@tibamkononi.co.ke',
      password: 'password123',
      fullName: 'Dup User',
    };
    await request(app).post('/v1/auth/register').send(payload);
    const res = await request(app).post('/v1/auth/register').send(payload);

    expect(res.status).toBe(409);
    expect(res.body.message).toContain('already exists');
  });

  test('logs in with valid credentials', async () => {
    await request(app).post('/v1/auth/register').send({
      email: 'doctor@tibamkononi.co.ke',
      password: 'doctor123',
      fullName: 'Test Doctor',
      role: 'doctor',
    });

    const res = await request(app).post('/v1/auth/login').send({
      email: 'doctor@tibamkononi.co.ke',
      password: 'doctor123',
    });

    expect(res.status).toBe(200);
    expect(res.body.access_token).toBeDefined();
    expect(res.body.user).toMatchObject({
      id: expect.any(String),
      role: 'doctor',
      full_name: 'Test Doctor',
      email: 'doctor@tibamkononi.co.ke',
    });
  });

  test('rejects invalid credentials', async () => {
    const res = await request(app).post('/v1/auth/login').send({
      email: 'doctor@tibamkononi.co.ke',
      password: 'wrongpass',
    });

    expect(res.status).toBe(401);
    expect(res.body.message).toBeDefined();
  });

  test('returns 401 when accessing protected route without token', async () => {
    const res = await request(app).get('/v1/auth/me');
    expect(res.status).toBe(401);
  });
});
