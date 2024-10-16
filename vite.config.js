import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    resolve: {
        alias: {
            process: 'process/browser',
            buffer: 'buffer',
            util: 'util',
        },
    },
    optimizeDeps: {
        exclude: ['js-big-decimal'],
    },
});
