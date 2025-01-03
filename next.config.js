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
};