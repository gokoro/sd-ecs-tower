const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const withVanillaExtract = createVanillaExtractPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/tower',
}

const wrappedNextConfig = withVanillaExtract(nextConfig)

module.exports = wrappedNextConfig
