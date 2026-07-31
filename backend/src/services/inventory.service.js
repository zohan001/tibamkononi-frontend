import Inventory from '../models/Inventory.js';
import { ApiError } from '../utils/ApiError.js';

function toPublic(item) {
  return {
    id: String(item._id),
    name: item.name,
    category: item.category,
    currentStock: item.currentStock,
    unit: item.unit || 'units',
    dailyUsage: item.dailyUsage || 0,
    daysRemaining: item.daysRemaining ? item.daysRemaining() : Infinity,
    status: item.computeStatus ? item.computeStatus() : 'ok',
    supplier: item.supplier || '',
    lastRestock: item.lastRestock || null,
    expiryDate: item.expiryDate || null,
    minimumStock: item.minimumStock,
  };
}

export async function listInventory(hospitalSlug) {
  const items = await Inventory.find({ hospitalSlug }).sort({ name: 1 }).lean();
  return items.map((i) => ({ ...toPublic(i), id: String(i._id) }));
}

export async function createInventoryItem(hospitalSlug, payload) {
  const existing = await Inventory.findOne({ hospitalSlug, name: payload.name }).lean();
  if (existing) throw ApiError.conflict('An inventory item with this name already exists');

  const item = await Inventory.create({ ...payload, hospitalSlug });
  return toPublic(item);
}

export async function updateInventoryItem(hospitalSlug, itemId, payload) {
  const item = await Inventory.findOne({ _id: itemId, hospitalSlug });
  if (!item) throw ApiError.notFound('Inventory item not found');

  if (payload.name) item.name = payload.name;
  if (payload.category) item.category = payload.category;
  if (typeof payload.currentStock === 'number') item.currentStock = payload.currentStock;
  if (typeof payload.minimumStock === 'number') item.minimumStock = payload.minimumStock;
  if (typeof payload.dailyUsage === 'number') item.dailyUsage = payload.dailyUsage;
  if (payload.unit) item.unit = payload.unit;
  if (payload.supplier) item.supplier = payload.supplier;
  if (payload.expiryDate) item.expiryDate = payload.expiryDate;

  if (payload.quantity && payload.type) {
    const qty = Math.abs(payload.quantity);
    if (payload.type === 'deduction') {
      item.currentStock = Math.max(0, item.currentStock - qty);
    } else if (payload.type === 'restock') {
      item.currentStock += qty;
      item.lastRestock = new Date();
    } else if (payload.type === 'transfer') {
      item.currentStock = Math.max(0, item.currentStock - qty);
    }
    item.movements.push({
      medicineName: item.name,
      quantity: qty,
      type: payload.type,
      patientName: payload.patientName || '',
      notes: payload.notes || '',
    });
  }

  await item.save();
  return toPublic(item);
}

export async function removeInventoryItem(hospitalSlug, itemId) {
  const item = await Inventory.findOneAndDelete({ _id: itemId, hospitalSlug });
  if (!item) throw ApiError.notFound('Inventory item not found');
  return { success: true };
}

export async function getStockMovements(hospitalSlug) {
  const items = await Inventory.find({ hospitalSlug }).lean();
  const movements = items.flatMap((item) =>
    (item.movements || []).map((m) => ({
      id: String(m._id),
      medicineName: m.medicineName,
      quantity: m.quantity,
      type: m.type,
      patientName: m.patientName || undefined,
      notes: m.notes || undefined,
      timestamp: m.createdAt || item.updatedAt,
    }))
  );
  return movements.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 100);
}

export async function getStockForecast(hospitalSlug) {
  const items = await Inventory.find({ hospitalSlug }).lean();
  const today = new Date();

  return items.map((item) => {
    const days = item.dailyUsage > 0 ? Math.floor(item.currentStock / item.dailyUsage) : Infinity;
    const predictedStockoutDate =
      days === Infinity ? null : new Date(today.getTime() + days * 86400000).toISOString().slice(0, 10);

    const forecastData = [];
    for (let d = 0; d <= Math.min(days, 30); d += 1) {
      const date = new Date(today.getTime() + d * 86400000).toISOString().slice(0, 10);
      forecastData.push({
        date,
        stock: Math.max(0, item.currentStock - item.dailyUsage * d),
        projected: Math.max(0, item.currentStock - item.dailyUsage * d),
      });
    }

    return {
      medicineName: item.name,
      currentStock: item.currentStock,
      dailyUsage: item.dailyUsage,
      predictedStockoutDate,
      forecastData,
    };
  });
}

export default {
  listInventory,
  createInventoryItem,
  updateInventoryItem,
  removeInventoryItem,
  getStockMovements,
  getStockForecast,
  toPublic,
};
