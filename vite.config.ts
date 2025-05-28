import {resolve} from 'path';
import { defineConfig } from 'vite';
import dts from "vite-plugin-dts";
import strip from "vite-plugin-strip-comments";
import { name } from './package.json';

const getPackageName = () => {
  return name.includes('@') ? name.split('/')[1] : name;
};

const NAME = 'Navbar';

const fileName = {
  es: `${getPackageName()}.mjs`,
  cjs: `${getPackageName()}.cjs`,
  iife: `${getPackageName()}.js`,
};

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
  plugins: [
    dts({
      outDir: 'dist/js',
      copyDtsFiles: true,
      rollupTypes: true,
    }),
    strip(),
  ],
  build: {
    emptyOutDir: true,
    outDir: 'dist/js',
    lib: {
      entry: resolve(__dirname, 'src/ts/index.ts'),
      name: NAME,
      formats: ['es', 'cjs', 'iife'],
      fileName: (format: string) => fileName[format],
    },
    sourcemap: true,
  }
});

