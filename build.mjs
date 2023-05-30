import archiver from 'archiver'
import * as dotenv from 'dotenv'
import esbuild from 'esbuild'
import postcssPlugin from 'esbuild-style-plugin'
import fs from 'fs-extra'
import process from 'node:process'

dotenv.config()

const outdir = 'build'

async function deleteOldDir() {
  await fs.remove(outdir)
}

