/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'atsas-backend.onrender.com',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
  webpack(config, { isServer }) {
    config.module.rules.push(
      {
        test: /\.(mp4|webm|ogg|avi|mov|wmv)$/,
        use: {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/videos',
            outputPath: 'static/videos',
            name: '[name].[hash].[ext]',
            esModule: false,
          },
        },
      },
      {
        test: /\.(mp3|wav)$/,
        use: {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/media',
            outputPath: 'static/media',
            name: '[name].[hash].[ext]',
          },
        },
      }
    );

    // ✅ Prevent loading native modules like canvas.node in client bundle
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
        fs: false,
        path: false,
      };
    }

    return config;
  },
};

export default nextConfig;
