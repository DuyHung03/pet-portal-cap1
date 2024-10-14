import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            process: 'process/browser', // Polyfill process
            buffer: 'buffer',           // Polyfill buffer
            util: 'util',
        },
    },
    optimizeDeps: {
        exclude: ['js-big-decimal'],
    },
});
