const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const withVanillaExtract = createVanillaExtractPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NODE_ENV === 'production' ? '/tower' : undefined,
  output: 'standalone',
}

const wrappedNextConfig = withVanillaExtract(nextConfig)

module.exports = wrappedNextConfig
