import type { NextConfig } from "next";
const nextI18NextConfig = require('./next-i18next.config')
const nextConfig: NextConfig = {
  
};

module.exports = {
    images: {
    domains: ['127.0.0.1'], 
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
    ...nextI18NextConfig
}

export default nextConfig;
