import archiver from 'archiver'
import * as dotenv from 'dotenv'
import autoprefixer from 'autoprefixer'
import esbuild from 'esbuild'
import postcssPlugin from 'esbuild-style-plugin'
import fs from 'fs-extra'
import process from 'node:process'

dotenv.config()

const outdir = 'build'

async function deleteOldDir() {
  await fs.remove(outdir)
}

async function runEsbuild() {
  await esbuild.build({
    entryPoints: [
      'src/content/index.tsx',
      'src/background/index.ts',
      'src/options/index.tsx',
      'src/popup/index.tsx',
    ],
    bundle: true,
    outdir: outdir,
    treeShaking: true,
    minify: false,
    legalComments: 'none',
    define: {
      'process.env.NODE_ENV': '"production"',
    },
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsx: 'automatic',
    loader: {
      '.png': 'dataurl',
      // '.less': 'css', // 配置.less文件的加载器为css
    },
    plugins: [
      postcssPlugin({
        postcss: {
          plugins: [autoprefixer],
        },
      }),
    ],
  })
}

async function zipFolder(dir) {
  const output = fs.createWriteStream(`${dir}.zip`)
  const archive = archiver('zip', {
    zlib: { level: 9 },
  })
  archive.pipe(output)
  archive.directory(dir, false)
  await archive.finalize()
}

async function copyFiles(entryPoints, targetDir) {
  await fs.ensureDir(targetDir)
  await Promise.all(
    entryPoints.map(async (entryPoint) => {
      await fs.copy(entryPoint.src, `${targetDir}/${entryPoint.dst}`)
    }),
  )
}

// build
async function build() {
  await deleteOldDir()
  await runEsbuild()

  const commonFiles = [
    { src: 'build/content/index.js', dst: 'content.js' },
    { src: 'build/content/index.css', dst: 'content.css' },
    { src: 'build/background/index.js', dst: 'background.js' },
    { src: 'build/options/index.js', dst: 'options.js' },
    { src: 'build/options/index.css', dst: 'options.css' },
    { src: 'src/options/index.html', dst: 'options.html' },
    { src: 'build/popup/index.js', dst: 'popup.js' },
    { src: 'build/popup/index.css', dst: 'popup.css' },
    { src: 'src/popup/index.html', dst: 'popup.html' },
    { src: 'src/logo.png', dst: 'logo.png' },
  ]

  await copyFiles(
    [...commonFiles, { src: 'src/manifest.json', dst: 'manifest.json' }],
    `./${outdir}/chromium`,
  )
  await zipFolder(`./${outdir}/chromium`)
  // eslint-disable-next-line no-console
  console.log('Build success.')
}

build()
