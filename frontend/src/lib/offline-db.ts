const DB_NAME = 'tibamkononi-offline';
const DB_VERSION = 1;
const STORES = {
  pendingPatients: 'pendingPatients',
  pendingEmergencies: 'pendingEmergencies',
  cachedHospitals: 'cachedHospitals',
  cachedInventory: 'cachedInventory',
} as const;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains(STORES.pendingPatients)) {
        db.createObjectStore(STORES.pendingPatients, { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains(STORES.pendingEmergencies)) {
        db.createObjectStore(STORES.pendingEmergencies, { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains(STORES.cachedHospitals)) {
        db.createObjectStore(STORES.cachedHospitals, { keyPath: 'slug' });
      }
      if (!db.objectStoreNames.contains(STORES.cachedInventory)) {
        db.createObjectStore(STORES.cachedInventory, { keyPath: 'hospitalSlug' });
      }
    };
  });
}

export async function saveOfflinePatient(patient: unknown): Promise<void> {
  const db = await openDB();
  const tx = db.transaction(STORES.pendingPatients, 'readwrite');
  tx.objectStore(STORES.pendingPatients).add(patient);
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getOfflinePatients(): Promise<unknown[]> {
  const db = await openDB();
  const tx = db.transaction(STORES.pendingPatients, 'readonly');
  const request = tx.objectStore(STORES.pendingPatients).getAll();
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function clearOfflinePatients(): Promise<void> {
  const db = await openDB();
  const tx = db.transaction(STORES.pendingPatients, 'readwrite');
  tx.objectStore(STORES.pendingPatients).clear();
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function saveOfflineEmergency(emergency: unknown): Promise<void> {
  const db = await openDB();
  const tx = db.transaction(STORES.pendingEmergencies, 'readwrite');
  tx.objectStore(STORES.pendingEmergencies).add(emergency);
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function cacheHospitals(hospitals: unknown[]): Promise<void> {
  const db = await openDB();
  const tx = db.transaction(STORES.cachedHospitals, 'readwrite');
  const store = tx.objectStore(STORES.cachedHospitals);
  for (const hospital of hospitals) {
    store.put(hospital);
  }
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getCachedHospitals(): Promise<unknown[]> {
  const db = await openDB();
  const tx = db.transaction(STORES.cachedHospitals, 'readonly');
  const request = tx.objectStore(STORES.cachedHospitals).getAll();
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
