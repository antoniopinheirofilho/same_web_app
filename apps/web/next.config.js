/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: ["database"],
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude better-sqlite3 from webpack bundling on the server
      config.externals.push('better-sqlite3');
    }
    return config;
  },
};

module.exports = nextConfig;
