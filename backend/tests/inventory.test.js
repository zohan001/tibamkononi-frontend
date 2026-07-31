import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app.js';
import User from '../src/models/User.js';
import Hospital from '../src/models/Hospital.js';
import Inventory from '../src/models/Inventory.js';
import { connectDB, closeDB, clearDB } from './helpers.js';

let token = '';

describe('Inventory & Appointments', () => {
  beforeAll(async () => {
    await connectDB();
    await Hospital.create({
      name: 'Coast General',
      slug: 'coast-general',
      status: 'approved',
      county: 'Mombasa',
    });
    const user = await User.create({
      email: 'pharmacist@tibamkononi.co.ke',
      passwordHash: await User.hashPassword('pharmacist123'),
      fullName: 'Test Pharmacist',
      role: 'pharmacist',
      hospitalSlug: 'coast-general',
    });
    const login = await request(app).post('/v1/auth/login').send({
      email: 'pharmacist@tibamkononi.co.ke',
      password: 'pharmacist123',
    });
    token = login.body.access_token;
  });

  afterEach(async () => {
    await Inventory.deleteMany({});
  });

  afterAll(async () => {
    await clearDB();
    await closeDB();
  });

  test('creates an inventory item', async () => {
    const res = await request(app)
      .post('/v1/hospitals/coast-general/inventory')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Amoxicillin 500mg',
        category: 'Medicines',
        currentStock: 100,
        minimumStock: 20,
      });

    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe('Amoxicillin 500mg');
  });

  test('lists inventory for a hospital', async () => {
    await Inventory.create({
      hospitalSlug: 'coast-general',
      name: 'Paracetamol 500mg',
      category: 'Medicines',
      currentStock: 50,
      minimumStock: 10,
    });

    const res = await request(app).get('/v1/hospitals/coast-general/inventory');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(1);
  });

  test('deducts stock via PATCH /inventory', async () => {
    const item = await Inventory.create({
      hospitalSlug: 'coast-general',
      name: 'ORS Sachets',
      category: 'Medicines',
      currentStock: 20,
      minimumStock: 5,
    });

    const res = await request(app)
      .patch('/v1/hospitals/coast-general/inventory')
      .set('Authorization', `Bearer ${token}`)
      .send({
        itemId: String(item._id),
        quantity: 5,
        type: 'deduction',
      });

    expect(res.status).toBe(200);
    expect(res.body.data.currentStock).toBe(15);
  });

  test('returns available appointment slots', async () => {
    const res = await request(app).get(
      '/v1/appointments/available?hospital_slug=coast-general&date=2026-08-15'
    );

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('time');
    expect(res.body[0]).toHaveProperty('available');
  });

  test('books an appointment', async () => {
    const res = await request(app).post('/v1/appointments').send({
      hospitalSlug: 'coast-general',
      date: '2026-08-15',
      time: '09:00',
      doctorName: 'Dr. Wanjiku',
      patientName: 'Ali Bakari',
      patientPhone: '0712555666',
    });

    expect(res.status).toBe(201);
    expect(res.body.data.status).toBe('confirmed');
  });
});
