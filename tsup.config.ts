import { defineConfig } from 'tsup';

export default defineConfig({
    format: 'esm',
    entry: [
        './babel.ts',
        './proxy.ts'
    ],
    dts: true,
})
