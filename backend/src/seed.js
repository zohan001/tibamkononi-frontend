import mongoose from 'mongoose';
import env from './config/env.js';
import User from './models/User.js';
import Hospital from './models/Hospital.js';
import Inventory from './models/Inventory.js';
import Staff from './models/Staff.js';
import Announcement from './models/Announcement.js';
import Appointment from './models/Appointment.js';

const HOSPITALS = [
  {
    name: 'Coast General Teaching & Referral Hospital',
    slug: 'coast-general',
    licenseNumber: 'MBS/0012',
    type: 'District',
    county: 'Mombasa',
    subCounty: 'Mvita',
    ward: 'Mvita Ward',
    physicalAddress: 'Mkomani Road, Mombasa Island',
    latitude: -4.0435,
    longitude: 39.6765,
    contactPhone: '0712000111',
    email: 'info@coastgeneral.co.ke',
    status: 'approved',
    amenities: ['Pharmacy', 'Laboratory', 'X-Ray', 'CT Scan', 'Emergency', 'Wheelchair Access'],
    buildings: [
      {
        name: 'Main Block',
        floors: 5,
        wards: [
          { name: 'General Ward', type: 'General', bedCount: 60, bedsOccupied: 42 },
          { name: 'Maternity Ward', type: 'Maternity', bedCount: 25, bedsOccupied: 18 },
          { name: 'Pediatric Ward', type: 'Pediatric', bedCount: 20, bedsOccupied: 12 },
        ],
      },
      { name: 'Casualty Block', floors: 2, wards: [{ name: 'Emergency Ward', type: 'Emergency', bedCount: 15, bedsOccupied: 6 }] },
    ],
    suppliers: [
      { name: 'MedSource East Africa', contact: '0733000111', suppliesProvided: 'Medicines, surgical consumables' },
      { name: 'KEMSA', contact: '0800720000', suppliesProvided: 'Bulk pharmaceuticals' },
    ],
    description: 'The largest public referral hospital on the Kenyan coast.',
  },
  {
    name: 'Mombasa County Hospital',
    slug: 'mombasa-county',
    licenseNumber: 'MBS/0045',
    type: 'CHC',
    county: 'Mombasa',
    subCounty: 'Kisauni',
    ward: 'Kisauni Ward',
    physicalAddress: 'Old Town, Digo Road',
    latitude: -4.055,
    longitude: 39.672,
    contactPhone: '0712000222',
    email: 'info@mombasacounty.go.ke',
    status: 'approved',
    amenities: ['Pharmacy', 'Laboratory', 'Emergency', 'Ambulance'],
    buildings: [
      {
        name: 'Outpatient Block',
        floors: 3,
        wards: [
          { name: 'General Ward', type: 'General', bedCount: 40, bedsOccupied: 28 },
          { name: 'Isolation Ward', type: 'Isolation', bedCount: 10, bedsOccupied: 2 },
        ],
      },
    ],
    suppliers: [{ name: 'KEMSA', contact: '0800720000', suppliesProvided: 'Bulk pharmaceuticals' }],
    description: 'County referral facility serving Kisauni and surrounding wards.',
  },
  {
    name: 'Likoni Sub-County Hospital',
    slug: 'likoni',
    licenseNumber: 'MBS/0078',
    type: 'CHC',
    county: 'Mombasa',
    subCounty: 'Likoni',
    ward: 'Likoni Ward',
    physicalAddress: 'Likoni Ferry Road',
    latitude: -4.082,
    longitude: 39.665,
    contactPhone: '0712000333',
    email: 'info@likonihospital.go.ke',
    status: 'approved',
    amenities: ['Pharmacy', 'Laboratory'],
    buildings: [
      {
        name: 'Main Building',
        floors: 2,
        wards: [{ name: 'General Ward', type: 'General', bedCount: 30, bedsOccupied: 24 }],
      },
    ],
    suppliers: [{ name: 'MedSource East Africa', contact: '0733000111', suppliesProvided: 'Medicines' }],
    description: 'Sub-county hospital across the Likoni channel.',
  },
  {
    name: 'Nyangondo Medical Centre',
    slug: 'nyangondo',
    licenseNumber: 'MBS/0102',
    type: 'Private',
    county: 'Mombasa',
    subCounty: 'Nyali',
    ward: 'Nyali Ward',
    physicalAddress: 'Links Road, Nyali',
    latitude: -4.012,
    longitude: 39.713,
    contactPhone: '0712000444',
    email: 'care@nyangondo.co.ke',
    status: 'pending',
    amenities: ['Pharmacy', 'Laboratory', 'Maternity'],
    buildings: [
      {
        name: 'Clinic',
        floors: 2,
        wards: [{ name: 'Private Ward', type: 'Private', bedCount: 12, bedsOccupied: 3 }],
      },
    ],
    suppliers: [{ name: 'MedSource East Africa', contact: '0733000111', suppliesProvided: 'Medicines' }],
    description: 'Private medical centre awaiting county approval.',
  },
];

const INVENTORY = [
  { name: 'Amoxicillin 500mg', category: 'Medicines', currentStock: 420, unit: 'tablets', dailyUsage: 30, minimumStock: 100, supplier: 'MedSource East Africa' },
  { name: 'Paracetamol 500mg', category: 'Medicines', currentStock: 60, unit: 'tablets', dailyUsage: 25, minimumStock: 100, supplier: 'KEMSA' },
  { name: 'ORS Sachets', category: 'Medicines', currentStock: 15, unit: 'sachets', dailyUsage: 8, minimumStock: 50, supplier: 'KEMSA' },
  { name: 'Surgical Gloves (Box)', category: 'Surgical', currentStock: 85, unit: 'boxes', dailyUsage: 5, minimumStock: 30, supplier: 'MedSource East Africa' },
  { name: 'Cotton Wool Rolls', category: 'General', currentStock: 40, unit: 'rolls', dailyUsage: 4, minimumStock: 25, supplier: 'MedSource East Africa' },
  { name: 'Artemether/Lumefantrine 80/480mg', category: 'Medicines', currentStock: 240, unit: 'tablets', dailyUsage: 12, minimumStock: 80, supplier: 'KEMSA' },
  { name: 'Metformin 500mg', category: 'Medicines', currentStock: 8, unit: 'tablets', dailyUsage: 6, minimumStock: 40, supplier: 'KEMSA' },
  { name: 'Insulin Glargine Vial', category: 'Medicines', currentStock: 2, unit: 'vials', dailyUsage: 1, minimumStock: 10, supplier: 'MedSource East Africa' },
];

const STAFF = [
  { name: 'Dr. Jane Mwangi', role: 'Doctor', department: 'General Outpatient', phone: '0712345678' },
  { name: 'Dr. Brian Otieno', role: 'Doctor', department: 'General Outpatient', phone: '0712345679' },
  { name: 'Sr. Amina Hassan', role: 'Nurse', department: 'Maternity', phone: '0712345680' },
  { name: 'James Kiprop', role: 'Pharmacist', department: 'Pharmacy', phone: '0712345681' },
  { name: 'Lydia Wanjiru', role: 'Lab Technician', department: 'Laboratory', phone: '0712345682' },
  { name: 'Mohammed Salim', role: 'Administrator', department: 'Administration', phone: '0712345683' },
  { name: 'Grace Achieng', role: 'Support', department: 'Records', phone: '0712345684' },
];

async function seed() {
  await connect();

  console.log('Seeding users...');
  const users = [
    { email: 'admin@tibamkononi.co.ke', password: 'admin123', fullName: 'System Administrator', role: 'admin' },
    { email: 'county@tibamkononi.co.ke', password: 'county123', fullName: 'County Health Officer', role: 'county_admin' },
    { email: 'doctor@tibamkononi.co.ke', password: 'doctor123', fullName: 'Dr. Jane Mwangi', role: 'doctor', hospitalSlug: 'coast-general' },
    { email: 'hospital@tibamkononi.co.ke', password: 'hospital123', fullName: 'Mohammed Salim', role: 'hospital_admin', hospitalSlug: 'coast-general' },
    { email: 'nurse@tibamkononi.co.ke', password: 'nurse123', fullName: 'Sr. Amina Hassan', role: 'nurse', hospitalSlug: 'coast-general' },
    { email: 'receptionist@tibamkononi.co.ke', password: 'reception123', fullName: 'Grace Achieng', role: 'receptionist', hospitalSlug: 'coast-general' },
    { email: 'pharmacist@tibamkononi.co.ke', password: 'pharmacist123', fullName: 'James Kiprop', role: 'pharmacist', hospitalSlug: 'coast-general' },
    { email: 'lab@tibamkononi.co.ke', password: 'lab123', fullName: 'Lydia Wanjiru', role: 'lab_technician', hospitalSlug: 'coast-general' },
  ];

  for (const u of users) {
    const exists = await User.findOne({ email: u.email });
    if (exists) continue;
    await User.create({
      email: u.email,
      passwordHash: await User.hashPassword(u.password),
      fullName: u.fullName,
      role: u.role,
      hospitalSlug: u.hospitalSlug || null,
    });
  }
  console.log(`  ${users.length} demo users ready`);

  console.log('Seeding hospitals...');
  for (const h of HOSPITALS) {
    const exists = await Hospital.findOne({ slug: h.slug });
    if (exists) continue;
    await Hospital.create(h);
  }
  console.log(`  ${HOSPITALS.length} hospitals ready`);

  console.log('Seeding inventory...');
  for (const slug of ['coast-general', 'mombasa-county', 'likoni']) {
    for (const item of INVENTORY) {
      const exists = await Inventory.findOne({ hospitalSlug: slug, name: item.name });
      if (exists) continue;
      await Inventory.create({
        ...item,
        hospitalSlug: slug,
        movements: [],
        lastRestock: new Date(),
      });
    }
  }
  console.log('  inventory ready for coast-general, mombasa-county, likoni');

  console.log('Seeding staff...');
  for (const s of STAFF) {
    const exists = await Staff.findOne({ hospitalSlug: 'coast-general', name: s.name });
    if (exists) continue;
    await Staff.create({ ...s, hospitalSlug: 'coast-general', attendance: [] });
  }
  console.log(`  ${STAFF.length} staff ready`);

  console.log('Seeding announcements...');
  const hasAnnouncements = (await Announcement.countDocuments({})) > 0;
  if (!hasAnnouncements) {
    await Announcement.create([
      {
        title: 'NHIF e-Claims downtime scheduled',
        body: 'The NHIF e-Claims portal will be unavailable Sunday 22:00 - 02:00 for maintenance. Please plan billing accordingly.',
        type: 'general',
        severity: 'info',
        pinned: true,
        author: 'County Health Office',
        authorRole: 'county_admin',
        targetedHospitals: [],
      },
      {
        title: 'Critical stock alert: Insulin',
        body: 'Insulin supplies are critically low across Mombasa. Immediate county restock requested for all facilities.',
        type: 'medicine',
        severity: 'critical',
        pinned: true,
        author: 'County Pharmacist',
        authorRole: 'pharmacist',
        targetedHospitals: [{ name: 'coast-general' }, { name: 'mombasa-county' }],
      },
    ]);
  }
  console.log('  announcements ready');

  console.log('Seeding demo appointments...');
  const hasAppointments = (await Appointment.countDocuments({})) > 0;
  if (!hasAppointments) {
    const d = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
    await Appointment.create([
      {
        patientName: 'Ali Bakari',
        patientPhone: '0712555666',
        nhifNumber: 'NHIF/002233',
        hospitalSlug: 'coast-general',
        hospitalName: 'Coast General Teaching & Referral Hospital',
        department: 'General Outpatient',
        doctorName: 'Dr. Jane Mwangi',
        date: d,
        time: '09:00',
        reason: 'Follow-up on malaria treatment',
        status: 'confirmed',
      },
      {
        patientName: 'Zainab Omar',
        patientPhone: '0722333444',
        hospitalSlug: 'coast-general',
        hospitalName: 'Coast General Teaching & Referral Hospital',
        department: 'General Outpatient',
        doctorName: 'Dr. Brian Otieno',
        date: d,
        time: '10:30',
        reason: 'Persistent headache',
        status: 'confirmed',
      },
    ]);
  }
  console.log('  appointments ready');

  console.log('\nSeeding complete.');
  await mongoose.disconnect();
}

async function connect() {
  await mongoose.connect(env.mongoUri);
}

seed().catch(async (err) => {
  console.error('Seed failed:', err.message);
  await mongoose.disconnect();
  process.exit(1);
});
