// Memory Vault Studio - Storage Provider Abstraction Layer

import { IndexedDBProvider } from './IndexedDBProvider';

export class StorageProvider {
  constructor(mode = 'indexedDB') {
    this.mode = mode;
    this.localProvider = new IndexedDBProvider();
  }

  async upload(file, metadata = {}) {
    const assetId = `asset_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const saved = await this.localProvider.save(assetId, file, metadata);
    const url = URL.createObjectURL(file);
    return {
      assetId,
      name: file.name,
      type: file.type,
      size: file.size,
      url,
      ...saved
    };
  }

  async get(assetId) {
    return await this.localProvider.get(assetId);
  }

  async list() {
    return await this.localProvider.list();
  }

  async delete(assetId) {
    return await this.localProvider.delete(assetId);
  }

  async clear() {
    return await this.localProvider.clear();
  }
}
