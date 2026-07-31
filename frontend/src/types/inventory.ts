export interface InventoryItem {
  id: string;
  name: string;
  category: 'Medicines' | 'Bedding' | 'Laboratory' | 'Surgical' | 'General';
  currentStock: number;
  unit: string;
  dailyUsage: number;
  daysRemaining: number;
  status: 'critical' | 'warning' | 'ok';
  supplier: string;
  lastRestock: string;
  expiryDate?: string;
  minimumStock: number;
}

export interface StockMovement {
  id: string;
  medicineName: string;
  quantity: number;
  type: 'deduction' | 'restock' | 'transfer';
  patientName?: string;
  timestamp: string;
  notes?: string;
}

export interface StockForecast {
  medicineName: string;
  currentStock: number;
  dailyUsage: number;
  predictedStockoutDate: string;
  forecastData: ForecastPoint[];
}

export interface ForecastPoint {
  date: string;
  stock: number;
  projected: number;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  suppliesProvided: string[];
}
