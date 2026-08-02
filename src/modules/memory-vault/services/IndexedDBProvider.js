// Memory Vault Studio - IndexedDB Storage Provider (Safe)

const DB_NAME = 'MemoryVaultMediaDB';
const DB_VERSION = 1;
const STORE_NAME = 'media_assets';

export class IndexedDBProvider {
  constructor() {
    this.db = null;
    this.initPromise = this.initDB().catch((err) => {
      console.warn('IndexedDB failed to init:', err);
      return null;
    });
  }

  async initDB() {
    if (typeof window === 'undefined' || !window.indexedDB) {
      console.warn('IndexedDB not supported in current environment.');
      return null;
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'assetId' });
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onerror = (event) => {
        console.warn('IndexedDB failed to open:', event.target.error);
        resolve(null);
      };
    });
  }

  async save(assetId, fileOrBlob, metadata = {}) {
    try {
      await this.initPromise;
      if (!this.db) return null;

      return new Promise((resolve) => {
        const transaction = this.db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);

        const record = {
          assetId,
          blob: fileOrBlob,
          name: metadata.name || fileOrBlob.name || 'Image Asset',
          type: fileOrBlob.type || 'image/png',
          size: fileOrBlob.size || 0,
          createdAt: metadata.createdAt || Date.now()
        };

        const request = store.put(record);
        request.onsuccess = () => resolve(record);
        request.onerror = () => resolve(null);
      });
    } catch (e) {
      return null;
    }
  }

  async get(assetId) {
    try {
      await this.initPromise;
      if (!this.db) return null;

      return new Promise((resolve) => {
        const transaction = this.db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(assetId);

        request.onsuccess = () => {
          const record = request.result;
          if (record && record.blob && (record.blob instanceof Blob || record.blob instanceof File)) {
            try {
              const url = URL.createObjectURL(record.blob);
              resolve({ ...record, url });
            } catch (err) {
              resolve(null);
            }
          } else {
            resolve(null);
          }
        };
        request.onerror = () => resolve(null);
      });
    } catch (e) {
      return null;
    }
  }

  async list() {
    try {
      await this.initPromise;
      if (!this.db) return [];

      return new Promise((resolve) => {
        const transaction = this.db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => {
          const records = request.result || [];
          const items = [];
          records.forEach((rec) => {
            if (rec && rec.blob && (rec.blob instanceof Blob || rec.blob instanceof File)) {
              try {
                items.push({
                  ...rec,
                  url: URL.createObjectURL(rec.blob)
                });
              } catch (e) {}
            }
          });
          resolve(items);
        };
        request.onerror = () => resolve([]);
      });
    } catch (e) {
      return [];
    }
  }

  async delete(assetId) {
    try {
      await this.initPromise;
      if (!this.db) return false;

      return new Promise((resolve) => {
        const transaction = this.db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(assetId);

        request.onsuccess = () => resolve(true);
        request.onerror = () => resolve(false);
      });
    } catch (e) {
      return false;
    }
  }

  async clear() {
    try {
      await this.initPromise;
      if (!this.db) return false;

      return new Promise((resolve) => {
        const transaction = this.db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.clear();

        request.onsuccess = () => resolve(true);
        request.onerror = () => resolve(false);
      });
    } catch (e) {
      return false;
    }
  }
}
