import { build } from 'esbuild'
import chokidar from 'chokidar'
import liveServer from 'live-server'

import path from 'path'
import aliasPlugin from 'esbuild-plugin-path-alias'
import eslint from 'esbuild-plugin-eslint'
import copy from 'esbuild-copy-files-plugin'

import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

;(async () => {
  const isDevMode = () => {
    return process.env.NODE_ENV === 'development'
  }

  const plugins = [
    aliasPlugin({
      '@/components': path.resolve(__dirname, './src/components'),
      '@/services': path.resolve(__dirname, './src/services'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/assets': path.resolve(__dirname, './src/assets')
    }),
    copy({
      source: ['./src/index.html'],
      target: 'dist',
      copyWithFolder: false // will copy "images" folder with all files inside
    }),
    eslint({})
  ]

  // `esbuild` bundler for JavaScript / TypeScript.
  const { rebuild, stop } = await build({
    plugins,
    platform: 'node',
    format: 'esm',
    // Bundles JavaScript.
    bundle: true,
    write: true,
    // Bundles JavaScript from (see `outfile`).
    entryPoints: ['src/main.js', 'src/assets/styles/main.css'],
    // Uses incremental compilation (see `chokidar.on`).
    incremental: true,
    // Bundles JavaScript to (see `entryPoints`).
    outdir: 'dist',
    treeShaking: !isDevMode(),
    sourcemap: isDevMode(),
    minify: !isDevMode(),
    target: isDevMode() ? ['esnext'] : ['es2018'],

    loader: {
      '.png': 'dataurl',
      '.jpg': 'file',
      '.jpeg': 'file',
      '.svg': 'text'
    }
  })

  // `liveServer` local server for hot reload.
  if (!isDevMode()) {
    try {
      stop && stop()
    } finally {
      process.exit(0)
    }
  }

  console.log('oieee.')
  // `chokidar` watcher source changes.
  chokidar
    // Watches TypeScript and React TypeScript.
    .watch('src/**/*.{js,ts,tsx}', {
      interval: 0 // No delay
    })
    // Rebuilds esbuild (incrementally -- see `build.incremental`).
    .on('all', () => {
      rebuild()
    })

  liveServer.start({
    // Opens the local server on start.
    open: false,
    // Uses `PORT=...` or 8080 as a fallback.
    port: 8080,
    //Host
    host: 'localhost',
    // Uses `public` as the local server folder.
    root: 'dist'
  })

  process.once('SIGTERM', async () => {
    try {
      stopWatch && stopWatch()
    } finally {
      process.exit(0)
    }
  })
})()
