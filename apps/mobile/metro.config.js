// Metro config for the pnpm monorepo. The app imports @sudoku/core as workspace
// TypeScript source (the package exposes only `exports: "./src/index.ts"`, no
// build step), so Metro must watch the repo root, resolve hoisted dependencies,
// and follow the symlinked workspace package.
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];
// Resolve packages via their `exports` map (core ships no `main` field).
config.resolver.unstable_enablePackageExports = true;

module.exports = config;
