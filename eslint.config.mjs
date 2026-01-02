import { defineConfig, globalIgnores } from 'eslint/config';
import nextConfig from 'eslint-config-next';
import prettier from 'eslint-config-prettier/flat';

export default defineConfig([
  ...nextConfig,
  prettier,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'node_modules/**',
    'dist/**',
    'coverage/**',
    '/*.log',
    '.env.local',
    '.env.*.local',
  ]),
]);
