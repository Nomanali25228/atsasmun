// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   webpack(config) {
//     // Rule for handling video files
//     config.module.rules.push({
//       test: /\.(mp4|webm|ogg|avi|mov|wmv)$/,
//       use: {
//         loader: 'file-loader',
//         options: {
//           publicPath: '/_next/static/videos',
//           outputPath: 'static/videos',
//           name: '[name].[hash].[ext]',
//           esModule: false,
//         },
//       },
//     });

//     // Rule for handling audio files
//     config.module.rules.push({
//       test: /\.(mp3|wav)$/,
//       use: {
//         loader: 'file-loader',
//         options: {
//           publicPath: '/_next/static/media',
//           outputPath: 'static/media',
//           name: '[name].[hash].[ext]',
//         },
//       },
//     });

//     return config;
//   },
// };

// export default nextConfig;


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
  webpack(config) {
    // ویڈیو فائلوں کے لیے رول
    config.module.rules.push({
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
    });

    // آڈیو فائلوں کے لیے رول
    config.module.rules.push({
      test: /\.(mp3|wav)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/media',
          outputPath: 'static/media',
          name: '[name].[hash].[ext]',
        },
      },
    });

    return config;
  },
};

export default nextConfig;
