import { asyncHandler } from '../utils/asyncHandler.js';
import * as inventoryService from '../services/inventory.service.js';

export const list = asyncHandler(async (req, res) => {
  const items = await inventoryService.listInventory(req.params.hospitalSlug);
  res.status(200).json(items);
});

export const create = asyncHandler(async (req, res) => {
  const item = await inventoryService.createInventoryItem(req.params.hospitalSlug, req.body);
  res.status(201).json({ success: true, message: 'Inventory item added', data: item });
});

export const update = asyncHandler(async (req, res) => {
  const item = await inventoryService.updateInventoryItem(
    req.params.hospitalSlug,
    req.params.itemId,
    req.body
  );
  res.status(200).json({ success: true, data: item });
});

export const adjust = asyncHandler(async (req, res) => {
  const item = await inventoryService.updateInventoryItem(
    req.params.hospitalSlug,
    req.body.itemId,
    req.body
  );
  res.status(200).json({ success: true, message: 'Stock updated', data: item });
});

export const remove = asyncHandler(async (req, res) => {
  const result = await inventoryService.removeInventoryItem(req.params.hospitalSlug, req.params.itemId);
  res.status(200).json(result);
});

export const movements = asyncHandler(async (req, res) => {
  const result = await inventoryService.getStockMovements(req.params.hospitalSlug);
  res.status(200).json(result);
});

export const forecast = asyncHandler(async (req, res) => {
  const result = await inventoryService.getStockForecast(req.params.hospitalSlug);
  res.status(200).json(result);
});
