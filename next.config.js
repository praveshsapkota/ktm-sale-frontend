// const withPlugins = require('next-compose-plugins');
// const withOptimizedImages = require('next-optimized-images');

module.exports = {
	// reactStrictMode: false,
	images: {
		domains: ["ktmsale.s3.ap-south-1.amazonaws.com", "img.icons8.com"],
	},
};

// module.exports = {
//   images: {
//     domains: ['https://image.tmdb.org/', 'https://api.themoviedb.org/'],
//   },
// };

// // next.js configuration
// const nextConfig = {
//   async redirects() {
//     return [
//       {
//         source: '/',
//         destination: '/',
//         permanent: true,
//       },
//     ];
//   },
// };

// module.exports = withPlugins([withOptimizedImages], nextConfig);
