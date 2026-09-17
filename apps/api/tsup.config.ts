import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/app.ts'],
  format: ['esm'],
  target: 'es2022',
  clean: true,
  sourcemap: true,
})