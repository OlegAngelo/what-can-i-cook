/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  async redirects() {
    return [
      {
        source: '/landingpage/landing-page',
        destination: '/',
        permanent: true,
      },
      {
        source: '/ingredients',
        destination: '/ingredients/list',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
