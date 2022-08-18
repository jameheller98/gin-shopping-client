/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');

const settings = {
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
};

module.exports =
  process.env.NODE_ENV === 'development'
    ? {
        reactStrictMode: true,
      }
    : withPWA(settings);
