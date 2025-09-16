// Learn more: https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('@expo/metro-config');

/** @type {import('@expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Extend transformer (keep Expo’s defaults)
config.transformer = {
  ...config.transformer,
  _expoRelativeProjectRoot: __dirname,
};

// Extend resolver to include .riv files as assets
config.resolver.assetExts = [...config.resolver.assetExts, 'riv'];

module.exports = config;