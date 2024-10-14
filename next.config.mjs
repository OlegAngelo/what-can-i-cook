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
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'edamam-product-images.s3.amazonaws.com',
        port: '',
        pathname: '/**', // Use '**' to allow any path under the hostname
      },
    ],
  },
  webpack: (config, { dev }) => {
    if (!dev) {
      // Ensure react-refresh is disabled in production
      config.resolve.alias['react-refresh/runtime'] = false;
    }
    return config;
  },
};

export default nextConfig;
