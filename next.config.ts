import type { NextConfig } from "next";
const nextI18NextConfig = require('./next-i18next.config')
const nextConfig: NextConfig = {
  
};

module.exports = {
    ...nextI18NextConfig
}

export default nextConfig;
