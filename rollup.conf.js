import sucrase from '@rollup/plugin-sucrase';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import minify from 'rollup-plugin-minify';
import { uglify } from 'rollup-plugin-uglify';
import gzip from 'rollup-plugin-gzip';
import visualizer from 'rollup-plugin-visualizer';

/** @type {import('rollup').RollupOptions} */
export const rollupOptions = {
  input: 'src/index.jsx',
  output: {
    format: 'iife',
    dir: 'rollup-bundle/dist',
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    postcss(),
    resolve({
      extensions: ['.js', '.ts', '.jsx', '.tsx'],
      browser: true,
    }),
    sucrase({
      exclude: ['node_modules/**'],
      transforms: ['typescript', 'jsx'],
    }),
    copy({
      targets: [{
        src: 'public/*',
        dest: 'rollup-bundle',
      }],
    }),
    commonjs(),
    terser(),
    minify(),
    uglify(),
    gzip(),
    visualizer({
      template: 'sunburst',
      filename: 'reports/vis.html',
    }),
  ],
};

export default rollupOptions;