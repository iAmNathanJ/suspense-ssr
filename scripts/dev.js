const nodemon = require('nodemon');
const { build } = require('esbuild')
const { watch } = require('chokidar');

(async () => {
  await Promise.all([
    buildClient(),
    buildServer(),
  ]);

  nodemon({
    script: 'build/server.js',
    nodeArgs: '--inspect',
    watch: 'build/server.js',
  })
    .on("log", nodemonOutput)
    .on("quit", console.log);

  watch([
    './client/**',
    './server/**',
    './app/**',
    './data/**',
  ]).on('change', () => {
    buildClient();
    buildServer();
  });
})();

async function buildClient() {
  await build({
    entryPoints: ['client/client.jsx'],
    bundle: true,
    splitting: true,
    format: 'esm',
    outdir: 'build',
    sourcemap: 'inline'
  });

  console.log('built client');
}

async function buildServer() {
  await build({
    entryPoints: ['server/server.js'],
    bundle: true,
    platform: 'node',
    outdir: 'build'
  });

  console.log('built server');
}

function nodemonOutput(message) {
  console.log(message.colour);
}
