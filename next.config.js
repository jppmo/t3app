/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}  
const removeImports = require('next-remove-imports')();

module.exports = ({ nextConfig }) => {
  return removeImports({
    ...nextConfig
  })
}

/* module.exports = removeImports({ nextConfig }); */

/* module.exports = nextConfig  */

