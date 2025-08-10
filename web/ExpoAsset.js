// Web polyfill for expo-asset
class Asset {
  constructor(options = {}) {
    this.name = options.name || '';
    this.type = options.type || '';
    this.uri = options.uri || '';
    this.localUri = options.localUri || options.uri || '';
    this.width = options.width || null;
    this.height = options.height || null;
    this.downloaded = true; // Always consider downloaded on web
  }
  
  async downloadAsync() {
    // No-op for web, assets are loaded directly
    return this;
  }
  
  static fromModule(moduleId) {
    // Handle require() calls
    if (typeof moduleId === 'number') {
      return new Asset({ uri: `asset_${moduleId}` });
    }
    return new Asset({ uri: moduleId });
  }
  
  static fromURI(uri) {
    return new Asset({ uri });
  }
  
  static loadAsync(assets) {
    // Convert single asset to array
    const assetArray = Array.isArray(assets) ? assets : [assets];
    
    return Promise.all(
      assetArray.map(asset => {
        if (asset instanceof Asset) {
          return asset.downloadAsync();
        }
        return Asset.fromModule(asset).downloadAsync();
      })
    );
  }
}

module.exports = {
  Asset,
};