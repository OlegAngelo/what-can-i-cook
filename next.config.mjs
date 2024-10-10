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
};

export default nextConfig;
