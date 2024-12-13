const { composePlugins, withNx } = require('@nx/next');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
	nx: {
		svgr: false,
	},
	images: {
		domains: ['pemilyy-assets.s3.ap-south-1.amazonaws.com'],
	},
};

const plugins = [withNx];

// Conditionally enable the bundle analyzer if ANALYZE=true is set in environment
if (process.env.ANALYZE === 'true') {
	plugins.push(withBundleAnalyzer);
}

module.exports = composePlugins(...plugins)(nextConfig);
