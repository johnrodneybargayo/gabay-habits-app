const { getDefaultConfig } = require("@expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push('svg', 'png', 'jpg');

module.exports = config;
module.exports = withNativeWind(config, { input: './global.css' })