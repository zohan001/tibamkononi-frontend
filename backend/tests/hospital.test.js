import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app.js';
import User from '../src/models/User.js';
import Hospital from '../src/models/Hospital.js';
import { connectDB, closeDB, clearDB } from './helpers.js';

async function createAdmin() {
  const user = await User.create({
    email: 'admin@tibamkononi.co.ke',
    passwordHash: await User.hashPassword('admin123'),
    fullName: 'Admin',
    role: 'admin',
  });
  const res = await request(app).post('/v1/auth/login').send({
    email: 'admin@tibamkononi.co.ke',
    password: 'admin123',
  });
  return res.body.access_token;
}

describe('Hospitals', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterEach(async () => {
    await clearDB();
  });

  afterAll(async () => {
    await closeDB();
  });

  test('registers a hospital as pending', async () => {
    const res = await request(app).post('/v1/hospitals').send({
      name: 'Coast General Hospital',
      type: 'CHC',
      county: 'Mombasa',
      contactPhone: '0712000111',
    });

    expect(res.status).toBe(201);
    expect(res.body.data.status).toBe('pending');
    expect(res.body.data.slug).toBe('coast-general-hospital');

    const dbHospital = await Hospital.findOne({ slug: 'coast-general-hospital' });
    expect(dbHospital).not.toBeNull();
  });

  test('lists only approved hospitals when status filter applied', async () => {
    await Hospital.create({
      name: 'Approved Hospital',
      slug: 'approved-hosp',
      status: 'approved',
      county: 'Mombasa',
    });
    await Hospital.create({
      name: 'Pending Hospital',
      slug: 'pending-hosp',
      status: 'pending',
      county: 'Mombasa',
    });

    const res = await request(app).get('/v1/hospitals?status=approved');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].slug).toBe('approved-hosp');
  });

  test('gets hospital by slug', async () => {
    await Hospital.create({
      name: 'Coast General',
      slug: 'coast-general',
      status: 'approved',
      county: 'Mombasa',
      amenities: ['Pharmacy'],
    });

    const res = await request(app).get('/v1/hospitals/coast-general');

    expect(res.status).toBe(200);
    expect(res.body.slug).toBe('coast-general');
  });

  test('county admin can approve a pending hospital', async () => {
    const token = await createAdmin();
    const hospital = await Hospital.create({
      name: 'Pending Facility',
      slug: 'pending-facility',
      status: 'pending',
      county: 'Mombasa',
    });

    const res = await request(app)
      .patch(`/v1/hospitals/${hospital._id}/approve`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe('approved');
  });

  test('unauthenticated user cannot approve hospitals', async () => {
    const hospital = await Hospital.create({
      name: 'Pending Facility',
      slug: 'pending-facility',
      status: 'pending',
      county: 'Mombasa',
    });

    const res = await request(app).patch(`/v1/hospitals/${hospital._id}/approve`);

    expect(res.status).toBe(401);
  });
});
