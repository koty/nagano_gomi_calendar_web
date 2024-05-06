/** @type {import('next').NextConfig} */
import withPWAfunc from 'next-pwa'

const withPWA = withPWAfunc({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

const nextConfig = withPWA({
  //next.js config
  reactStrictMode: true,
  output: 'export',
})

export default nextConfig;
