/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');

const settingsPWA = {
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
};

const settings = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports =
  process.env.NODE_ENV === 'development'
    ? settings
    : withPWA({ reactStrictMode: false, ...settingsPWA, ...settings });
