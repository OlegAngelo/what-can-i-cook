// Import required packages using ES modules
import withBundleAnalyzer from '@next/bundle-analyzer';
import CompressionPlugin from 'compression-webpack-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',  // Enable bundle analysis when ANALYZE=true npm run build
})({
  reactStrictMode: true,

  async redirects() {
    return [
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
        pathname: '/**', // Allow any path under the hostname
      },
    ],
  },

  webpack: (config, { dev, isServer }) => {
    // Optimization: Disable react-refresh in production
    if (!dev) {
      config.resolve.alias['react-refresh/runtime'] = false;
    }

    // Enable Webpack 5 (next.js uses Webpack 5 by default)
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all', // Code splitting for better optimization
      },
      minimize: !dev,  // Minify in production
    };

    // Optional: Use modern compression (gzip or Brotli) if using a custom server
    if (!isServer) {
      config.plugins.push(
        new CompressionPlugin({
          algorithm: 'brotliCompress',
          test: /\.(js|css|html|svg)$/,
        })
      );
    }

    return config;
  },
});

export default nextConfig;
