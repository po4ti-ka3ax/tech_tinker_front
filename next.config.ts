import type { NextConfig } from "next";
const nextI18NextConfig = require('./next-i18next.config')
const nextConfig: NextConfig = {
  
};

module.exports = {
    images: {
    domains: ['127.0.0.1'], 
  },
    ...nextI18NextConfig
}

export default nextConfig;
