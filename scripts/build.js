/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
// ignoring this error because this is just a build script and package should be in devDependencies
const esbuild = require('esbuild');
const { default: postCssPlugin } = require('esbuild-plugin-postcss2');

console.log('starting esbuild build...');

esbuild
  .build({
    entryPoints: ['src/index.jsx'],
    bundle: true,
    outfile: 'esbuild-bundle/dist/index.js',
    minify: true,
    target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
    define: {
      'process.env.NODE_ENV': '"production"',
    },
    plugins: [
      postCssPlugin({
        plugins: [],
      }),
    ],
  })
  .then(() => { console.log('done'); })
  .catch(console.error);