// Memory Vault Studio - Safe Unified MediaStore Singleton API Service

import { StorageProvider } from './StorageProvider';

class MediaStoreService {
  constructor() {
    this.provider = new StorageProvider('indexedDB');
    this.cache = new Map();
  }

  async upload(file, metadata = {}) {
    try {
      if (!file) return null;
      const result = await this.provider.upload(file, metadata);
      if (result && result.assetId && result.url) {
        this.cache.set(result.assetId, result.url);
      }
      return result;
    } catch (err) {
      console.warn('MediaStore.upload error:', err);
      return null;
    }
  }

  async getUrl(assetIdOrUrl) {
    if (!assetIdOrUrl || typeof assetIdOrUrl !== 'string') return null;
    if (assetIdOrUrl.startsWith('http://') || assetIdOrUrl.startsWith('https://') || assetIdOrUrl.startsWith('blob:') || assetIdOrUrl.startsWith('data:')) {
      return assetIdOrUrl;
    }

    try {
      if (this.cache.has(assetIdOrUrl)) {
        return this.cache.get(assetIdOrUrl);
      }

      const item = await this.provider.get(assetIdOrUrl);
      if (item && item.url) {
        this.cache.set(assetIdOrUrl, item.url);
        return item.url;
      }
    } catch (err) {
      console.warn('MediaStore.getUrl error:', err);
    }

    return null;
  }

  async list() {
    try {
      return await this.provider.list();
    } catch (err) {
      return [];
    }
  }

  async delete(assetId) {
    try {
      this.cache.delete(assetId);
      return await this.provider.delete(assetId);
    } catch (err) {
      return false;
    }
  }

  async clear() {
    try {
      this.cache.clear();
      return await this.provider.clear();
    } catch (err) {
      return false;
    }
  }
}

export const MediaStore = new MediaStoreService();
