/* next.config.js */
    
import webpack from 'webpack';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export default {
  webpack: (config) => {
    // Map environment variables for DefinePlugin
    const env = Object.keys(process.env).reduce((acc, curr) => {
      acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
      return acc;
    }, {});

    // Add DefinePlugin to plugins
    config.plugins.push(new webpack.DefinePlugin(env));

    // Disable Webpack's filesystem cache
    config.cache = {
      type: 'memory',
    };

    return config;
  },

  async headers() {
    return [
      {
        // Match all routes
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval';
              style-src 'self' 'unsafe-inline';
              img-src 'self' data:;
              connect-src 'self' https://*.pusher.com;
              font-src 'self' data:;
              object-src 'none';
            `.replace(/\s{2,}/g, ' ').trim(), // Minify CSP for better performance
          },
        ],
      },
    ];
  },
};