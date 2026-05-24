const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Exclude packages with missing dist folders from the file watcher
config.watchFolders = (config.watchFolders ?? []);
config.resolver.blockList = [
  /node_modules\/@emnapi\/wasi-threads\/dist\/.*/,
];

module.exports = config;
